import React, { useState } from 'react';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
} from 'firebase/auth';

const Auth = () => {
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
				data = await signInWithEmailAndPassword(auth, email, password);
			}
			console.log('data', data);
		} catch (err) {
			setError(err.message);
		}
	};

	const toggleAccount = () => {
		setNewAccount((prev) => !prev);
	};

	const onSocialClick = async (e) => {
		const { name } = e.target;
		let provider;
		if (name === 'google') {
			provider = new GoogleAuthProvider();
		} else if (name === 'github') {
			provider = new GithubAuthProvider();
		}
		await signInWithPopup(auth, provider);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
				<input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
				<input type="submit" value={newAccount ? 'Create Account' : 'Sign In'} />
				{error}
			</form>
			<span onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</span>
			<div>
				<button name="google" onClick={onSocialClick}>
					Continue with Google
				</button>
				<button name="github" onClick={onSocialClick}>
					Continue with Github
				</button>
			</div>
		</div>
	);
};

export default Auth;
