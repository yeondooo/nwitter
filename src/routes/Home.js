import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

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

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind" maxLength={120} />
				<input type="submit" value="Nweet" />
			</form>
			<div>
				{nweets.map((nweet) => (
					<div key={nweet.id}>
						<h4>{nweet.text}</h4>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
