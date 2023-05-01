import AuthService from "../../services/AuthServices";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {Email, EmailCont, H1, Name, NameCont, Password, PasswordCont, Submit} from "./Modal.style";
import {ErrorMessage, Field, Form, Formik} from "formik";

const RegForm = () =>{
    const {registration} = AuthService()
    const dispatch = useDispatch()
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
        } catch (e:any) {
            console.log(e.response?.data?.message)
        }
    }
    return(
        <>
            <H1>Регистрация</H1>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                    onSubmit={values => console.log(JSON.stringify(values))}>
                {({isSubmitting,isValid,dirty,values,resetForm}) => (
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
                            <Submit type="submit" disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                            isSubmitting = true
                            await handleSubmit(values.email, values.password,values.confirmPassword,values.name)
                            setTimeout(() => resetForm(), 500)
                        }}>
                            {isSubmitting ? 'Загрузка...' : 'Войти'}
                        </Submit>
                    </Form>
                )}
            </Formik>
        </>
    )
}
export default RegForm;