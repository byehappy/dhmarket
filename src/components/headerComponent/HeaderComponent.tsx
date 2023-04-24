import {
    BasicButtonsContainer, ButtonCont,
    Buttons, Buttons2,
    Container,
    ContainOne, ContainTwo, Icon,
    Logo,
    LogoText,
    SearchContainer,
    SearchIcon,
    SearchInput
} from "./HeaderComponent.style";
import logo from '../images/logo.svg'
import loop from '../images/loop.svg'
import cart from '../images/cart.svg'
import {NavLink} from "react-router-dom";
import Dropdown from "../catalogHeader/Catalog";
import profile from "../images/profile.svg";
import {BasicButton} from "../auth/Modal.style";
import React, {useState} from "react";
import Modal from "../auth/Modalv2";

const HeaderComponent = ()=>{
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }
    const categories = [
        {
            name: 'Digital',
            subcategories: ['Computers & Tablets', 'TV & Video', 'Audio', 'Smart Home', 'Cameras & Camcorders'],
        },
        {
            name: 'Household',
            subcategories: ['Appliances', 'Furniture', 'Home Decor', 'Kitchen & Dining', 'Bedding & Bath'],
        },
    ];
    return(
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
                    <BasicButton onClick={handleOpenModal}><Icon src={profile}/></BasicButton>
                    {isOpen && <Modal open={isOpen} onClose={() => setIsOpen(false)}/>}
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