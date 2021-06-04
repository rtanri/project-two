class Post {
  constructor(customerName, serviceName, category, image, index) {
    this.customer = customerName,
    this.service = serviceName,
    this.image = image,
    this.category = category,
    this.index;
  }
}

const customers = [
  {
    customerName: 'Jessica',
    serviceName: 'Keratin Lashlift',
    category: ['lashlift'],
    image: "/public/assets/customers/lashlift-1.jpg",
  },
  {
    customerName: 'Maria',
    serviceName: 'Keratin Lashlift',
    category: ['lashlift'],
    image: "/public/assets/customers/lashlift-2.jpg",
  },
  {
    customerName: 'Kelly',
    serviceName: 'Russian Volume Eyelash Extension',
    category: ['eyelash extension', 'russian volume'],
    image: "/public/assets/customers/russian-volume-ext-6",
  }
];

module.exports = {
  customers: customers.map(element, index) => new Post(
        element.customerName,
        element.serviceName,
        element.category,
        element.image,
        index
  )
};