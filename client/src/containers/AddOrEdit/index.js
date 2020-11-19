import React, { Component } from 'react';
import * as Yup from 'yup';
import Header from 'components/Header';
import AddEdit from 'components/AddEdit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooksTags, AddOrEditBook, deleteBook } from 'actions/books';
import { logout } from 'actions/login';
import './styles.css';

class AddOrEdit extends Component {

    state = {
        showDropDown: false,
    }

    componentDidMount = async () => {
        this.props.getBooksTags();
    }

    editFormSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is missing"),
        author: Yup.string()
            .required("Author is missing"),
        year: Yup.number()
            .required("Year is missing"),
        tags: Yup.string()
            .nullable()
    });

    handleDropdown = () => {
        this.setState({
            showDropDown: !this.state.showDropDown
        })
    }

    deleteBook = (id) => {
        const { history } = this.props;
        this.props.deleteBook(id, history);
    }

    handleAddEditBook = (data) => {
        const { history } = this.props;
        const { edit } = this.props.location.state;
        this.props.AddOrEditBook(
            edit ? this.props.location.state.data.id : '',
            data,
            edit ? true : false,
            history);
    }

    handleLogout = () => {
        const { history } = this.props;
        this.props.logout(history);
    }

    render() {
        const { edit, data } = this.props.location.state;

        return (
            <div className="container-main">
                <Header />
                <AddEdit
                    data={data}
                    handleAddEditBook={this.handleAddEditBook}
                    editFormSchema={this.editFormSchema}
                    showDropDown={this.state.showDropDown}
                    setState={this.handleDropdown}
                    allTags={this.props.tags}
                    deleteBook={edit ? this.deleteBook : ''}
                    edit={edit ? true : false}
                />
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    getBooksTags,
    AddOrEditBook,
    deleteBook,
    logout,
}, dispatch);

const mapStateToProps = ({ booksReducer }) => ({
    loading: booksReducer.loading,
    tags: booksReducer.tags
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEdit);
