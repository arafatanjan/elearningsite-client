import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './complainSlice';

export const getAllComplains = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    //https://elearningsite-server.onrender.com

    try {
        const result = await axios.get(`https://elearningsite-server.onrender.com/${address}List/${id}`);
        // const result = await axios.get(`https://elearningsite-server.onrender.com/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
        
    }
}