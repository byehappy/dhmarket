import MyCarousel from "./Carousel";
import {
    Container,
    ContButtons,
    ContText,
    H1,
    Picture,
    Subtitle,
    ButtonTwo,
    ButtonOne,
    ArrowButton, ButtonLeft, ButtonRight
} from './Carousel.style'
import xx from '../images/slide1.png'
import xx2 from '../images/laptop.svg'
import xx3 from '../images/mac.svg'
import left from '../images/left.svg'
import right from '../images/right.svg'

const MyPage: React.FC = () => {
    const items = [
        <Container key="1">
            <ContText>
                <H1>MacBook Pro 16”</H1>
                <Subtitle>Мы рады представить новый MacBook Pro 16, который будет идеальным выбором для всех
                    программистов.
                    Это ультра-тонкий
                    и легкий ноутбук с мощным процессором
                    и продвинутой графикой. Он оснащен новейшими технологиями и доставит вам удовольствие от работы с
                    любым
                    проектом.</Subtitle>
                <ContButtons>
                    <ButtonOne>Купить</ButtonOne>
                    <ButtonTwo>Узнать больше</ButtonTwo>
                </ContButtons>
            </ContText>
            <Picture src={xx}/>
        </Container>,
        <Container key="2">
            <ContText>
                <H1>iPad Pro 2022</H1>
                <Subtitle>Новый iPad Pro 2022 - это флагманский планшет, который сочетает в себе высокую
                    производительность и комфортное использование. Он был разработан с учетом потребностей
                    пользователей, чтобы сделать их жизнь более удобной и простой.</Subtitle>
                <ContButtons>
                    <ButtonOne>Купить</ButtonOne>
                    <ButtonTwo>Узнать больше</ButtonTwo>
                </ContButtons>
            </ContText>
            <Picture src={xx2}/>
        </Container>,
        <Container key="3">
            <ContText>
                <H1>iMac Pro 2022</H1>
                <Subtitle>Компьютер iMac 2022 - это высококачественное и мощное устройство, которое отличается новейшими
                    технологиями. iMac 2022 - это
                    не просто компьютер, а настоящее произведение искусства, которое добавит элегантности в любом
                    рабочем пространстве.</Subtitle>
                <ContButtons>
                    <ButtonOne>Купить</ButtonOne>
                    <ButtonTwo>Узнать больше</ButtonTwo>
                </ContButtons>
            </ContText>
            <Picture src={xx3}/>
        </Container>
    ];
    const PrevArrow = (props: any) => {
        const {onClick} = props;
        return (
            <ArrowButton style={{display: "block", background: "black"}}
                         onClick={onClick}>
                    <ButtonLeft src={left}/>
            </ArrowButton>
        );
    };

    const NextArrow = (props: any) => {
        const {onClick} = props;
        return (
            <ArrowButton style={{display: "block", background: "black"}}
                         onClick={onClick}>
                <ButtonRight src={right}/>
            </ArrowButton>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        prevArrow: <PrevArrow/>,
        nextArrow: <NextArrow/>
    };

    return (
        <div style={{width: "85%", margin: "0 auto"}}>
            <MyCarousel items={items} settings={settings}/>
        </div>
    );
};

export default MyPage;