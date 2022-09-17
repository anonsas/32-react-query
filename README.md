A library for fetching data in a React application.
It makes fetching, synchronizing and updating server state.

---

Why?

1. Since React is a UI library, there is no specific pattern for data fetching.
2. useEffect hook for data fetching and useState hook to
   maintain component state like loading, error or resulting data.
3. If the data is needed throughout the app, we tend to use state management libraries.
4. Most of the state management libraries are good for working with client state.
5. State management libraries are not great for working with
   asynchronous or server state.

---

Client vs. Server State

Client:

- Persisted in your app memory and accessing or updating it is - synchronous.

Server:

- Persisted remotely and requires asynchronous APIs for fetching or updating.
- Has shared ownership.
- Data can be updated by someone else without your knowledge.
- UI data may not be in sync with the remote data.
- Challenging when you have to deal with caching,
  deduping multiple requests for the same data, updating stale data
  in the background, performance optimizations etc.

---

Fresh: This state is when we have the almost same data on both sides
(since when we received data, possible that someone is updated at the same time)
and there is no need to refetch it.

Fetching: When we initially fetch the data successfully or not.

Stale: Out of date data which we will need to re-fetch from the backend.

Inactive: This state is used to improve the speed/UX of our applications.
It is previous to the deleted state.

The last state is the deleted state. After the data is inactive for a while
(you can configure the time) it deletes from the cache.

---

react-query out of the box, for the better UX, as the list
is displayed already, and when the list updates in the
background, the user don't have to see the loading indicator,
every single time. It has a background-refetching.
isFetching - checks, if it is refetching data in the background.

cacheTime - 5minutes(300000) default, after first fetch.

staleTime - 0s default. Is the duration of the transition from a fresh to a stale state.

refetchOnMount - true default. The query will fetch the data on mount, if the data is stale.
If false, the data will not be re-fetched(If we comeback to our data again).

refetchOnWindowFocus - true default. It ensures UI is up-to-date with our remote data,
when the user comes back to the application.
With fetch, there is now way for a component to known, that our remote data has changed.
(To see any changes, we have to refresh the page)
With react-query the UI automatically updates. Our UI is in async with the remote data.

---

refetchInterval - false(default). 2000, milliseconds.
Polling - automatically refetch data, at regular Intervals.
Ex. A Component, that shows real-time price of different stocks. We might need to fetch
data every 1s, to update the UI. This ensures UI is always in-sync with remote-data.
Irrespective of configurations, like: refetchOnMount, refetchOnWindowFocus, which are
dependent on user interactions.

Polling(automatic refetching) is paused, if the window loses focus.
And if still we want to resume polling, we need:
refetchIntervalInBackground: true.

---

Fetch data on a button click, we have 2 steps to make:

1. Inform useQuery, not to fetch data, when component mounts.
   enabled: false.
2. refetch.
