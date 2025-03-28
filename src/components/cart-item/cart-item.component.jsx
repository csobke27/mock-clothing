import {CartItemContainer, ItemDetails} from './cart-item.styles';

const CartItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <span>{name}</span>
                <span>{quantity} x ${price}</span>
            </ItemDetails>
            {/* <span>{quantity}</span> */}
        </CartItemContainer>
    );
};

export default CartItem;