import React, {useEffect} from 'react';
import './App.css';
import HeaderComponent from "./components/headerComponent/HeaderComponent";
import {BrowserRouter as Router, Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import FooterCompoennt from "./components/footerComponent/FooterCompoennt";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth, loginUser, setAdmin, setAuth} from "./actions/actions";
import CatalogProducts from "./components/catalogProducts/CatalogProducts";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import {IUser} from "./interfaces/BasicInterface";
import Profile from "./components/profile/Profile";
import NotFound from "./components/Pages/NotFound";

import VKLogin from "./components/Pages/VKLogin";
import ResetPasswordForm from "./components/auth/resetPasswordForm/ResetPasswordForm";
import ProductPage from "./components/Pages/ProductPage";
import Cart from "./components/Pages/Cart";

function App() {
    const dispatch = useDispatch()
    type CurrentUser = {
        curUser: IUser;
        isAuth: boolean
    }
    const {curUser, isAuth} = useSelector((state: CurrentUser) => state);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth().then(data => {
                dispatch(setAuth(true))
                dispatch(loginUser(data!.data.user))
                if (data!.data.user.admin) {
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
                    <Route path={'/'} element={<MainPage/>}/>
                    <Route path={'/catalog/:category_name'} element={<CatalogProducts/>}/>
                    <Route path={'/product/:id'} element={<ProductPage/>}/>
                    <Route path={'/blog'} element={<div/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                    <Route path={'/news'} element={<div/>}/>
                    <Route path={'/About-us'} element={<div/>}/>
                    <Route path={'/reset-password/:resetToken'} element={<ResetPasswordForm/>}/>
                    <Route path='*' element={<NotFound/>}/>
                    <Route path={'vk-login/:id'} element={<VKLogin/>}/>
                    {curUser.admin ? (
                        <Route path="/admin/*" element={<AdminPanel/>}/>
                    ) : (
                        <></>
                    )}
                    {isAuth ? (
                        <Route path="/account/:id" element={<Profile/>}/>
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
