import React, { Component } from 'react';
import Header from 'components/Header';
import AlertDialog from 'components/AlertDialog';
import { logout } from 'actions/login';
import { getBooks, getBooksTags, deleteBook, handleSearchInput } from 'actions/books';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './styles.css';

class Main extends Component {

    componentDidMount = () => {
        this.props.getBooks();
    }

    handleSearchInput = (event) => {
        this.props.handleSearchInput(event.target.value);
    }

    addEditBook = (data, edit) => {
        this.props.history.push(
            {
                pathname: `/book${edit ? `/${data.id}` : ''}`,
                state: { data: data, edit: edit }
            }
        );
    }

    deleteBook = (id) => {
        const { history } = this.props;
        this.props.deleteBook(id, history);
    }


    render() {

        const { loading, search, book_search } = this.props;

        if (loading) {
            return <div>Loading...</div>
        }

        return (<div className="container-main">
            <Header />
            <div className="search-input-row">
                <input
                    name="search"
                    type="text"
                    placeholder="Search"
                    className="search-input"
                    value={search}
                    id="search"
                    onChange={this.handleSearchInput} />
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => this.addEditBook('', false)}>Add new Book</button>
            </div>
            <div className="table-responsive p-3">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Tags</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book_search.map((book, index) => (
                            <tr key={index}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>
                                    {book.tags.map((tag, index) => (
                                        index > 0 ? (", " + tag) : tag
                                    ))}
                                </td>
                                <td>
                                    <div className="d-flex">
                                        <button
                                            type="button"
                                            className="btn btn-secondary mr-2"
                                            onClick={() => this.addEditBook(book, true)}>Edit</button>
                                        <AlertDialog
                                            book_name={book.name}
                                            book_id={book.id}
                                            deleteBook={this.deleteBook}
                                        ></AlertDialog>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    logout,
    getBooks,
    getBooksTags,
    deleteBook,
    handleSearchInput,
}, dispatch);

const mapStateToProps = ({ booksReducer }) => ({
    loading: booksReducer.loading,
    books: booksReducer.books,
    book_search: booksReducer.book_search,
    search: booksReducer.search,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
