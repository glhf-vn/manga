export type TikiResponse = {
  data?: Array<{
    id: number;
    name: string;
    thumbnail_url: string;
    url_path: string;
    price: number;
    original_price: number;
    discount: number;
  }>;
};

export type FahasaResponse = {
  product_list?: Array<{
    product_id: number;
    product_name: string;
    image_src: string;
    product_url: string;
    product_finalprice: number;
    product_price: number;
    discount: number;
  }>;
};

export interface ListingResponse {
  id: number;
  name: string;
  image: string;
  url: string;
  price: number;
  original_price: number;
  discount: number;
}
