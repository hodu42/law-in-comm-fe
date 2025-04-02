import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {Test} from "./components/Test";
import {RegisterTest} from "./pages/RegisterTest";
import {LawyerRegisterTest} from "./pages/LawyerRegisterTest";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/register" element={<RegisterTest/>}/>
            <Route path="/register-lawyer" element={<LawyerRegisterTest/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
