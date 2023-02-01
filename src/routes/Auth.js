import React from 'react';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import AuthForm from 'compoonents/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

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
		<div className="authContainer">
			<FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size="3x" style={{ marginBottom: 30 }} />
			<AuthForm />
			<div className="authBtns">
				<button onClick={onSocialClick} name="google" className="authBtn">
					Google 계정으로 로그인 <FontAwesomeIcon icon={faGoogle} />
				</button>
				<button onClick={onSocialClick} name="github" className="authBtn">
					Github 계정으로 로그인
					<FontAwesomeIcon icon={faGithub} />
				</button>
			</div>
		</div>
	);
};

export default Auth;
