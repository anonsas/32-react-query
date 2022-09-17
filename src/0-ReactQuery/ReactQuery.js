import React from 'react';
import useUsersData from './useUsersData';
import Loader from '../Loader/Loader';

function ReactQuery() {
  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useUsersData(
    onSuccess,
    onError
  );

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h3>Users List</h3>
      <button onClick={refetch}>Fetch Users List</button>
      {data?.map((user) => (
        <p key={user.name}>
          {user.name} {user.email}
        </p>
      ))}
    </div>
  );
}

export default ReactQuery;
