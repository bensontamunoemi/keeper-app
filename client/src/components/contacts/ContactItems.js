import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItems = ({ contact }) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = contactContext;
	const { _id, name, email, phone, type } = contact;

	const onDelete = e => {
		e.preventDefault();
		deleteContact(_id);
		clearCurrent();
	};
	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left '>
				{name}
				{''}
				<span
					style={costomBadge}
					className={
						type === 'professional' ? 'badge-success' : 'badge-primary'
					}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className='list'>
				{email && (
					<li>
						<i
							style={{ marginRight: '5px' }}
							className='fas fa-envelope-open-text'
						/>
						{email}
					</li>
				)}
				{phone && (
					<li>
						<i style={{ marginRight: '5px' }} className='fas fa-phone-square' />
						{phone}
					</li>
				)}
			</ul>
			<p>
				<button
					className='btn btn-dark btn-sm'
					onClick={() => setCurrent(contact)}
				>
					Edit
				</button>
				<button className='btn btn-danger btn-sm' onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

const costomBadge = {
	fontSize: ' 0.8rem',
	padding: '0.2rem 0.7rem',
	textAlign: 'center',
	margin: '0.3rem',
	color: '#fff',
	borderRadius: '5px',
	float: 'right',
};

ContactItems.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default ContactItems;
