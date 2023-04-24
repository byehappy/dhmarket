import {createPortal} from "react-dom";
import React, {useEffect, useRef} from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {
    ButtonCont,
    Container,
    ContainerItem,
    Email,
    EmailCont,
    H1,
    HeadCont,
    Logo,
    Password,
    PasswordCont,
    Picture,
    Submit,
    SwapButton
} from "./Modal.style";
import right from '../images/right-picture.svg'
import logo from '../images/logo_for_auth.svg'

const modalRootElement: any = document.querySelector('#portal')

const Modal = (props: any) => {
    const {open, onClose} = props;
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

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Неверный формат email').required('Это поле обязательно для заполнения'),
        password: Yup.string().required('Это поле обязательно для заполнения'),
    });

    const handleSubmit = (values: any, {setSubmitting}: any) => {
        // отправить данные на сервер для проверки
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
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
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return createPortal(
        <>
            {open ? (
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
                        <Formik initialValues={initialValues} validationSchema={validationSchema}
                                onSubmit={handleSubmit}>
                            {({isSubmitting}) => (
                                <Form>
                                    <EmailCont>
                                        Адрес электронной почты
                                        <Field type="email" name="email" as={Email}/>
                                        <ErrorMessage name="email" component="div" className="error"/>
                                    </EmailCont>
                                    <PasswordCont>
                                        Пароль
                                        <Field type="password" name="password" as={Password}/>
                                        <ErrorMessage name="password" component="div" className="error"/>
                                    </PasswordCont>
                                    <Submit type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Загрузка...' : 'Войти'}
                                    </Submit>
                                </Form>
                            )}
                        </Formik>
                    </ContainerItem>
                    <Picture src={right}/>
                </Container> ): null}
        </>
        , modalRootElement);
}

export default Modal;
