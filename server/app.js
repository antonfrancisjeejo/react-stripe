const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HDFaKEgP5LIooFoT5qoGUdFtd5ryn0OUHAFyAjCy5uETB5rZRRIK6SJfkHRSOd2DgJgVPsDS0tN4HX7hE3h0oJO00LNwlfqrK"
);

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("It is working");
});

app.post("/payment", (req, res) => {
  console.log(req.body);
  const { product, token } = req.body;
  console.log(token);
  const idempontencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      console.log(customer);
      stripe.charges
        .create({
          amount: product.price,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: `The purchased ${product.name}`,
        })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

app.listen(5000, () => {
  console.log("Server has been started in 5000");
});
