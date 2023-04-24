import {createPortal} from "react-dom";
import React, {useEffect, useRef, useState} from "react";
import {
    ButtonCont,
    Container,
    ContainerItem,
    Email,
    EmailCont,
    H1,
    HeadCont,
    Logo, Password, PasswordCont,
    Picture, Submit,
    SwapButton
} from "./Modal.style";
import right from '../images/right-picture.svg'
import logo from '../images/logo_for_auth.svg'

const modalRootElement: any = document.querySelector('#portal')

const Modal = (props: any) => {
    const {open, onClose} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>
    useEffect(() => {
        const checkOutside = (e: any) => {
            if (e.target?.contains(ref.current) && e.target !== ref.current) {
                setEmail('');
                setPassword('');
                onClose && onClose();
            }
            return
        }
        document.addEventListener('click', checkOutside);
        document.addEventListener('scroll', checkOutside);
        return () => {
            document.removeEventListener('click', checkOutside)
            document.removeEventListener('scroll', checkOutside)
        }
    }, [onClose])
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (!email || !password) {
            console.log('Введите адрес электронной почты и пароль!');
            return;
        }
        // отправить данные на сервер для проверки
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                // если пользователь авторизован успешно
                console.log('Вы успешно вошли в систему!', data);
                onClose(); // закрыть модальное окно
            })
            .catch((error) => {
                console.log('Ошибка авторизации!', error);
            });
    };
    return createPortal(<>
            {open ?
                <Container>
                    <ContainerItem ref={ref}>
                        <HeadCont>
                            <Logo src={logo}/>
                            <ButtonCont>
                                Нет аккаунта?
                                <SwapButton>Зарегистрироваться</SwapButton>
                            </ButtonCont>
                        </HeadCont>
                        <H1>Вход в аккаунт</H1>
                        <EmailCont>
                            Адрес электронной почты
                            <Email value={email} onChange={(e) => setEmail(e.target.value)} />
                        </EmailCont>
                        <PasswordCont>
                            Пароль
                            <Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </PasswordCont>
                        <Submit onClick={handleSubmit}>Войти</Submit>
                    </ContainerItem>
                    <Picture src={right}/>
                </Container> : null}
        </>
        , modalRootElement);
}

export default Modal;