import { dbService } from 'fbase';
import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, getDocs, query, where } from '@firebase/firestore';

const Profile = ({ userObj }) => {
	const auth = getAuth();
	const history = useHistory();

	const onLogOutClick = () => {
		auth.signOut();
		history.push('/');
	};

	const getMyNweets = async () => {
		const q = query(collection(dbService, 'nweets'), where('creatorId', '==', userObj.uid));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, ' => ', doc.data());
		});
	};

	useEffect(() => {
		getMyNweets();
	}, []);

	return (
		<>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};

export default Profile;
