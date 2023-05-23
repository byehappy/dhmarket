import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ProductsService from '../../services/ProductServices';
import {Products} from '../../interfaces/BasicInterface';
import styled from 'styled-components';

const ProductCardContainer = styled.div`
  display: flex;
  margin: 1vw 7vw 6vw 7vw;
  flex-direction: column;
`;
const Container = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 1vw;
`
const ProductImage = styled.img`
  width: 25vw;
  object-fit: contain;
`;
const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 16px;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
`;

const BuyButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


const ProductDescription = styled.p`
  font-size: 2vw;
  color: #282c34;
  text-align: left;
`;

const ProductAttributes = styled.div`
  margin-top: 1vw;
`;

const AttributeTitle = styled.h1`
  font-size: 3vw;
  text-align: left;
`;

const AttributeItem = styled.li`
  font-size: 1.4vw;
  text-align: left;
  margin: 1vw;
`;

const ProductCard = () => {
    const {id} = useParams();
    const {getProduct} = ProductsService();
    const [product, setProduct] = useState<Products>();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct(id);
                setProduct(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <ProductCardContainer>
            <Container>
                <ProductInfoContainer>
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductPrice>Price: {product.price}</ProductPrice>
                    <BuyButton>Buy</BuyButton>
                </ProductInfoContainer>
                <ProductImage src={product.image_url} alt={product.name}/>
            </Container>
            <AttributeTitle>Description:</AttributeTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductAttributes>
                <AttributeTitle>Attributes:</AttributeTitle>
                {Object.entries(product.attributes).map(([key, value]) => (
                    <AttributeItem key={key}>
                        {key}: {value}
                    </AttributeItem>
                ))}
            </ProductAttributes>
        </ProductCardContainer>
    );
};

export default ProductCard;
