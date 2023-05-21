import {
    ContainerTemp,
    Email,
    EmailCont, ErrorMessages,
    H1,
    Password,
    PasswordCont,
    Submit
} from "./Modal.style";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import AuthService from "../../services/AuthServices";
import {useDispatch} from "react-redux";
import {loginUser, setAdmin, setAuth} from "../../actions/actions";
import {useState} from "react";

const AuthForm = ({onClose}: any) => {
    const {login} = AuthService()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState('')
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Неверный формат email').required('Это поле обязательно для заполнения'),
        password: Yup.string().required('Это поле обязательно для заполнения').min(6, 'Пароль слишком короткий')
            .matches(/[a-zA-Z]/, 'Используйте только латинские буквы a-z'),
    });

    const handleSubmit = async (email: string, password: string) => {
        try {
            const response = await login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(loginUser(response.data.user))
            dispatch(setAuth(true))
            if (response.data.user.admin)
                dispatch(setAdmin(true))
            onClose()
        } catch (e: any) {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(e.response.data, 'text/html');
            const errorMessage: any = htmlDoc.querySelector('body')?.innerText.trim();
            setErrors(errorMessage);
        }
    }

    return (
        <>
            <H1>Вход в аккаунт</H1>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                    onSubmit={values => console.log(JSON.stringify(values))}>
                {({isSubmitting, isValid, dirty, values, resetForm}) => (
                    <Form>
                        <EmailCont>
                            Адрес электронной почты
                            <Field type="email" name="email" as={Email}/>
                            <ErrorMessage name="email" component="div" className="ErrorMessages"/>
                        </EmailCont>
                        <PasswordCont>
                            Пароль
                            <Field type="password" name="password" as={Password}/>
                            <ErrorMessage name="password" component="div" className="ErrorMessages"/>
                        </PasswordCont>
                        <ContainerTemp>
                            <Submit type="submit" disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                                isSubmitting = true
                                await handleSubmit(values.email, values.password)
                                setTimeout(() => resetForm(), 500)
                            }}>
                                {isSubmitting ? 'Загрузка...' : 'Войти'}
                            </Submit>
                            {errors.length > 0 ? <ErrorMessages>
                                {errors}
                            </ErrorMessages> : null}
                        </ContainerTemp>
                    </Form>
                )}
            </Formik>
        </>
    )
}
export default AuthForm;

