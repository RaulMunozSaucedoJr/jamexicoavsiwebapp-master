import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
import "./frontend/assets/Scss/Styles.css";
import {
  BottomNavbar,
  ContactNavbar,
  Navbar,
} from "./frontend/components/Indexes/OrganismsIndex";
import {
  Home,
  Login,
  Register,
  Error404,
  RecoverPassword,
  //Public pages
  Jobs,
  Posts,
  CmsBlog,
  CmsFaqs,
  CmsUsers,
  CmsEmployments,
  CmsUserProfile,
  PantallaChat
} from "./frontend/components/Indexes/PagesIndex";
import * as Routing from "./frontend/assets/javascript/constants/routing/routing.js";
import Private from "./frontend/components/Private/Private";
import { AuthContextProvider } from "./frontend/context/AuthContext.js";
import app from "./backend/Firebase/Firebase-config.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const auth = getAuth(app);
const firestore = getFirestore(app);

const App = () => {
  const [user, setUser] = useState(null);
  async function getRol(uid) {
    const docuRef = doc(firestore, `users/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  const setUserWithFirebaseAndRol = (usuarioFirebase) => {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
    });
  };

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <ContactNavbar />
        <BottomNavbar/>
        <Routes>
          {/*ERROR HANDLING ROUTES*/}
          <Route exact path={Routing.NotFound} element={<Error404 user={user} />} />
          {/*LOGIN, REGISTER, RECOVER PASSWORD*/}
          <Route exact path={Routing.Login} element={<Login />} />
          <Route exact path={Routing.Register} element={<Register />} />
          <Route exact path={Routing.RecoverPassword} element={<RecoverPassword />} />
          
          {user ? <Route path={Routing.Home} element={<Home user={user}/>} /> : <Route path={Routing.Login} element={<Login />} />}

          <Route exact path={Routing.Jobs} element={<Jobs />} />
          <Route exact path={Routing.Posts} element={<Posts />} />

          <Route exact path={Routing.CmsBlog} element={<Private><CmsBlog /></Private>} />
          <Route exact path={Routing.CmsEmployments} element={<Private><CmsEmployments /></Private>} />
          <Route exact path={Routing.CmsFaqs} element={<Private><CmsFaqs /></Private>} />
          <Route exact path={Routing.CmsUsers} element={<Private><CmsUsers /></Private>} />
          <Route exact path={Routing.CmsUserProfile} element={<Private><CmsUserProfile /></Private>} />

          <Route exact path={Routing.PantallaChat} element={<Private><PantallaChat /></Private>} />

        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
