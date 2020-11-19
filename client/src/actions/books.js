import {
    FETCH_BOOKS,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILED,
    FETCH_BOOKS_TAGS,
    FETCH_BOOKS_TAGS_SUCCESS,
    FETCH_BOOKS_TAGS_FAILED,
    ADD_EDIT_BOOK,
    ADD_EDIT_BOOK_SUCCESS,
    ADD_EDIT_BOOK_FAILED,
    DELETE_BOOK,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAILED,
    HANDLE_SEARCH,
} from 'actionTypes/books';
import { API_URL } from 'config';
import axios from 'axios';


const startFetchingBooks = () => ({ type: FETCH_BOOKS });
const fetchBooksFailed = (error) => ({ type: FETCH_BOOKS_FAILED, payload: error });
const fetchBooksSuccess = (data) => ({ type: FETCH_BOOKS_SUCCESS, payload: data });

export const getBooks = () => async (dispatch) => {
    try {
        dispatch(startFetchingBooks());
        const result = await axios.get(`${API_URL}/books`);
        dispatch(fetchBooksSuccess(result.data));
    } catch (error) {
        console.log('error', error);
        dispatch(fetchBooksFailed(error));
    }
};


const startFetchingBooksTags = () => ({ type: FETCH_BOOKS_TAGS });
const fetchBooksTagsFailed = (error) => ({ type: FETCH_BOOKS_TAGS_FAILED, payload: error });
const fetchBooksTagsSuccess = (data) => ({ type: FETCH_BOOKS_TAGS_SUCCESS, payload: data });

export const getBooksTags = () => async (dispatch) => {
    try {
        dispatch(startFetchingBooksTags());
        const result = await axios.get(`${API_URL}/tags`);
        dispatch(fetchBooksTagsSuccess(result.data));
    } catch (error) {
        console.log('error', error);
        dispatch(fetchBooksTagsFailed(error));
    }
};


const startAddEditBook = () => ({ type: ADD_EDIT_BOOK });
const addEditBookFailed = (error) => ({ type: ADD_EDIT_BOOK_FAILED, payload: error });
const addEditBookSuccess = (data) => ({ type: ADD_EDIT_BOOK_SUCCESS, payload: data });

export const AddOrEditBook = (id, data, edit, history) => async (dispatch) => {
    try {
        let result;
        dispatch(startAddEditBook());

        if (edit) {
            result = await axios.put(`${API_URL}/books/${id}`, data);
        }
        else {
            result = await axios.post(`${API_URL}/books`, data);
        }
        await dispatch(addEditBookSuccess(result.data));
        history.push('/');
    } catch (error) {
        console.log('error', error);
        dispatch(addEditBookFailed(error));
    }
};


const startDeletingBook = () => ({ type: DELETE_BOOK });
const deleteBookFailed = (error) => ({ type: DELETE_BOOK_FAILED, payload: error });
const deleteBookSuccess = (data, id) => ({ type: DELETE_BOOK_SUCCESS, payload: data, id: id });

export const deleteBook = (id, history) => async (dispatch) => {
    try {
        dispatch(startDeletingBook());
        const result = await axios.delete(`${API_URL}/books/${id}`);
        await dispatch(deleteBookSuccess(result.data, id));
        history.push('/');
    } catch (error) {
        console.log('error', error);
        dispatch(deleteBookFailed(error));
    }
};

export const handleSearchInput = (value) => ({ type: HANDLE_SEARCH, payload: value });