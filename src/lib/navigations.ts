type Item = {
  label: string;
  slug: string;
};

type Section = {
  title: string;
  slug: string;
  items: Item[];
};

type Category = {
  title: string;
  slug: string;
  sections: Section[];
};

export const categories: Category[] = [
  {
    title: "Men",
    slug: "men",
    sections: [
      {
        title: "Casual Wear",
        slug: "casual-wear",
        items: [
          { label: "T-shirts", slug: "t-shirts" },
          { label: "Polos", slug: "polos" },
          { label: "Sweatshirts", slug: "sweatshirts" },
          { label: "Hoodies", slug: "hoodies" },
          { label: "Denim Jeans", slug: "denim-jeans" },
        ],
      },
      {
        title: "Formal Wear",
        slug: "formal-wear",
        items: [
          { label: "Suits", slug: "suits" },
          { label: "Dress Shirts", slug: "dress-shirts" },
          { label: "Blazers", slug: "blazers" },
          { label: "Formal Trousers", slug: "formal-trousers" },
          { label: "Ties & Accessories", slug: "ties" },
        ],
      },
      {
        title: "Sports Wear",
        slug: "sports-wear",
        items: [
          { label: "Activewear", slug: "activewear" },
          { label: "Gym Wear", slug: "gym-wear" },
          { label: "Sports Shorts", slug: "sports-shorts" },
          { label: "Running Gear", slug: "running-gear" },
          { label: "Swimwear", slug: "swimwear" },
        ],
      },
      {
        title: "Outerwear",
        slug: "outerwear",
        items: [
          { label: "Jackets", slug: "jackets" },
          { label: "Coats", slug: "coats" },
          { label: "Windbreakers", slug: "windbreakers" },
          { label: "Bomber Jackets", slug: "bomber-jackets" },
          { label: "Winter Wear", slug: "winter-wear" },
        ],
      },
      {
        title: "Underwear and Loungewear",
        slug: "underwear-and-loungewear",
        items: [
          { label: "Underwear", slug: "underwear" },
          { label: "Boxers", slug: "boxers" },
          { label: "Loungewear", slug: "loungewear" },
          { label: "Sleepwear", slug: "sleepwear" },
          { label: "Socks", slug: "socks" },
        ],
      },
    ],
  },
  // Add more categories like "Women", "Kids", etc., here...
  {
    title: "Women",
    slug: "women",
    sections: [
      {
        title: "Casual Wear",
        slug: "casual-wear",
        items: [
          { label: "T-shirts", slug: "t-shirts" },
          { label: "Blouses", slug: "blouses" },
          { label: "Skirts", slug: "skirts" },
          { label: "Pants", slug: "pants" },
          { label: "Dresses", slug: "dresses" },
        ],
      },
      {
        title: "Formal Wear",
        slug: "formal-wear",
        items: [
          { label: "Suits", slug: "suits" },
          { label: "Tailored Blazers", slug: "tailored-blazers" },
          { label: "Dress Shirts", slug: "dress-shirts" },
          { label: "Office Skirts", slug: "office-skirts" },
          { label: "Trousers", slug: "trousers" },
        ],
      },
      {
        title: "Evening Wear",
        slug: "evening-wear",
        items: [
          { label: "Dresses", slug: "dresses" },
          { label: "Gowns", slug: "gowns" },
          { label: "Cocktail Dresses", slug: "cocktail-dresses" },
          { label: "Special Occasion Wear", slug: "special-occasion-wear" },
          { label: "Trousers", slug: "trousers" },
        ],
      },
      {
        title: "Outerwear",
        slug: "outerwear",
        items: [
          { label: "Coats", slug: "coats" },
          { label: "Jackets", slug: "jackets" },
          { label: "Raincoats", slug: "raincoats" },
          { label: "Capes", slug: "capes" },
        ],
      },
      {
        title: "Lingerie and Loungewear",
        slug: "lingerie-and-loungewear",
        items: [
          { label: "Bras", slug: "bras" },
          { label: "Panties", slug: "panties" },
          { label: "Sleepwear", slug: "sleepwear" },
          { label: "Robes", slug: "robes" },
          { label: "Pyjama Sets", slug: "pyjama-sets" },
        ],
      },
    ],
  },
  // {
  //   title: "Kids",
  //   slug: "kids",
  //   sections: [
  //     {
  //       title: "Casual Wear",
  //       slug: "casual-wear",
  //       items: [
  //         { label: "T-shirts", slug: "t-shirts" },
  //         { label: "Shorts", slug: "shorts" },
  //         { label: "Jeans", slug: "jeans" },
  //         { label: "Dresses", slug: "dresses" },
  //         { label: "Skirts", slug: "skirts" },
  //       ],
  //     },
  //     {
  //       title: "School Wear",
  //       slug: "school-wear",
  //       items: [
  //         { label: "Uniform Shirts", slug: "uniform-shirts" },
  //         { label: "Pinafores", slug: "pinafores" },
  //         { label: "Trousers", slug: "trousers" },
  //         { label: "Cardigans", slug: "cardigans" },
  //         { label: "School Shoes", slug: "school-shoes" },
  //       ],
  //     },
  //     {
  //       title: "Playtime Wear",
  //       slug: "playtime-wear",
  //       items: [
  //         { label: "Tracksuits", slug: "tracksuits" },
  //         { label: "Sweatshirts", slug: "sweatshirts" },
  //         { label: "Joggers", slug: "joggers" },
  //         { label: "Active Shorts", slug: "active-shorts" },
  //         { label: "Hoodies", slug: "hoodies" },
  //       ],
  //     },
  //     {
  //       title: "Outerwear",
  //       slug: "outerwear",
  //       items: [
  //         { label: "Jackets", slug: "jackets" },
  //         { label: "Coats", slug: "coats" },
  //         { label: "Raincoats", slug: "raincoats" },
  //         { label: "Sweaters", slug: "sweaters" },
  //       ],
  //     },
  //     {
  //       title: "Sleepwear",
  //       slug: "sleepwear",
  //       items: [
  //         { label: "Pyjamas", slug: "pyjamas" },
  //         { label: "Nightgowns", slug: "nightgowns" },
  //         { label: "Onesies", slug: "onesies" },
  //         { label: "Rompers", slug: "rompers" },
  //       ],
  //     },
  //     {
  //       title: "Accessories",
  //       slug: "accessories",
  //       items: [
  //         { label: "Hats", slug: "hats" },
  //         { label: "Socks", slug: "socks" },
  //         { label: "Backpacks", slug: "backpacks" },
  //         { label: "Belts", slug: "belts" },
  //         { label: "Scarves & Gloves", slug: "scarves-gloves" },
  //       ],
  //     },
  //   ],
  // },
];
