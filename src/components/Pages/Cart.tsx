import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartServices from "../../services/CartServices";
import { Products, IUser } from "../../interfaces/BasicInterface";
import styled from "styled-components";

const CartContainer = styled.div`
  margin: 2vw 7vw 6vw 7vw;
`;

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  margin: 0;
`;

const ProductPrice = styled.p`
  margin: 0;
  font-weight: bold;
`;

const QuantityInput = styled.input`
  width: 40px;
  margin-left: 10px;
`;

const UpdateButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  margin-left: auto;
  background-color: transparent;
  border: none;
  color: #ff0000;
  cursor: pointer;
`;

const EmptyCartMessage = styled.p`
  margin-top: 20px;
`;

const TotalPrice = styled.p`
  margin-top: 20px;
  font-weight: bold;
`;
const CheckoutButton = styled.button`
  margin-top: 10px;
  background-color: #008000;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


type CurrentUser = {
    curUser: IUser;
};

const Cart = () => {
    const { curUser } = useSelector((state: CurrentUser) => state);
    const [cartItems, setCartItems] = useState<Products[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        if (curUser) {
            const fetchCartItems = async () => {
                try {
                    const response = await CartServices.getCartItems(curUser.id);
                    setCartItems(response.data);
                    calculateTotalPrice(response.data);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchCartItems();
        }
    }, [curUser]);

    useEffect(() => {
        // Calculate the total price whenever the cart items change
        const calculateTotalPrice = () => {
            const totalPrice = cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            setTotalPrice(totalPrice);
        };

        calculateTotalPrice();
    }, [cartItems]);
    const calculateTotalPrice = (items: Products[]) => {
        const totalPrice = items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
        setTotalPrice(totalPrice);
    };
    const removeFromCart = async (customerId: string, productId: number) => {
        try {
            await CartServices.removeFromCart(customerId, productId);
            const updatedCartItems = cartItems.filter(
                (item) => item.id !== productId
            );
            setCartItems(updatedCartItems);
            calculateTotalPrice(updatedCartItems); // Recalculate total price after item removal
        } catch (error) {
            console.log(error);
        }
    };

    const updateCartItemQuantity = async (
        customerId: string,
        productId: number,
        quantity: number
    ) => {
        try {
            await CartServices.updateCartItemQuantity(
                customerId,
                productId,
                quantity
            );
            // Update the cart items after successful quantity update
            const updatedCartItems = cartItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            );
            setCartItems(updatedCartItems);
        } catch (error) {
            console.log(error);
        }
    };
    const checkout = async () => {
        try {
            // Clear the cart by making a delete request
            await CartServices.clearCart(curUser.id);
            // Display the delivery address message
            alert("Please wait for delivery to the provided address.");
            // Empty the cart items in the state
            setCartItems([]);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <CartContainer>
            <h2>Cart</h2>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item) => (
                        <CartItemContainer key={item.id}>
                            <ProductImage src={item.image_url} alt={item.name} />
                            <ProductDetails>
                                <ProductName>{item.name}</ProductName>
                                <ProductPrice>${item.price}</ProductPrice>
                            </ProductDetails>
                            <QuantityInput
                                type="number"
                                min={1}
                                value={item.quantity > 0 ? item.quantity : 1}
                                onChange={(e) =>
                                    updateCartItemQuantity(
                                        curUser.id,
                                        item.id,
                                        parseInt(e.target.value)
                                    )
                                }
                            />
                            <UpdateButton
                                onClick={() =>
                                    updateCartItemQuantity(
                                        curUser.id,
                                        item.id,
                                        item.quantity
                                    )
                                }
                            >
                                Update
                            </UpdateButton>
                            <RemoveButton
                                onClick={() => removeFromCart(curUser.id, item.id)}
                            >
                                Remove
                            </RemoveButton>
                        </CartItemContainer>
                    ))}
                    <TotalPrice>Total Price: ${totalPrice}</TotalPrice>
                    <CheckoutButton onClick={checkout}>Checkout</CheckoutButton>
                </>
            ) : (
                <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
            )}
        </CartContainer>
    );
};

export default Cart;
