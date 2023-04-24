import {
    ButCategories,
    ButtonCont,
    ButtonNovetly,
    Container,
    ContentContainer,
    H1, H2, Picture,
    Subtitle,
    TextContainer
} from "./Novetly.style";
import React, {useState} from "react";
import xx from '../images/slide1.png'

const LaptopContent = () =>
    <ContentContainer>
        <TextContainer>
            <H2>iPad Pro 2022</H2>
            <Subtitle>
                Новый iPad Pro 2022 - это флагманский планшет, который сочетает в себе высокую производительность и
                комфортное использование. Он был разработан с учетом потребностей пользователей, чтобы сделать их жизнь
                более удобной и простой.
            </Subtitle>
            <ButtonNovetly>More information</ButtonNovetly>
        </TextContainer>
        <Picture src={xx}/>
    </ContentContainer>;
const ComputerContent = () => <ContentContainer>
    <TextContainer>
        <H2>iPad Pro 2022</H2>
        <Subtitle>
            Новый iPad Pro 2022 - это флагманский планшет, который сочетает в себе высокую производительность и
            комфортное использование. Он был разработан с учетом потребностей пользователей, чтобы сделать их жизнь
            более удобной и простой.
        </Subtitle>
        <ButtonNovetly>More information</ButtonNovetly>
    </TextContainer>
    <Picture src={xx}/>
</ContentContainer>;
const AccessoryContent = () => <ContentContainer>
    <TextContainer>
        <H2>iMac Pro 2022</H2>
        <Subtitle>
            Компьютер iMac 2022 - это высококачественное и мощное устройство, которое отличается новейшими технологиями.
            iMac 2022 - это
            не просто компьютер, а настоящее произведение искусства, которое добавит элегантности в любом рабочем
            пространстве.
        </Subtitle>
        <ButtonNovetly>More information</ButtonNovetly>
    </TextContainer>
    <Picture src={xx}/>
</ContentContainer>;

const Novetly = () => {
    const [activeButton, setActiveButton] = useState('table');

    const handleButtonClick = (button: any) => {
        setActiveButton(button);
    };

    const getContentComponent = () => {
        switch (activeButton) {
            case 'table':
                return <LaptopContent/>;
            case 'laptop':
                return <ComputerContent/>;
            case 'computer accessory':
                return <AccessoryContent/>;
            default:
                return null;
        }
    };
    return (
        <div>
            <H1>Novetly</H1>
            <ButtonCont>
                <ButCategories
                    className={activeButton === 'table' ? 'active' : ''}
                    onClick={() => handleButtonClick('table')}>
                    Table
                </ButCategories>
                <ButCategories
                    className={activeButton === 'laptop' ? 'active' : ''}
                    onClick={() => handleButtonClick('laptop')}>
                    Laptops
                </ButCategories>
                <ButCategories
                    className={activeButton === 'computer accessory' ? 'active' : ''}
                    onClick={() => handleButtonClick('computer accessory')}>
                    Computer Accessories
                </ButCategories>
            </ButtonCont>
            <Container>
                {getContentComponent()}
            </Container>
        </div>
    )
}
export default Novetly;