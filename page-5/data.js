const U = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80`;

const CATEGORIES = [
  { id: "cakes", name: "Artisan Cakes" },
  { id: "croissants", name: "Croissants" },
  { id: "donuts", name: "Glazed Donuts" },
  { id: "cookies", name: "Soft Cookies" },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Berry Velvet Tart",
    cat: "cakes",
    price: 45,
    weight: "1 pc",
    tag: "Best Seller",
    img: U("1565958011703-44f9829ba187"),
  },
  {
    id: "p2",
    name: "Classic Layer Cake",
    cat: "cakes",
    price: 450,
    weight: "1 kg",
    img: U("1578985545062-69928b1d9587"),
  },
  {
    id: "p3",
    name: "Almond Butter Croissant",
    cat: "croissants",
    price: 16,
    weight: "120 g",
    img: U("1530610476181-d83430b64dcd"),
  },
  {
    id: "p4",
    name: "Plain Butter Croissant",
    cat: "croissants",
    price: 18,
    weight: "100 g",
    img: U("1555507036-ab1f4038808a"),
  },
  {
    id: "p5",
    name: "Rose Glazed Donut",
    cat: "donuts",
    price: 20,
    weight: "1 pc",
    tag: "New",
    img: U("1514517220017-8ce97a34a7b6"),
  },
  {
    id: "p6",
    name: "Vanilla Sprinkle Donut",
    cat: "donuts",
    price: 25,
    weight: "1 pc",
    img: U("1551024601-bec78aea704b"),
  },
  {
    id: "p7",
    name: "Dark Choco Chunk",
    cat: "cookies",
    price: 25,
    weight: "80 g",
    img: U("1558961363-fa8fdf82db35"),
  },
  {
    id: "p8",
    name: "Brown Butter Cookie",
    cat: "cookies",
    price: 30,
    weight: "80 g",
    img: U("1499636136210-6f4ee915583e"),
  },
];
