import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import axios from 'axios';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACTS,
	CLEAR_CONTACTS,
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	// GET_CONTACT
	const getContact = async () => {
		try {
			const res = await axios.get('http://localhost:5000/api/contact');
			dispatch({
				type: GET_CONTACTS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.msg,
			});
		}
	};
	// ADD_CONTACT,
	const addContact = async contact => {
		const config = {
			headers: {
				ContentType: 'application/json',
			},
		};

		try {
			const res = await axios.post(
				'http://localhost:5000/api/contact',
				contact,
				config
			);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// DELETE_CONTACT,
	const deleteContact = async id => {
		try {
			await axios.delete(`http://localhost:5000/api/contact/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// CLEAR_CURRENT,
	const clearContact = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};

	// SET_CURRENT,
	const setCurrent = contact => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// CLEAR_CURRENT,
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// UPDATE_CONTACT,
	const updateContact = async contact => {
		const config = {
			headers: {
				ContentType: 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`http://localhost:5000/api/contact/${contact._id}`,
				contact,
				config
			);

			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// FILTER_CONTACTS,
	const filterContacts = text => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	// CLEAR_FILTER,
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	// Return Provider

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContact,
				clearContact,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
