import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const AuthForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState('');
	const auth = getAuth();

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			let data;
			if (newAccount) {
				data = await createUserWithEmailAndPassword(auth, email, password);
			} else {
				await signInWithEmailAndPassword(auth, email, password);
			}
		} catch (err) {
			setError(err.message);
		}
	};

	const toggleAccount = () => {
		setNewAccount((prev) => !prev);
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
				<input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
				<input type="submit" value={newAccount ? 'Create Account' : 'Sign In'} />
				{error}
			</form>
			<span onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</span>
		</>
	);
};
export default AuthForm;
