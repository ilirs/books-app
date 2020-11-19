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

const initialState = {
    loading: true,
    search: '',
    book_search: [],
    books: [],
    tags: {},
    error: {},
};

function booksReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_BOOKS:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BOOKS_SUCCESS: {
            return {
                ...state,
                books: action.payload,
                book_search: action.payload,
                loading: false,
            };
        }
        case FETCH_BOOKS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case HANDLE_SEARCH: {
            return {
                ...state,
                search: action.payload,
                book_search: state.books.filter(book => book.name.toLowerCase().includes(action.payload) ||
                    book.author.toLowerCase().includes(action.payload) ||
                    book.year.toString().includes(action.payload) ||
                    book.tags.some(tag => tag.toLowerCase().includes(action.payload))),

            };
        }
        case FETCH_BOOKS_TAGS:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BOOKS_TAGS_SUCCESS: {
            return {
                ...state,
                tags: action.payload,
                loading: false,
            };
        }
        case FETCH_BOOKS_TAGS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_EDIT_BOOK:
            return {
                ...state,
                loading: true,
            };
        case ADD_EDIT_BOOK_SUCCESS: {
            return {
                ...state,
                search: '',
                loading: false,
            };
        }
        case ADD_EDIT_BOOK_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DELETE_BOOK:
            return {
                ...state,
                search: '',
                loading: true,
            };
        case DELETE_BOOK_SUCCESS: {
            const books_new = state.books.filter(book => book.id !== action.id);
            return {
                ...state,
                book_search: books_new,
                books: books_new,
                loading: false,
            };
        }
        case DELETE_BOOK_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
export default booksReducer;