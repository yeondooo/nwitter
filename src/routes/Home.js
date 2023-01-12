import React, { useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Home = () => {
	const [nweet, setNweet] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		await addDoc(collection(dbService, 'nweets'), {
			nweet,
			createdAt: serverTimestamp(),
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
		</div>
	);
};

export default Home;
