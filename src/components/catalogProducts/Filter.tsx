import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import FilterService from "../../services/Filter";
import { useParams } from "react-router-dom";
import { FilterFetched, updateFilters } from "../../actions/actions";

const DropdownContainer = styled.div`
  margin-bottom: 16px;
`;

const DropdownLabel = styled.label`
  margin-right: 8px;
  font-weight: bold;
`;

const DropdownSelect = styled.select`
  padding: 4px;
  max-width: 15vw;
`;

const FilterDropdown = () => {
    const dispatch = useDispatch();
    const { filter }: any = useSelector(state => state);
    const { filters }: any = useSelector(state => state);
    const { getFiltres } = FilterService();
    const { category_name } = useParams();
    const [localFilters, setLocalFilters] = useState<{ [key: string]: string }>({});

    const takeFiltres = async () => {
        await getFiltres(category_name).then(data => {
            dispatch(FilterFetched(data.data));
        });
    };

    useEffect(() => {
        // Сброс фильтров при изменении category_name
        dispatch(updateFilters({}));
    }, [category_name]);

    useEffect(() => {
        takeFiltres();
    }, [category_name]);

    const handleFilterChange = (attribute: string, value: string) => {
        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            [attribute]: value,
        }));
    };

    const applyFilters = () => {
        // Удаление пустых значений фильтров перед отправкой запроса на сервер
        const filteredFilters = Object.fromEntries(
            Object.entries(localFilters).filter(([_, value]) => value !== "")
        );
        dispatch(updateFilters(filteredFilters));
    };

    return (
        <div>
            {Object.keys(filter).map(attribute => (
                <DropdownContainer key={attribute}>
                    <DropdownLabel>{attribute}:</DropdownLabel>
                    <DropdownSelect onChange={e => handleFilterChange(attribute, e.target.value)}>
                        <option value="">Все</option>
                        {filter[attribute].map((value: any) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </DropdownSelect>
                </DropdownContainer>
            ))}
            <button style={{background:"none"}} onClick={applyFilters}>Применить фильтры</button>
        </div>
    );
};

export default FilterDropdown;
