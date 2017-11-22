import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';




class PostsNew extends Component {
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-control ${touched && error ? 'is-invalid' : ''}`
		const classNameFeedback = `${touched && error ? 'invalid-feedback' : ''}`
		return (
			<div className="form-group">
				<label>{field.label}</label>
			  <input 
			  	className={className}
			  	type="text"
			  	{...field.input}
			  />
			  <div className={classNameFeedback}>
			  	{touched ? error : ""}
				</div>
			</div>
		)
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push("/")
		})
	}

	render(){
		const { handleSubmit } = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field
						label="Title"
						name="title"
						component={this.renderField}
					/>
					<Field 
						label="Categories"
						name="categories"
						component={this.renderField}
					/>
					<Field 
						label="Post Content"
						name="content"
						component={this.renderField}
					/>
					<button type="submit" className="btn btn-primary">Submit</button>
					<Link className="btn btn-danger" to="/">
						Cancel
					</Link>
				</form>
			</div>
		)
	}
}

function validate(values){
	const errors = {}

	if (!values.title) {
		errors.title = "Enter a title!"
	}

	if (!values.categories) {
		errors.categories = "Enter some categories!"
	} 

	if (!values.content) {
		errors.content = "Enter a content!"
	}
	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(null, { createPost })(PostsNew)
);
