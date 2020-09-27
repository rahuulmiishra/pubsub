const pubsub = require("./pubsub_extended");

const onAdd = () => {
  pubsub.pub("ADD_TO_CART", { id: "34" });
};

module.exports = { onAdd };
