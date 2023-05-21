import ProductsService from "../../services/ProductServices";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsFetched } from "../../actions/actions";
import React, { useEffect } from "react";
import ProductCard from "../cardProduct/CardProduct";
import { Container, ContainerGrid, ContainerLeft } from "./CatalogProducts.style";
import FilterDropdown from "./Filter";

const CatalogProducts = () => {
    const { products }: any = useSelector(state => state);
    const { filters }: any = useSelector(state => state);
    const { getProductsFromCategory } = ProductsService();
    const { category_name } = useParams();
    const dispatch = useDispatch();
    const takeProducts = async () => {
        await getProductsFromCategory(category_name, filters).then(data => {
            dispatch(productsFetched(data.data));
        });
    };

    useEffect(() => {
        takeProducts();
    }, [category_name, filters]);

    function renderItems(products: object[]) {
        return products.map(({ ...props }, id) => {
            return <ProductCard key={id} {...props} />;
        });
    }

    const elements = renderItems(products);

    return (
        <Container>
            <ContainerLeft>
                <FilterDropdown />
            </ContainerLeft>
            <ContainerGrid>{elements}</ContainerGrid>
        </Container>
    );
};

export default CatalogProducts;
