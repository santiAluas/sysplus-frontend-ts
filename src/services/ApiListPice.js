import { END_POINTS } from './Endpoints';
import axios from 'axios';


export const UPLOAD_LIST_PRICE = async (listPrice, nameListPrice) => {
    try {
        const response = await axios.post(`${END_POINTS.UPLOAD_LIST_PRICE_EXCEL}`, {nameListPrice , listPrice});
        return response.data;
    } catch (error) {
        throw new Error('Error: ' + error.response.data);
    }
};


export const GET_ITEM_PRICE = async (searchPriceItem) => {
    try {
        const response = await axios.get(`${END_POINTS.SEARCH_ITEM_PRICE}/${searchPriceItem}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};
