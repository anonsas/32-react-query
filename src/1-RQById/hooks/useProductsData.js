import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = () => {
  return axios.get(`http://localhost:4000/products/`);
};

export function useProductsData(onSuccess, onError) {
  return useQuery(['products'], fetchProducts, {
    onSuccess: onSuccess,
    onError: onError,
    select: (data) => {
      const products = data.data.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
      }));
      return products;
    },
  });
}

export default useProductsData;
