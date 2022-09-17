import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

function Heroes() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/heroes')
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Heroes Page</h2>
      {data?.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
}

export default Heroes;
