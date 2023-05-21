import React, {useEffect, useRef, useState} from 'react';
import {
    CatalogIcon,
    DropdownButton,
    DropdownContentWrapper,
    DropdownLink,
    DropdownLinkWrapper, DropdownSubLink, DropdownSubLinkWrapper,
    DropdownWrapper,
} from './Catalog.style'
import burger from '../images/burger.svg'

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setSelectedCategory(null);
    };

    const handleCategoryClick = (category: any) => {
        setSelectedCategory(category);
    };

    return (
        <DropdownWrapper ref={dropdownRef}>
            <DropdownButton onClick={toggleDropdown}>
                <CatalogIcon src={burger}/>
                    Catalog
            </DropdownButton>
            <DropdownContentWrapper isOpen={isOpen} className={isOpen ? 'show' : ''}>
                <DropdownLinkWrapper>
                    <DropdownLink onClick={() => handleCategoryClick("Category 1")}>Digital technology</DropdownLink>
                    {selectedCategory === "Category 1" && (
                        <DropdownSubLinkWrapper>
                            <DropdownSubLink href="/catalog/Laptops">Laptops</DropdownSubLink>
                            <DropdownSubLink href="/catalog/Desktops">Desktops</DropdownSubLink>
                            <DropdownSubLink href="/catalog/Tablets">Tablets</DropdownSubLink>
                            <DropdownSubLink href="/catalog/Computer Accessories">Computer Accessories</DropdownSubLink>
                            <DropdownSubLink href="/catalog/Monitors">Monitors</DropdownSubLink>
                        </DropdownSubLinkWrapper>
                    )}
                </DropdownLinkWrapper>
                <DropdownLinkWrapper>
                    <DropdownLink onClick={() => handleCategoryClick("Category 2")}>Household appliances</DropdownLink>
                    {selectedCategory === "Category 2" && (
                        <DropdownSubLinkWrapper>
                            <DropdownSubLink href="/catalog/TVs">TVs</DropdownSubLink>
                            <DropdownSubLink href="/catalog/Vacuum cleaner">Vacuum cleaner</DropdownSubLink>
                            <DropdownSubLink href="/catalog/Fridge">Fridge</DropdownSubLink>
                            <DropdownSubLink href="/catalog/Ironing">Ironing</DropdownSubLink>
                            <DropdownSubLink href="/catalog/Washing machine">Washing machine</DropdownSubLink>
                        </DropdownSubLinkWrapper>
                    )}
                </DropdownLinkWrapper>
            </DropdownContentWrapper>
        </DropdownWrapper>
    );
};

export default Dropdown;
