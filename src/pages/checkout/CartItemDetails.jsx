import { formatMoney } from "../../utils/money";
import axios from "axios";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity,setQuantity]=useState(cartItem.quantity)
  const updateQuantity = async() => {
    if (isUpdatingQuantity) {
        await axios.put(`/api/cart-items/${cartItem.productId}`,{quantity : Number(quantity)})
        loadCart()
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };
  const handleQuantityKeyDown=(event)=>{
    const keyPressed=event.key
    if (keyPressed==='Enter'){
        updateQuantity()
    }
    else if (keyPressed==='Escape'){
        setQuantity(cartItem.quantity)
        setIsUpdatingQuantity(false);
    }
  }

  const updateQuantityInput=(event)=>{
    setQuantity(event.target.value)
  }
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };    
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdatingQuantity ? (
              <input type="text" value={quantity} onChange={updateQuantityInput}
              onKeyDown={handleQuantityKeyDown} className="quantity-textbox" />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            onClick={deleteCartItem}
            className="delete-quantity-link link-primary"
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
