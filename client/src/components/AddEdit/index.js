import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import AlertDialog from 'components/AlertDialog';
import { withRouter } from "react-router-dom";
import './styles.css';

class AddEdit extends Component {

    render() {
        const {
            edit,
            showDropDown,
            allTags,
            deleteBook,
            editFormSchema,
            history } = this.props;

        return (
            <div className="container-main">

                <div className="container-edit">
                    <Formik
                        initialValues={{
                            name: edit ? this.props.data.name : '',
                            author: edit ? this.props.data.author : '',
                            year: edit ? this.props.data.year : '',
                            tags: edit ? this.props.data.tags : [],
                        }}
                        validationSchema={editFormSchema}
                        onSubmit={(values) => {
                            this.props.handleAddEditBook(values)
                        }}>
                        {
                            props => (
                                <Form onSubmit={props.handleSubmit} className="login-form">
                                    <div className="login-header">
                                        {this.props.edit ? 'Edit book' : 'Add new Book'}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Field
                                            name="name"
                                            type="text"
                                            className={`form-control ${props.errors.name ? "is-invalid" : ""}`}
                                            value={props.values.name}
                                            id="name"
                                            onChange={props.handleChange} />
                                        <ErrorMessage
                                            component="div"
                                            name="name"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="author">Author</label>
                                        <Field
                                            name="author"
                                            type="text"
                                            className={`form-control ${props.errors.author ? "is-invalid" : ""}`}
                                            value={props.values.author}
                                            id="author"
                                            onChange={props.handleChange} />
                                        <ErrorMessage
                                            component="div"
                                            name="author"
                                            className="invalid-feedback"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="year">Year</label>
                                        <Field
                                            name="year"
                                            type="number"
                                            className={`form-control ${props.errors.year ? "is-invalid" : ""}`}
                                            value={props.values.year}
                                            id="year"
                                            onChange={props.handleChange} />
                                        <ErrorMessage
                                            component="div"
                                            name="year"
                                            className="invalid-feedback"
                                        />
                                    </div>


                                    <label htmlFor="year">Tags</label>
                                    <div className="dropdown">
                                        <div
                                            className={!showDropDown ?
                                                "form-control  filter" :
                                                "form-control filter-open"}
                                            onClick={() => this.props.setState()}>
                                            <div className="filter-text">
                                                {props.values.tags.length === 0 ? "Choose tags" :
                                                    props.values.tags.map((tag, index) => (
                                                        index > 0 ? (", " + tag) : tag
                                                    ))
                                                }
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={showDropDown ? faChevronUp : faChevronDown}
                                                    /></span>

                                            </div>
                                        </div>
                                        {showDropDown ?
                                            <div className="dropdown-content">
                                                <FieldArray
                                                    name="tags"
                                                    render={arrayHelpers => (
                                                        <div>
                                                            {Object.keys(allTags).map((key, index) => (
                                                                <div className="custom-control ml-2" key={key}>
                                                                    <label>
                                                                        <input
                                                                            name="tags"
                                                                            type="checkbox"
                                                                            value={key}
                                                                            checked={props.values.tags.includes(key)}
                                                                            onChange={e => {
                                                                                if (e.target.checked) {
                                                                                    arrayHelpers.push(key);
                                                                                } else {
                                                                                    const idx = props.values.tags.indexOf(key);
                                                                                    arrayHelpers.remove(idx);
                                                                                }
                                                                            }}
                                                                        />
                                                                        <span style={{ fontSize: 16 }}>{key}</span>
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                            : null}
                                    </div>
                                    {edit ?
                                        <div className="edit-buttons">
                                            <AlertDialog
                                                book_name={this.props.data.name}
                                                book_id={this.props.data.id}
                                                deleteBook={deleteBook}
                                            ></AlertDialog>
                                            <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
                                            <button type="submit" className="btn btn-success">Save</button>
                                        </div> :
                                        <div className="edit-buttons">
                                            <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
                                            <button type="submit" className="btn btn-success">Save</button>
                                        </div>
                                    }
                                </Form>)}
                    </Formik>

                </div>
            </div>
        )
    }
}

export default withRouter(AddEdit);
