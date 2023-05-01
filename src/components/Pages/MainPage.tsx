import React, {useCallback, useEffect} from "react";
import partners from '../images/partners.png'
import {Partners} from "../carousel/Carousel.style";
import MyPage from "../carousel/PageCarousel";
import ProductCard from "../cardProduct/CardProduct";
import styled from "styled-components";
import Novetly from "../novelty/Novetly";
import ProductsService from "../../services/ProductServices";
import {useDispatch, useSelector} from 'react-redux';
import {productsFetched} from "../../actions/actions";

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
    const {products}: any = useSelector(state => state)
    const {getProducts} = ProductsService()
    const dispatch = useDispatch()
    const BestSellProducts = useCallback(async () => {
         getProducts().then((data) => {
            dispatch(productsFetched(data.data))
        })
    }, [])

    useEffect(() => {
        BestSellProducts()
    }, []);

    function renderItems(products: object[]) {
        return products.map(({...props}, id) => {
                return (<ProductCard key={id} {...props} />)
            }
        )
    }

    const elements = renderItems(products)
    return (
        <div>
            <MyPage/>
            <Partners src={partners}/>
            <BstSel>Best Seller</BstSel>
            <ProductsContainer>
                {elements}
            </ProductsContainer>
            <Novetly/>
            <BstSel>Best Seller</BstSel>
            <ProductsContainer>
                {elements}
            </ProductsContainer>
            <BstSel>Best Seller</BstSel>
            <ProductsContainer>
                {elements}
            </ProductsContainer>
        </div>
    )

}

export default MainPage;