import React, { Fragment, useState } from "react"
import { Routes, Route, Link } from 'react-router-dom'

import Layout from "./components/Layout";
import Index from "./pages/Index"
import Branch from "./pages/Branch";
import Add from "./pages/Add"
import Information from "./pages/Information"
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import { Contex } from "./context";
import { getUser } from "./actions/user";

import "./css/style.css"
import "./css/index.css"


import Activate from "./pages/Activate";
import PatientProfile from "./pages/PatientPage";
import ActiveBranch from "./pages/ActiveBranch";
import FindPage from "./pages/FindPage";
import Visitor from "./pages/Visitor";
import Personal from "./pages/Personal";
import RequestDoctor from "./pages/RequestDoctor";


const App = () => {
  return (
      <Fragment>
        <Contex.Provider value={{
          getUser
        }}>
  
          <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Index />} />
                <Route path="/profile" element={<Branch />} />
                <Route path="/add" element={<Add />} />
                <Route path="/information" element={<Information />} />
                <Route path="/visitors" element={<Visitor />} />
                <Route path="/personal" element={<Personal />} />
                <Route path="/enroll" element={<RequestDoctor />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/activate/:uid/:token/" element={<Activate />} />
                <Route path="/patient/:id" element={<PatientProfile />} />
                <Route path="/branch/:branch" element={<ActiveBranch />} />
                <Route path="/find/:patient" element={<FindPage />} />
            </Route>        
          </Routes>
  
        </Contex.Provider>
      </Fragment>
  );
}


export default App;
