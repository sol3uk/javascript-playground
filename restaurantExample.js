const Order = require("./Order");
const Item = require("./Item");

class Restaurant {
  constructor(name) {
    this.name = name;
    this.orders = [];
    this.revenue = 0;
  }

  takeOrder(order) {
    this.revenue += order.item.price;
    this.orders.push(order);
    console.log(`Added #${order.id} to the queue`);
    this.printRevenue();
  }

  printRevenue() {
    console.log(`${this.name} has made ${this.revenue} so far!`);
  }

  prepareOrders() {
    const prepareInterval = setInterval(() => {
      if (this.orders.length === 0) {
        console.log("Finished cooking all orders!");

        clearInterval(prepareInterval);
      } else {
        const order = this.orders.shift();

        console.log(`#${order.id} has been prepared.`);
      }
    }, 1000);
  }
}

const restaurant = new Restaurant("Nandos");
const restaurant2 = new Restaurant("Mcdonarasdl;fijdsfklujg");

const items = [
  new Item("Chicken Burger", 5.99),
  new Item("Drink", 3.5),
  new Item("Chips", 2.0)
];

const orders = items.map(item => new Order(item));

orders.forEach(order => restaurant.takeOrder(order));

restaurant.prepareOrders();