import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import Nweet from 'compoonents/Nweet';

const Home = ({ userObj }) => {
	const [nweet, setNweet] = useState('');
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		const q = query(collection(dbService, 'nweets'), orderBy('createdAt', 'desc'));
		onSnapshot(q, (snapshot) => {
			const nweetArr = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setNweets(nweetArr);
		});
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		await addDoc(collection(dbService, 'nweets'), {
			text: nweet,
			createdAt: serverTimestamp(),
			creatorId: userObj.uid,
		});
		setNweet('');
	};

	const onChange = (e) => {
		const { value } = e.target;
		setNweet(value);
	};

	const onFileChange = (e) => {
		const { files } = e.target;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
		};
		reader.readAsDataURL(theFile);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind" maxLength={120} />
				<input type="file" accept="image/*" onChange={onFileChange} />
				<input type="submit" value="Nweet" />
			</form>
			<div>
				{nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
				))}
			</div>
		</div>
	);
};

export default Home;
