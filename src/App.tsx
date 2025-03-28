import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {Test} from "./components/Test";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/test" element={<Test/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
