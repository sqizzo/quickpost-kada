
// Function to fetch posts from the API
export const fetchPostsFromAPI = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  };
  