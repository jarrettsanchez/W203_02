import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

// Add more API calls as needed