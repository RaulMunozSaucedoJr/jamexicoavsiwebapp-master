import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./frontend/assets/Scss/Styles.css";
import {
  BottomNavbar,
  ContactNavbar,
  Navbar,
} from "./frontend/components/Indexes/OrganismsIndex";
import {
  //Shared pages
  Home,
  HomeAdmins,
  Login,
  Register,
  Error404,
  RecoverPassword,
  //Public pages
  Posts,
  Jobs,
  Tips,
  Faqs,
  PantallaChat,
  Interview,
  Resume,
  //Admin pages
  CmsBlog,
  CmsFaqs,
  CmsUsers,
  CmsTips,
  CmsEmployments,
} from "./frontend/components/Indexes/PagesIndex";
import Post from "./frontend/components/pages/Public_View/Posts/Post";
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
        <BottomNavbar />
        <Routes>
          {/* ERROR ROUTE PAGE*/}
          <Route exact path={Routing.NotFound} element={<Error404 />} />
          {/*HOMEPAGE*/}
          <Route exact path={Routing.Home} element={<Home />} />
          {/*LOGIN, REGISTER, RECOVER PAGES*/}
          <Route exact path={Routing.Login} element={<Login />} />
          <Route exact path={Routing.Register} element={<Register />} />
          
          <Route
            exact
            path={Routing.RecoverPassword}
            element={<RecoverPassword />}
          />

          <Route
            path={Routing.Post}
            element={
              <Private>
                <Post />
              </Private>
            }
          />
          <Route
            path={Routing.Posts}
            element={
              <Private>
                <Posts />
              </Private>
            }
          />
          <Route
            exact
            path={Routing.Jobs}
            element={
              <Private>
                <Jobs />
              </Private>
            }
          />
          <Route
            exact
            path={Routing.Tips}
            element={
              <Private>
                <Tips />
              </Private>
            }
          />
          <Route
            exact
            path={Routing.Faqs}
            element={
              <Private>
                <Faqs />
              </Private>
            }
          />
          {/*CONTENT MANAGMENT PAGES BASED ON SUPERADMIN-ADMIN ROLE AUTH*/}
          <Route
            exact
            path={Routing.Resume}
            element={
              <Private>
                <Resume />
              </Private>
            }
          />
          <Route
            exact
            path={Routing.CmsBlog}
            element={
              <Private>
                <CmsBlog />
              </Private>
            }
          />
          <Route
            exact
            path={Routing.CmsBlog}
            element={
              <Private>
                <CmsBlog />
              </Private>
            }
          />
          <Route
            exact
            path={Routing.CmsEmployments}
            element={
              <Private>
                <CmsEmployments />
              </Private>
            }
          />
          <Route
            exact
            path={Routing.CmsFaqs}
            element={
              <Private>
                <CmsFaqs />
              </Private>
            }
          />
          <Route
            exact
            path={Routing.CmsTips}
            element={
              <Private>
                <CmsTips />
              </Private>
            }
          />
          {/*DATA: EMAIL, ROL, PASSWORD*/}
          <Route
            exact
            path={Routing.CmsUsers}
            element={
              <Private>
                <CmsUsers />
              </Private>
            }
          />
          {/*DATA: PERSONAL INFORMATION LIKE: NAME, ADDRESS, EMAIL, PHONES*/}

          {/*DATA: GENERAL CHAT*/}
          <Route
            exact
            path={Routing.PantallaChat}
            element={
              <Private>
                <PantallaChat />
              </Private>
            }
          />
          {/*
            //!ROLES:
              //!SUPERADMIN:
                //!CAN USE COMPLETE CRUD OF ALL OF CMS
              //!ADMIN
                //!CAN USE COMPLETE CRUD OF CMS EXCEPT OF CREATE ADMINS
              //!GENERIC
                //!CAN USE THE CV CREATOR, JOIN INTO A INTERVIEW SIMULATION AND CHECK THE BLOG POSTS, TIPS, JOBS PLATFORMS 
                //!ONLY IF THE USER ITS REGISTER AND LOGED
                //!IF THE USER ISNT LOGGED ONLY ACCESS TO FAQS, REGISTER, LOGIN
          */}
          {user ? (
            <Route
              path={Routing.HomeAdmins}
              element={<HomeAdmins user={user} />}
            />
          ) : (
            <Route path={Routing.Login} element={<Login />} />
          )}
          {user ? (
            <Route
              path={Routing.Interview}
              element={<Interview user={user} />}
            />
          ) : (
            <Route path={Routing.Login} element={<Login />} />
          )}
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
