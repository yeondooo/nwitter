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
			<form onSubmit={onSubmit} className="container">
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={onChange}
					className="authInput"
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={onChange}
					className="authInput"
				/>
				<input type="submit" value={newAccount ? '계정 생성' : '로그인'} className="authInput authSubmit" />
				{error && <span className="authError">{error}</span>}
			</form>
			<span onClick={toggleAccount} className="authSwitch">
				{newAccount ? '로그인' : '계정 생성'}
			</span>
		</>
	);
};
export default AuthForm;
