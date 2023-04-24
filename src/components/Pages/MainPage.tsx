import React, {useEffect, useState} from "react";
import partners from '../images/partners.png'
import {Partners} from "../carousel/Carousel.style";
import MyPage from "../carousel/PageCarousel";
import ProductCard from "../cardProduct/CardProduct";
import styled from "styled-components";
import {Product} from "../../interfaces/BasicInterface";
import Novetly from "../novelty/Novetly";



const BstSel = styled.div`
  font-family: 'Arimo';
  font-size: 3vw;
  text-align: left;
  margin: 3vw 0 0 7vw;
`
const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 1vw 7vw 0 7vw;
`;

const MainPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/products/top")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <MyPage/>
            <Partners src={partners}/>
            <BstSel>Best Seller</BstSel>
            <ProductsContainer>
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </ProductsContainer>
            <Novetly/>
            <BstSel>Best Seller</BstSel>
            <ProductsContainer>
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </ProductsContainer>
            <BstSel>Best Seller</BstSel>
            <ProductsContainer>
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </ProductsContainer>
        </div>
    )

}

export default MainPage;