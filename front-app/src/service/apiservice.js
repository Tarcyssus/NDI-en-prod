import axiosClient from '../api/axiosClient';

// Enums
export const modifierUser = (user) => {
    return axiosClient.patch(`/api/users/${user.id}`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.data);
};

export const getConseilsPhysiques = (user) => {
    return axiosClient.get(`/api/users/${user.id}/sante_physique`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.data);
}
