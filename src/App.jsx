import React from "react";
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
  RecoverPassword,
  Error404,
  Jobs,
  Posts,
  Profile,
  Tips,
  CmsBlog,
  CmsEmployments,
  CmsFaqs,
  CmsTips,
  //CmsUserProfile,
  PantallaChat,
} from "./frontend/components/Indexes/PagesIndex";
import * as Routing from "./frontend/assets/javascript/constants/routing/routing.js";
//import Private from "./frontend/components/Private/Private.js";
import { AuthContextProvider } from "./frontend/context/AuthContext.js";
const App = () => {

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <BottomNavbar />
        <ContactNavbar />
        <Routes>
          {/*ERROR HANDLING ROUTES*/}
          <Route exact path={Routing.NotFound} element={<Error404 />} />
          {/*LOGIN, REGISTER, RECOVER PASSWORD*/}
          <Route exact path={Routing.Login} element={<Login />} />
          <Route exact path={Routing.Register} element={<Register />} />
          <Route exact path={Routing.RecoverPassword} element={<RecoverPassword />} />
          {/*SHARED PUBLIC ROUTES*/}
          <Route exact path={Routing.Home} element={<Home />} />
          <Route exact path= {Routing.Jobs} element={<Jobs />} />
          <Route exact path={Routing.Posts} element={<Posts />} />
          <Route exact path={Routing.Profile} element={<Profile />} />
          <Route exact path={Routing.Tips} element={<Tips />} />
          {/*PROTECTED ROUTES*/}
          <Route exact path={Routing.CmsBlog} element={<CmsBlog />} />
          <Route exact path={Routing.CmsEmployments} element={<CmsEmployments />} />
          <Route exact path={Routing.CmsFaqs} element={<CmsFaqs />} />
          <Route exact path={Routing.CmsTips} element={<CmsTips />} />
          {/*<Route exact path="/CmsUserProfile" element={<CmsUserProfile />} />*/}
          <Route exact path={Routing.PantallaChat} element={<PantallaChat />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
