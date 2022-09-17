import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProduct = ({ queryKey }) => {
  const productId = queryKey[1];
  return axios.get(`http://localhost:4000/products/${productId}`);
};

// const fetchProduct = (productId) => {
//   return axios.get(`http://localhost:4000/products/${productId}`);
// };

export function useProductData(productId, onSuccess, onError) {
  return useQuery(['product', productId], fetchProduct, {
    onSuccess: onSuccess,
    onError: onError,
    select: (data) => {
      const product = {
        id: data.data.id,
        title: data.data.title,
        price: data.data.price,
      };
      return product;
    },
  });

  // return useQuery(['product', productId], () => fetchProduct(productId), {
  //   onSuccess: onSuccess,
  //   onError: onError,
  //   select: (data) => {
  //     const product = {
  //       id: data.data.id,
  //       title: data.data.title,
  //       price: data.data.price,
  //     };
  //     return product;
  //   },
  // });
}

export default useProductData;
