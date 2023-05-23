import React, { useState } from "react";
import {
    ProductCardContainer,
    ProductImage,
    ProductRating,
    ProductPrice,
    ProductButtonsContainer,
    ProductName,
    Text
} from './CardProduct.style';
import cart from '../images/cartbutton.svg';
import { Link } from "react-router-dom";
import CartServices from "../../services/CartServices";
import {useSelector} from "react-redux";
import {IUser} from "../../interfaces/BasicInterface";

const StarIcon = () => (
    <svg viewBox="0 0 26 31">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12.3 3.3l3.9 8 8.7 1.3-6.3 6.1 1.5 8.6-7.8-4-7.8 4 1.5-8.6L.1 12.6l8.7-1.3z" />
    </svg>
);
type CurrentUser = {
    curUser: IUser;
}
const ProductCard = ({ id, image_url, name, price, rating, votes }: any) => {
    const [hovered, setHovered] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const {curUser} = useSelector((state: CurrentUser) => state)
    const addToCart = () => {
        const customerId = curUser.id
        const productId = id;

        CartServices.addToCart(customerId, productId)
            .then(response => {
                // Handle success if needed
                console.log("Product added to cart:", response.data);
                setAddedToCart(true);
            })
            .catch(error => {
                // Handle error if needed
                console.error("Failed to add product to cart:", error);
            });
    };

    return (
        <ProductCardContainer
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link style={{ color: 'black', textDecoration: 'none' }} to={`/product/${id}`}>
                <ProductImage src={image_url} alt={name} />
                <ProductName>{name}</ProductName>
                <ProductPrice>${price}</ProductPrice>
            </Link>
            {hovered ? (
                <ProductButtonsContainer>
                    {addedToCart ? (
                        <button disabled><Text>Added to Cart</Text></button>
                    ) : (
                        <button onClick={addToCart}><Text>Buy <img style={{ marginLeft: '1vw' }} src={cart} /></Text></button>
                    )}
                </ProductButtonsContainer>
            ) : (
                <ProductRating className="product-rating">
                    <StarIcon />
                    {rating.toFixed(1)} ({votes} votes)
                </ProductRating>
            )}
        </ProductCardContainer>
    );
};

export default ProductCard;
