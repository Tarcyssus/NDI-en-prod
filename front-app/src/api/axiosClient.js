import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://ndi-en-prod-backend.labs.iut-larochelle.fr/',
    headers: {
        'Content-Type': 'application/ld+json',
        Accept: 'application/ld+json',
    },
    withCredentials: false,
});

// Intercepteur pour les erreurs
axiosClient.interceptors.response.use(
    response => response,
    error => {
        console.error('Erreur API:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;

