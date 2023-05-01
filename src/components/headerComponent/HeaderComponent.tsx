import {
    BasicButtonsContainer, ButtonCont,
    Buttons, Buttons2,
    Container,
    ContainOne, ContainTwo, Icon,
    Logo,
    LogoText,
    SearchContainer,
    SearchIcon,
    SearchInput, UserButton, UserCont, UserText
} from "./HeaderComponent.style";
import logo from '../images/logo.svg'
import loop from '../images/loop.svg'
import cart from '../images/cart.svg'
import {NavLink} from "react-router-dom";
import Dropdown from "../catalogHeaderButton/Catalog";
import profile from "../images/profile.svg";
import {BasicButton} from "../auth/Modal.style";
import React, {useState} from "react";
import Modal from "../auth/Modalv2";
import {useSelector} from "react-redux";
import {IUser} from "../../interfaces/BasicInterface";

type CurrentUser = {
    curUser: IUser;
    isAuth: boolean;
}
const HeaderComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {curUser, isAuth} = useSelector((state: CurrentUser) => state)

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    return (
        <Container>
            <ContainOne>
                <Buttons to={'/'}>
                    <Logo src={logo}/>
                    <LogoText>
                        Digital
                        Household
                        market
                    </LogoText>
                </Buttons>
                <ButtonCont>
                    <Buttons to={'/about-us'}>
                        About us
                    </Buttons>
                    <Buttons to={'/blog'}>
                        Blog
                    </Buttons>
                    <Buttons to={'/news'}>
                        News
                    </Buttons>
                </ButtonCont>
                <SearchContainer><SearchInput/><SearchIcon src={loop}/></SearchContainer>
                <BasicButtonsContainer>
                    {isAuth && curUser ?
                        <>
                            <UserCont>
                                <UserText>Приятно вас видеть! {curUser.name}</UserText>
                                <UserButton>Выйти</UserButton>
                            </UserCont>
                            <BasicButton>
                                <Icon src={profile}/>
                            </BasicButton>
                        </>
                        :
                        <>
                            <BasicButton onClick={handleOpenModal}>
                                <Icon src={profile}/>
                            </BasicButton>
                            {isOpen && <Modal open={isOpen} onClose={handleCloseModal}/>}
                        </>}
                    <NavLink to={'/cart'}>
                        <Icon src={cart}/>
                    </NavLink>
                </BasicButtonsContainer>
            </ContainOne>
            <ContainTwo>
                <Dropdown/>
                <Buttons2 to={'/best-sel'}>
                    Best Seller
                </Buttons2>
                <Buttons2 to={'/popular'}>
                    Popular
                </Buttons2>
                <Buttons2 to={'/best-creator'}>
                    Best Creator
                </Buttons2>
            </ContainTwo>
        </Container>
    )
}

export default HeaderComponent;