const pubsub = require("./pubsub_extended");

pubsub.sub("ADD_TO_CART", (data) => {
  const { id } = data;
  console.log(`Product with id ${id} has been added to Cart`);
});
