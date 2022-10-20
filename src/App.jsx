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
  CmsResume,
  CmsTips,
  //CmsUserProfile,
  PantallaChat,
} from "./frontend/components/Indexes/PagesIndex";
import Private from "./frontend/components/Private/Private.js";
import { AuthContextProvider } from "./frontend/context/AuthContext.js";
const App = () => {

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <BottomNavbar />
        <ContactNavbar />
        <Routes>
          {/*PUBLIC ROUTES*/}
          <Route exact path="*" element={<Error404 />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/RecoverPassword" element={<RecoverPassword />} />
          <Route exact path="/Error404" element={<Error404 />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Jobs" element={<Jobs />} />
          <Route exact path="/Posts" element={<Posts />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Tips" element={<Tips />} />
          {/*PROTECTED ROUTES*/}
          <Route exact path="/CmsBlog" element={<Private><CmsBlog /></Private>} />
          <Route exact path="/CmsEmployments" element={<Private><CmsEmployments /></Private>} />
          <Route exact path="/CmsFaqs" element={<Private><CmsFaqs /></Private>} />
          <Route exact path="/CmsResume" element={<CmsResume />} />
          <Route exact path="/CmsTips" element={<CmsTips />} />
          {/*<Route exact path="/CmsUserProfile" element={<CmsUserProfile />} />*/}
          <Route exact path="/PantallaChat" element={<PantallaChat />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
