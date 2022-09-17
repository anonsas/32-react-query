import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchHeroes = () => {
  return axios.get(`http://localhost:4000/heroes`);
};

const fetchFriends = () => {
  return axios.get(`http://localhost:4000/friends`);
};

function ParallelQueries() {
  const { data: heroes } = useQuery(['heroes'], fetchHeroes);
  const { data: friends } = useQuery(['friends'], fetchFriends);

  console.log('heroes', heroes);
  console.log('friends', friends);

  return <div>ParallelQueries</div>;
}

export default ParallelQueries;
