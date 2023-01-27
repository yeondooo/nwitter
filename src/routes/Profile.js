import { dbService } from 'fbase';
import { getAuth, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, getDocs, query, where } from '@firebase/firestore';

const Profile = ({ userObj, refreshUser }) => {
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const auth = getAuth();
	const history = useHistory();

	const onLogOutClick = () => {
		auth.signOut();
		history.push('/');
	};

	const onChange = (e) => {
		const { value } = e.target;
		setNewDisplayName(value);
	};

	const getMyNweets = async () => {
		const q = query(collection(dbService, 'nweets'), where('creatorId', '==', userObj.uid));
		// const querySnapshot = await getDocs(q);
		// querySnapshot.forEach((doc) => {
		// 	console.log(doc.id, ' => ', doc.data());
		// });
	};

	useEffect(() => {
		getMyNweets();
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			await updateProfile(auth.currentUser, { displayName: newDisplayName });
			refreshUser();
		}
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
				<input type="submit" value="Update Profile" />
			</form>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};

export default Profile;
