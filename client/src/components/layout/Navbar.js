import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={icon} />
				{title}
			</h1>
			<ul>
				<li>
					<Link to='/'>
						<i className='fas fa-house-damage' />
						Home
					</Link>
				</li>
				<li>
					<Link to='/about'>
						<i className='fas fa-question-circle' />
						About
					</Link>
				</li>
			</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-address-card',
};

export default Navbar;
