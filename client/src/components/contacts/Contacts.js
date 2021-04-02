import React, { Fragment, useContext } from 'react';

import ContactContext from '../../context/contact/contactContext';
import ContactItems from './ContactItems';

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered } = contactContext;

	if (contacts.length === 0) {
		return <h4>Please add a contact</h4>;
	}
	return (
		<Fragment>
			{filtered !== null
				? filtered.map(contact => (
						<ContactItems key={contact.id} contact={contact} />
				  ))
				: contacts.map(contact => (
						<ContactItems key={contact.id} contact={contact} />
				  ))}
		</Fragment>
	);
};

export default Contacts;
