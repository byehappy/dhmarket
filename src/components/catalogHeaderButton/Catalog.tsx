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
                            <DropdownSubLink href="/laptops">Laptops</DropdownSubLink>
                            <DropdownSubLink href="/desktops">Desktops</DropdownSubLink>
                            <DropdownSubLink href="/tablets">Tablets</DropdownSubLink>
                            <DropdownSubLink href="/computer-accessories">Computer Accessories</DropdownSubLink>
                            <DropdownSubLink href="/monitors">Monitors</DropdownSubLink>
                        </DropdownSubLinkWrapper>
                    )}
                </DropdownLinkWrapper>
                <DropdownLinkWrapper>
                    <DropdownLink onClick={() => handleCategoryClick("Category 2")}>Household appliancesы</DropdownLink>
                    {selectedCategory === "Category 2" && (
                        <DropdownSubLinkWrapper>
                            <DropdownSubLink href="/tvs">TVs</DropdownSubLink>
                            <DropdownSubLink href="/vacuum-cleaner">Vacuum cleaner</DropdownSubLink>
                            <DropdownSubLink href="/fridge">Fridge</DropdownSubLink>
                            <DropdownSubLink href="/ironing">Ironing</DropdownSubLink>
                            <DropdownSubLink href="/washing-machine">Washing machine</DropdownSubLink>
                        </DropdownSubLinkWrapper>
                    )}
                </DropdownLinkWrapper>
            </DropdownContentWrapper>
        </DropdownWrapper>
    );
};

export default Dropdown;
