import React, { useState } from "react";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "React Course",
    price: 2000 * 100,
    productBy: "arprojectltd",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`http://localhost:5000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="app">
      <StripeCheckout
        stripeKey="pk_test_51HDFaKEgP5LIooFoeGkewS2UEzi7bLeW85TQzGH89fg96dudcZu5NbIVMP80ydJJJKAqgpTtlrQ9eYYjEkTJdZ1700T6hq14qY"
        token={makePayment}
        name="Buy React"
        amount={product.price}
        currency="INR"
      >
        <button className="btn-large blue">
          Buy React Course at {product.price / 100} INR
        </button>
      </StripeCheckout>
    </div>
  );
}

export default App;
