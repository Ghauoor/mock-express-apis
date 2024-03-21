const express = require("express");
const router = express.Router();
const Joi = require("joi"); // return a class

router.get("/", (req, res) => {
  res.send(products);
});

// router.get("/api/posts/:year/:month", (req, res) => {
//   //   res.send(req.params);
//   res.send(req.query);
// });

const products = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Lenovo" },
];

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(product);
}

router.get("/:id", (req, res) => {
  const product = products.find(
    (product) => product.id == parseInt(req.params.id)
  );
  if (!product) {
    res.status(404).send("Product with id is not find");
  }

  res.send(product);
});

router.post("/", (req, res) => {
  const { error } = validateProduct(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // if (!req.body.name || req.body.name <= 3) {
  //   // bad req
  //   res.status(400).send("Name is req is should be min 4 letters");
  //   return;
  // }

  const product = { id: products.length + 1, name: req.body.name };

  products.push(product);
  res.send(product);
});

router.put("/:id", (req, res) => {
  //look up the product
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  //if not existing 404-error
  if (!product) {
    res.status(404).send("Product is not found");
    return;
  }
  // // validating
  // const schema = Joi.object({
  //   name: Joi.string().min(3).required(),
  // });
  const { error } = validateProduct(req.body);
  // if not return 404
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  // update product
  product.name = req.body.name;
  // return the updated product
  res.send(product);
});

router.delete("/:id", (req, res) => {
  //look up the product
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  //if not existing 404-error
  if (!product) {
    res.status(404).send("Product is not found");
    return;
  }
  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send(product);
});

module.exports = router;
