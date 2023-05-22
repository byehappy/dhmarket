import {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {
    Container,
    ContainerTemp,
    ErrorMessages,
    H1,
    Password,
    PasswordCont,
    Submit
} from "./ResetPasswordForm.style";
import AuthService from "../../services/AuthServices";
import {useNavigate,useParams} from "react-router-dom";

const ResetPasswordForm = () => {
    const {resetPassword} = AuthService();
    const [errorMessage, setErrorMessage] = useState("");
    const {resetToken} = useParams()
    const navigate = useNavigate();
    const initialValues = {
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        password: Yup.string()
            .required("Введите пароль")
            .min(6, "Минимальная длина пароля - 6 символов"),
        confirmPassword: Yup.string()
            .required("Подтвердите пароль")
            .oneOf([Yup.ref("password")], "Пароли должны совпадать"),
    });

    const handleSubmit = async (password: string) => {
        try {
            await resetPassword(resetToken, password);
            setErrorMessage("");
            navigate('/')
        } catch (error) {
            setErrorMessage("Произошла ошибка при сбросе пароля.");
        }
    };

    return (
        <>
            <H1>Смена пароля</H1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => console.log(JSON.stringify(values))}
            >
                {({isSubmitting, isValid, dirty, values, resetForm}) => (
                    <Form>
                        <Container>
                        <PasswordCont>
                            Новый пароль:
                            <Field type="password" name="password" id="password" as={Password}/>
                            <ErrorMessage name="password" component="div" className="ErrorMessages"/>
                        </PasswordCont>
                        <PasswordCont>
                            Подтвердите пароль:
                            <Field type="password" name="confirmPassword" id="confirmPassword" as={Password}/>
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="ErrorMessages"
                            />
                        </PasswordCont>
                        <ContainerTemp>
                            <Submit type="submit" disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                                isSubmitting = true
                                await handleSubmit(values.password)
                                setTimeout(() => resetForm(), 500)
                            }}>{isSubmitting ? 'Загрузка...' : 'Сбросить пароль'}</Submit>
                            {errorMessage.length > 0 ? <ErrorMessages>
                                {errorMessage}
                            </ErrorMessages> : null}
                        </ContainerTemp>
                        </Container>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default ResetPasswordForm;
