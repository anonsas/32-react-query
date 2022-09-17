import React from 'react';
import { useParams } from 'react-router-dom';
import useProductData from '../hooks/useProductData';
import Loader from '../../components/Loader/Loader';

function Product() {
  const { productId } = useParams();

  const onSuccess = (data) => {
    console.log('Product Data Fetch Success:', data);
  };

  const onError = (error) => {
    console.log('Product Data Fetch Error:', error);
  };

  const { isLoading, data, isError, error } = useProductData(
    productId,
    onSuccess,
    onError
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div>
      <h3>Product Details:</h3>
      <div className="product-item">
        <p>{data?.title}</p>
        <p>{data?.price}</p>
      </div>
    </div>
  );
}

export default Product;
