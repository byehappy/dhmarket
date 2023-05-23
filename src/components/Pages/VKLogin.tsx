import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import AuthService from "../../services/AuthServices";
import {useDispatch} from "react-redux";
import {loginUser, setAuth} from "../../actions/actions";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vw;
  width: auto;
  font-family: Rubik;
  font-weight: 700;
  font-size: 2vw;
`

const VKLogin = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {takeVKLogin} = AuthService()

    useEffect(() => {
        try {
            if (id !== undefined) {
                takeVKLogin(id).then((data) => {
                    localStorage.setItem('token', data.data.accessToken)
                    dispatch(loginUser(data.data.user))
                    dispatch(setAuth(true))
                    navigate('/')
                })
            }
        } catch (e) {
            console.log(e)
        }
    }, [id])
    return (<Container>
        Загрузка...
    </Container>)
}

export default VKLogin