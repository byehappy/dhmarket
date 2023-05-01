import React, {useState} from "react";
import {ProductCardContainer, ProductImage, ProductRating, ProductPrice, ProductButtonsContainer, ProductName} from './CardProduct.style'
import cart from '../images/cartbutton.svg'
import srav from '../images/srav.svg'
import {Products} from "../../interfaces/BasicInterface";
const StarIcon = () => (
    <svg viewBox="0 0 24 24">
        <path
            fill="none"
            d="M0 0h24v24H0z"
        />
        <path
            d="M12.3 3.3l3.9 8 8.7 1.3-6.3 6.1 1.5 8.6-7.8-4-7.8 4 1.5-8.6L.1 12.6l8.7-1.3z"
        />
    </svg>
);

const ProductCard = ({image_url, name, price, rating, votes}:any) => {
    const [hovered, setHovered] = useState(false);
    return (
        <ProductCardContainer
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <ProductImage src={image_url} alt={name}/>
            <ProductName>{name}</ProductName>
            <ProductPrice>${price}</ProductPrice>
            {hovered ? (
                <ProductButtonsContainer className="product-buttons">
                    <button>Buy</button>
                    <button><img src={srav}/></button>
                    <button><img src={cart}/></button>
                </ProductButtonsContainer>
            ) : (
                <ProductRating className="product-rating">
                    <StarIcon/>
                    {rating.toFixed(1)} ({votes} votes)
                </ProductRating>
            )}
        </ProductCardContainer>
    );
};

export default ProductCard;
