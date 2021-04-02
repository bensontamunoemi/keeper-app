import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import { v4 as uuid } from 'uuid';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Osasona Tinuke',
				email: 'atinuke@gmail.com',
				phone: '111-222-333-444',
				type: 'personal',
			},
			{
				id: 2,
				name: 'Odiso Benson',
				email: 'odiso@gmail.com',
				phone: '222-111-444-333',
				type: 'personal',
			},
			{
				id: 3,
				name: 'Precious Emmanuel',
				email: 'presious@gmail.com',
				phone: '444-333-222-111',
				type: 'professional',
			},
		],
		current: null,
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	// ADD_CONTACT,
	const addContact = contact => {
		contact.id = uuid();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	// DELETE_CONTACT,
	const deleteContact = id => {
		dispatch({ type: DELETE_CONTACT, payload: id });
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

	// FILTER_CONTACTS,

	// CLEAR_FILTER,

	// Return Provider

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
