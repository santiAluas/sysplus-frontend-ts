import { END_POINTS } from './Endpoints'
import axios from 'axios';
export const Get_Organizations = async () => {
    try {
        const response = await axios.get(END_POINTS.GET_ORGANIZATIONS);
        if (response.status === 200) {
            return response.data
        } else {
            return ('ERROR: No se pudo obtener el usuario.');
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                throw new Error('Requesasdfsadf0');
            }
        } else {
            throw new Error('Error:', error.message);
        }
    }
}