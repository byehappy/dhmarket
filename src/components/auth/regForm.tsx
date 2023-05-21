import AuthService from "../../services/AuthServices";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {
    ContainerTemp,
    Email,
    EmailCont,
    ErrorMessages,
    H1,
    Name,
    NameCont,
    Password,
    PasswordCont,
    Submit
} from "./Modal.style";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useState} from "react";
import {string} from "yup";

const RegForm = ({onClose}: any) => {
    const {registration} = AuthService()
    const [errors, setErrors] = useState('')
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Неверный формат email').required('Это поле обязательно для заполнения'),
        password: Yup.string().required('Это поле обязательно для заполнения').min(6, 'Пароль слишком короткий')
            .matches(/[a-zA-Z]/, 'Используйте только латинские буквы a-z'),
        confirmPassword: Yup.string().required('Это поле обязательно для заполнения')
            .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
        name: Yup.string().required('Это поле обязательно для заполнения').min(4, 'Имя слишком короткое')
            .matches(/[a-zA-Z]/, 'Используйте только латинские буквы a-z')
    });
    const handleSubmit = async (email: string, password: string, confirmPassword: string, name: string) => {
        try {
            if (password !== confirmPassword) {
                throw new Error('Пароли не совпадают');
            }
            await registration(name, email, password)
            onClose();
        } catch (e: any) {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(e.response.data, 'text/html');
            const errorMessage: any = htmlDoc.querySelector('body')?.innerText.trim();
            setErrors(errorMessage);
        }
    }
    return (
        <>
            <H1>Регистрация</H1>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                    onSubmit={values => console.log(JSON.stringify(values))}>
                {({isSubmitting, isValid, dirty, values, resetForm}) => (
                    <Form>
                        <NameCont>
                            Имя пользователя
                            <Field type='name' name='name' as={Name}/>
                            <ErrorMessage name='name' component='div' className='ErrorMessages'/>
                        </NameCont>
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
                        <PasswordCont>
                            Подтвердите пароль
                            <Field type="password" name="confirmPassword" as={Password}/>
                            <ErrorMessage name="confirmPassword" component="div" className="ErrorMessages"/>
                        </PasswordCont>
                        <ContainerTemp>
                        <Submit type="submit" disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                            isSubmitting = true
                            await handleSubmit(values.email, values.password, values.confirmPassword, values.name)
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
export default RegForm;