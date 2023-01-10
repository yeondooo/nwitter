import { getAuth } from 'firebase/auth';
import React from 'react';

const Profile = () => {
	const auth = getAuth();
	const onLogOutClick = () => {
		auth.signOut();
	};
	return (
		<>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};

export default Profile;
