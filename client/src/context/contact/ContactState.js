import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import axios from 'axios';
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
		contacts: [],
		current: null,
		filtered: null,
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
	const updateContact = contact => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
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
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
