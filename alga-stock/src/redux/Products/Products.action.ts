import { Product } from "../../shared/Table/Table.mockdata";
import { Action } from "./Products.reducer";

export const insertNewProduct = (): Action<Product> => {
  return {
    type: 'INSERT_NEW_PRODUCT',
    payload: {
      _id: '123lkdj', 
      name:'Cookie',
      price: 0.75,
      stock: 700
    }
  }
}