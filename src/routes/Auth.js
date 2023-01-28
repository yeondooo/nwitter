import React from 'react';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import AuthForm from 'compoonents/AuthForm';

const Auth = () => {
	const auth = getAuth();

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
			<AuthForm />
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
