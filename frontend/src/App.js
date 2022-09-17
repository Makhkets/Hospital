import React, { Fragment, useState } from "react"
import { Routes, Route, Link } from 'react-router-dom'

import Layout from "./components/Layout";
import Index from "./pages/Index"
import Profile from "./pages/Profile"
import Add from "./pages/Add"
import Information from "./pages/Information"
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import { Contex } from "./context";

import { getUser } from "./actions/user";

import "./css/style.css"


const App = () => {
  return (
      <Fragment>
        <Contex.Provider value={{
          getUser
        }}>

          <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Index />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add" element={<Add />} />
                <Route path="/information" element={<Information />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Route>        
          </Routes>

        </Contex.Provider>
      </Fragment>
  );
}

export default App;
