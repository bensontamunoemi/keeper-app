import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);

	const { logout, isAuthenticated, user, loadUser, loading } = authContext;

	// useEffect(() => {
	// 	loadUser();
	// 	// eslint-disable-next-line
	// }, []);

	const onLogout = () => {
		logout();
	};

	console.log('LOADING', loading);
	console.log('LOADING', isAuthenticated);

	const authLinks = (
		<Fragment>
			<li>
				Hello <strong style={{ color: 'bisque' }}> {user && user.name}</strong>
			</li>
			<li>
				<a onClick={onLogout} href='#!'>
					<i className='fas fa-sign-out-alt' />
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</Fragment>
	);
	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/register'>
					<i className='fas fa-user-plus' />
					Register
				</Link>
			</li>{' '}
			<li>
				<Link to='/login'>
					<i className='fas fa-sign-in-alt' />
					Login
				</Link>
			</li>
		</Fragment>
	);
	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={icon} />
				{title}
			</h1>
			<ul>
				{/* <li>
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
				</li>{' '} */}
				{localStorage.getItem('token') ? authLinks : guestLinks}
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
