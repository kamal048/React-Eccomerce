import { DelivertTime } from "./DeliveryTime";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";

export function OrderSummary({deliveryOptions,cart,loadCart}) {

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DelivertTime deliveryOptions={deliveryOptions} cartItem={cartItem}/>

              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} loadCart={loadCart}/>
                

                <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
              </div>
            </div>
          );
        })}
    </div>
  );
}
