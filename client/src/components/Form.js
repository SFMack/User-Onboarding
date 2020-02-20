import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import { Container } from '@material-ui/core';

const RegistrationForm = ({ touched, errors, status }) => {
	const [users, setUsers] = useState([]);

	// update the users array with data from the axios response
	useEffect(() => {
		status && setUsers(status);
	}, [status]);

	return (
		<Container>
			<div className='form'>
				<Form>
					<label>
						Name
						<Field type='text' name='name' placeholder='Name' />
						{/* if the name field has been touched and there are errors then render them to the screen */}
						{touched.name && errors.name && (
							<p className='errors'>{errors.name}</p>
						)}
					</label>
					<label>
						Email
						<Field type='text' name='email' placeholder='Email' />
						{touched.email && errors.email && (
							<p className='errors'>{errors.email}</p>
						)}
					</label>
					<label>
						Password
						<Field type='password' name='password' placeholder='Password' />
						{touched.password && errors.password && (
							<p className='errors'>{errors.password}</p>
						)}
					</label>
					<label>
						Verify Password
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
						Role
						<Field as='select' name='role'>
							<option value='choose' disabled>
								Choose your Role
							</option>
							<option value='engineer'>Software Engineer</option>
							<option value='designer'>UX Designer</option>
							<option value='backend'>Backend Developer</option>
						</Field>
					</label>

					<label>
						Agree to Terms of Service
						<Field type='checkbox' name='termsOfService' />
						<span className='checkmark' />
						{touched.termsOfService && errors.termsOfService && (
							<p className='errors'>{errors.termsOfService}</p>
						)}
					</label>

					<button type='submit'>Submit</button>
				</Form>
				<div>
					{/* {users && (
					<ul key={users.id}>
						<li>Name: {users.name}</li>
						<li>Email: {users.email}</li>
					</ul>
				)} */}
					{console.log(users)}
				</div>
			</div>
		</Container>
	);
};

export default withFormik({
	mapPropsToValues: props => ({
		name: props.name || '',
		email: props.email || '',
		password: '',
		role: '',
		termsOfService: false
	}),
	validationSchema: yup.object().shape({
		name: yup.string().required('Name is required'),
		email: yup.string().required('Email is required'),
		password: yup.string().required('Password is required'),
		termsOfService: yup
			.string()
			.required('You must read and agree to the terms of service to continue')
	}),
	handleSubmit: (values, { resetForm, setStatus }) => {
		axios
			.post('https://reqres.in/api/users/', values)
			.then(res => {
				setStatus(res.data);
				resetForm();
			})
			.catch(err => console.log(err.response));
	}
})(RegistrationForm);
