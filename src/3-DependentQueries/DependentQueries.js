import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// Execute queries sequentially, one after the other.
// Scenario: one query is dependent on results of another query.

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

function DependentQueries({ email }) {
  const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email));
  const channelId = user?.data.channelId;

  // We want to fire this query, only after (channelId) is being retrieved.
  // And not when the component mounts, because (channelId) would be undefined.
  const { data: courses } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    { enabled: !!channelId }
  );
  const channelCourses = courses?.data.courses;
  console.log(channelCourses);

  return (
    <div>
      <h3>DependentQueries</h3>
      {channelCourses?.map((course) => (
        <p key={course}>{course}</p>
      ))}
    </div>
  );
}

export default DependentQueries;
