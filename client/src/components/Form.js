import React, { useState } from 'react';
import * as yup from 'yup';
import { withFormik, Form, Field } from 'formik';

const RegistrationForm = ({ touched, errors }) => {
	console.log(errors);

	return (
		<div className='form'>
			<Form>
				<label>
					Name:
					<Field type='text' name='name' placeholder='Name' />
					{touched.name && errors.name && (
						<p className='errors'>{errors.name}</p>
					)}
				</label>
				<label>
					Email:
					<Field type='text' name='email' placeholder='Email' />
					{touched.email && errors.email && (
						<p className='errors'>{errors.email}</p>
					)}
				</label>
				<label>
					Password:
					<Field type='password' name='password' placeholder='Password' />
					{touched.password && errors.password && (
						<p className='errors'>{errors.password}</p>
					)}
				</label>
				<label>
					Verify Password:
					<Field
						type='password'
						name='verifyPassword'
						placeholder='Verify password'
					/>
					{touched.verifyPassword && errors.verifyPassword && (
						<p className='errors'>{errors.verifyPassword}</p>
					)}
				</label>
				<label>
					Terms of Service:
					<Field type='checkbox' name='termsOfService' />
					<span className='checkmark' />
					{touched.termsOfService && errors.termsOfService && (
						<p className='errors'>{errors.termsOfService}</p>
					)}
				</label>

				<button>Submit</button>
			</Form>
		</div>
	);
};

export default withFormik({
	mapPropsToValues: props => ({
		name: props.name || '',
		email: props.email || '',
		password: '',
		termsOfService: false
	}),
	validationSchema: yup.object().shape({
		name: yup.string().required('Name is required'),
		email: yup.string().required('Email is required'),
		password: yup.string().required('Password is required')
	})
})(RegistrationForm);
