import React, {useEffect} from 'react';
import './App.css';
import HeaderComponent from "./components/headerComponent/HeaderComponent";
import {BrowserRouter as Router, Navigate, Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import FooterCompoennt from "./components/footerComponent/FooterCompoennt";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth, loginUser, setAdmin, setAuth} from "./actions/actions";
import CatalogProducts from "./components/catalogProducts/CatalogProducts";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import {IUser} from "./interfaces/BasicInterface";
function App() {
    const dispatch = useDispatch()
    type CurrentUser = {
        curUser: IUser;
    }
    const {curUser} = useSelector((state:CurrentUser) => state);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth().then(data => {
                dispatch(setAuth(true))
                dispatch(loginUser(data!.data.user))
                if (data!.data.user.admin){
                    dispatch(setAdmin(true))
                }
            })
        }
    }, [])
    return (
        <div className="App">
            <Router>
                    <HeaderComponent/>
                <Routes>
                    <Route path={'/'}  element={<MainPage/>}/>
                    <Route path={'/catalog/:category_name'} element={<CatalogProducts/>}/>
                    <Route path={'/blog'} element={<div/>}/>
                    <Route path={'/news'} element={<div/>}/>
                    <Route path={'/About-us'} element={<div/>}/>
                    {curUser.admin ? (
                        <Route path="/admin/*" element={<AdminPanel />} />
                    ) : (
                        <></>
                    )}
                </Routes>
                <FooterCompoennt/>
            </Router>
        </div>
    );
}

export default App;
