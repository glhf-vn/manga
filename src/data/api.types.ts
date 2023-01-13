export interface DatabaseFilter {
  publishers?: "*" | string;
  types?: "*" | string;
}

export interface TikiResponse {
  data?: {
    id: number;
    name: string;
    thumbnail_url: string;
    url_path: string;
    price: number;
    original_price: number;
    discount: number;
  }[];
}

export interface FahasaResponse {
  product_list?: {
    product_id: number;
    product_name: string;
    image_src: string;
    product_url: string;
    product_finalprice: number;
    product_price: number;
    discount: number;
  }[];
}

export interface ListingResponse {
  id: number;
  name: string;
  image: string;
  url: string;
  price: number;
  original_price: number;
  discount: number;
}
