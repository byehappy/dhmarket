import {
    ButtonsContainer,
    FooterContainer,
    LogoContainer,
    Picture,
    TextLogo,
    Buttons,
    SocialContainer, SocialButton, SocialImage
} from "./FooterComponent.style";
import logo from "../images/logo.svg";
import instagram from '../images/Instagram.svg'
import facebook from '../images/Facebook.svg'
import twitter from  '../images/Twitter.svg'

const FooterCompoennt = () =>{

    return(
        <FooterContainer>
            <LogoContainer to={'/'}>
                <Picture src={logo}/>
                <TextLogo>
                    Digital
                    Household
                    market
                </TextLogo>
            </LogoContainer>
            <ButtonsContainer>
                <Buttons to={'/about-us'}>
                    About us
                </Buttons>
                <Buttons to={'/blog'}>
                    Blog
                </Buttons>
                <Buttons to={'/news'}>
                    News
                </Buttons>
            </ButtonsContainer>
            <SocialContainer>
                <SocialButton href={'https://instagram.com'}>
                    <SocialImage src={instagram}/>
                </SocialButton>
                <SocialButton href={'https://facebook.com'}>
                    <SocialImage src={facebook}/>
                </SocialButton>
                <SocialButton href={'https://twitter.com'}>
                    <SocialImage src={twitter}/>
                </SocialButton>
            </SocialContainer>
        </FooterContainer>
    )
}

export default FooterCompoennt;