import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import useProductsData from '../hooks/useProductsData';

function Products() {
  const onSuccess = (data) => {
    console.log('Products Fetched Successfully', data);
  };

  const onError = (error) => {
    console.log('Products Encountered Error', error);
  };

  const { isLoading, data, isError, error } = useProductsData(onSuccess, onError);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div>
      <h3>Products</h3>
      <div className="product-list">
        {data?.map((item) => (
          <Link to={`${item.id}`} key={item.id} className="product">
            <p>{item.title}</p>
            <p>{item.price}&euro;</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default Products;
