import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart() {
  // const cartCtx = useContext(CartContext);
  // We can also destructure the cartCtx object
  const {items, updatedItemQuantity} = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updatedItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updatedItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}

// We can also consume the value of the context by following approach
// But this is a bit cumbersome and used in older projects
// We don't need useContext hook if we wrap the component like this
{/* <Context.Consumer>
  {(ctx)=>{
    return(

    )
  }}
</Context.Consumer> */}
