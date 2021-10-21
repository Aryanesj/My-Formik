import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError.js';

const initialValues = {
			name: '',
			email: '',
			channel: '',
			comments: '',
			address: '',
			social: {
				facebook: '',
				twitter: ''
			},
			phoneNumbers: ['', ''],
			phNumbers: ['']
		}

		const savedValues = {
			name: 'Arti',
			email: 'a@example.com',
			channel: 'aryday',
			comments: 'Witam, formik',
			address: '54-018 Lesnica Street',
			social: {
				facebook: '',
				twitter: ''
			},
			phoneNumbers: ['', ''],
			phNumbers: ['']
		}

const onSubmit = (values, onSubmitProps) => {
			console.log('Form data', values)
			console.log('submit props', onSubmitProps)
			onSubmitProps.setSubmitting(false)
			onSubmitProps.resetForm()
		}

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email format').required('Required'),
	channel: Yup.string().required('Required')
	})

const validateComments = value => {
	let error
	if (!value) {
		error = 'Required'
	}
	return error
}

function YoutubeForm() {
	const [formValues, setFormValues] = useState(null)
	return (
			<Formik  initialValues={formValues || initialValues} 
						validationSchema={validationSchema}
						onSubmit={onSubmit}
						enableReinitialize //use savedValues
						// validateOnMount
						>
					{formik => {
						console.log('Formik props', formik)
							return (
	<Form>
		<div className='form-control' >
			<label htmlFor="name">Name</label>
			<Field type="text" id='name' name='name' placeholder='Name' />
			<ErrorMessage name='name' component={TextError} />
		</div>

		<div className='form-control' >
			<label htmlFor="email">E-mail</label>
			<Field type="email" id='email' name='email' placeholder='Addres' />
			<ErrorMessage name='email'>
				{(errorMsg) => <div className='error'>{errorMsg}</div>}
			</ErrorMessage>
		</div>

		<div className='form-control' >
			<label htmlFor="channel">Channel</label>
			<Field type="text" id='channel' name='channel' placeholder='YouTube' />
			<ErrorMessage name='channel' />
		</div>

		<div className='form-control'>
			<label htmlFor="comments">Comments</label>
			<Field as='textarea'
					 id='comments'
					 name='comments'
					 validate={validateComments} />
			<ErrorMessage name='comments' component={TextError} />
		</div>


		<div className='form-control'>
			<label htmlFor="address">Address</label>
				<FastField name='address'>
					{(props) => {
							console.log('Field render')
							const {field, form, meta} = props
							return ( <div>
										<input type='text' id='address' {...field} />
										{meta.touched && meta.error ? <div>{meta.error}</div> : null}
									 </div> )
						}
					}
				</FastField>
		</div>


		<div className='form-control'>
			<label htmlFor="facebook">Facebook profile</label>
			<Field type='text' id='facebook' name='social.facebook' />
		</div>

		<div className='form-control'>
			<label htmlFor="twitter">Twitter profile</label>
			<Field type='text' id='twitter' name='social.twitter' />
		</div>

		<div className='form-control'>
			<label htmlFor="primaryPh">Primary phone number</label>
			<Field type='text' id='primaryPh' name='phoneNumbers[0]' />
		</div>

		<div className='form-control'>
			<label htmlFor="secondaryPh">Secondary phone number</label>
			<Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
		</div>


		<div className='form-control' >
			<label>List of phone numbers</label>
			<FieldArray name='phNumbers'>
				{fieldArrayProps => {
						const {push, remove, form} = fieldArrayProps
						const {values} = form
						const {phNumbers} = values
						return ( 
						<div>
							{phNumbers.map((phNumbers, index) => (
								<div key={index}>
									<Field name={`phNumbers[${index}]`} />
										{
											index > 0 && (
												<button type='button' onClick={() => remove(index)}>{' '}-{' '}</button>
										)}
									<button type='button' onClick={() => push('')}>{' '}+{' '}</button>
								</div>
							))}
						</div>
						)
					}
				}
			</FieldArray>
		</div>

	<button type='button' onClick={() => formik.validateField('comments')} >Validate comments</button>
	<button type='button' onClick={() => formik.validateForm()} >Validate all</button>
	<button type='button' onClick={() => formik.setFieldTouched('comments')} >Visit comments</button>
	<button type='button' onClick={() => formik.setTouched({
																				name: true,
																				email: true,
																				channel: true,
																				comments: true
																									})} >Visit fields</button>

	<button type='button' onClick={() => setFormValues(savedValues)} >Load saved data</button>

	<button type='reset'>Reset</button>

	<button type='submit' disabled={(!formik.isValid || formik.isSubmitting)}>Submit</button>

	</Form>
							)
						}
					}

	</Formik>
	)
}

export default YoutubeForm;