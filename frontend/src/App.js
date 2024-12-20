//! Import modules 
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage, SignupPage, ActivationPage } from './Routes.js'
import './App.css'
import { Bounce, ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={<LoginPage />}
        />

        <Route
          path='/sign-up'
          element={<SignupPage />}
        />

        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
      </Routes>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </BrowserRouter>
  )
}

export default App