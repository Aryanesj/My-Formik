import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl.js'

function EnrollmentForm() {

	const dropdownOptions = [
		{ key:'Select your course', value: '' },
		{ key:'React', value: 'react' },
		{ key:'Angular', value: 'angular' },
		{ key:'Vue', value: 'vue' }
]

	const checkboxOptions = [
		{ key:'HTML', value: 'html' },
		{ key:'CSS', value: 'css' },
		{ key:'JavaScript', value: 'javascript' }
]

	const initialValues = {
		email: '',
		bio: '',
		course: '',
		radioOption: '',
		skills: [],
		courseDate: null
	}

	const validationSchema = Yup.object({
		email: Yup.string().email('Invalid email form').required('Required'),
		bio: Yup.string().required('Required'),
		course: Yup.string().required('Required'),
		courseDate: Yup.string().required('Required').nullable()
	})

	const onSubmit = (values) => {
		console.log('Form data', values)
	}

	return (
		<Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema} >
			{
				formik => {
					return <Form>

					<FormikControl 
						control='input' 
						type='email' 
						label='E-mail' 
						name='email' 
					/>

					<FormikControl 
						control='textarea'
						label='Bio' 
						name='bio' 
					/>

					<FormikControl 
						control='select'
						label='Course' 
						name='course' 
						options={dropdownOptions}
					/>

					<FormikControl 
						control='checkbox'
						label='Your skillset' 
						name='skills' 
						options={checkboxOptions}
					/>

					<FormikControl 
						control='date'
						label='Course date' 
						name='courseDate'
					/>

						<button type='submit' disabled={!formik.isValid}>Submit</button>
					</Form>
				}
			}
		</Formik>
	)
}

export default EnrollmentForm