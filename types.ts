export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItemType extends Product {
  quantity: number;
}

export interface AiRecipe {
  title: string;
  summary: string;
  ingredients: string[];
}
