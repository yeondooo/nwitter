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
		<div className="container">
			<form onSubmit={onSubmit} className="profileForm">
				<input
					onChange={onChange}
					type="text"
					autoFocus
					placeholder="Display name"
					value={newDisplayName}
					className="formInput"
				/>
				<input
					type="submit"
					value="수정"
					className="formBtn"
					style={{
						marginTop: 10,
					}}
				/>
			</form>
			<span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
				로그아웃
			</span>
		</div>
	);
};

export default Profile;
