import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';

export const fetchUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.users;
};

export const fetchPosts = async () => {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data.posts;
};
