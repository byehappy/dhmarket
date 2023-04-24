import React from 'react';
import './App.css';
import HeaderComponent from "./components/headerComponent/HeaderComponent";
import {BrowserRouter as Router, Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import FooterCompoennt from "./components/footerComponent/FooterCompoennt";
function App() {
    return (
        <div className="App">
            <Router>
                    <HeaderComponent/>
                <Routes>
                    <Route path={'/'} element={<MainPage/>}/>
                    <Route path={'/blog'} element={<div/>}/>
                    <Route path={'/news'} element={<div/>}/>
                    <Route path={'/About-us'} element={<div/>}/>
                </Routes>
                <FooterCompoennt/>
            </Router>
        </div>
    );
}

export default App;
