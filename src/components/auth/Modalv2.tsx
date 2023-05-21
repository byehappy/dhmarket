import {createPortal} from "react-dom";
import React, {useEffect, useRef, useState} from "react";
import {
    ButtonCont,
    Container,
    ContainerItem,
    HeadCont,
    Logo,
    PictureRight,
    SwapButton,
    PictureLeft
} from "./Modal.style";
import Right from '../images/right-picture.svg'
import Left from '../images/left-picture.svg'
import logo from '../images/logo_for_auth.svg'
import AuthForm from "./authForm";
import RegForm from "./regForm";

const modalRootElement: any = document.querySelector('#portal')

const Modal = (props: any) => {
    const {open, onClose} = props;
    const [authForm, setAuthForm] = useState<boolean>(true)
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        const checkOutside = (e: any) => {
            if (e.target?.contains(ref.current) && e.target !== ref.current) {
                onClose && onClose();
            }
        }
        document.addEventListener('click', checkOutside);
        document.addEventListener('scroll', checkOutside);
        return () => {
            document.removeEventListener('click', checkOutside)
            document.removeEventListener('scroll', checkOutside)
        }
    }, [onClose]);
    return createPortal(
        <>
            {open ? (
                <Container AuthForm={authForm}>
                    <ContainerItem AuthForm={authForm} ref={ref}>
                        {authForm ? (<><HeadCont>
                            <Logo src={logo}/>
                            <ButtonCont>
                                Нет аккаунта?
                                <SwapButton onClick={() => setAuthForm(false)}>Зарегистрироваться</SwapButton>
                            </ButtonCont>
                        </HeadCont>
                            <AuthForm onClose={onClose}/>
                        </>) : (
                            <><HeadCont>
                            <Logo src={logo}/>
                            <ButtonCont>
                                Есть аккаунт?
                                <SwapButton onClick={() => setAuthForm(true)}>Войти</SwapButton>
                            </ButtonCont>
                        </HeadCont>
                                <RegForm onClose={onClose}/>
                            </>)}
                    </ContainerItem>
                    {authForm ? <PictureRight src={Right}/> : <PictureLeft src={Left}/>}

                </Container>) : null}
        </>
        , modalRootElement);
}

export default Modal;
