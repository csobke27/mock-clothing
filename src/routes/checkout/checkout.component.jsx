import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {CheckoutContainer, HeaderBlock, Total, CheckoutHeader} from './checkout.styles';

const Checkout = () => {

    const { cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartTotal } = useContext(CartContext);
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((cartItem) => (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} addItemToCart={addItemToCart} removeItemFromCart={removeItemFromCart} clearItemFromCart={clearItemFromCart}/>
                    )
                )
            }
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
};

export default Checkout;