import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsersList = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};

function useUsersData(onSuccess, onError) {
  return useQuery(
    ['users'], // --- unique key
    fetchUsersList, // --- fetcher function
    {
      // --- object where we specify configurations to change its behavior
      onSuccess: onSuccess,
      onError: onError,
      select: (data) => {
        //automatically receives API data as argument
        const users = data.data.map((user) => ({
          name: user.name,
          email: user.email,
        }));
        return users;
      },
    }
  );
}

export default useUsersData;
