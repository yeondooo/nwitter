import React, { useEffect, useState } from 'react';
import { dbService, storageService } from 'fbase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Nweet from 'compoonents/Nweet';
import { ref, uploadString } from '@firebase/storage';
import { v4 } from 'uuid';

const Home = ({ userObj }) => {
	const [nweet, setNweet] = useState('');
	const [nweets, setNweets] = useState([]);
	const [attachment, setAttachment] = useState();

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
		const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
		const response = await uploadString(fileRef, attachment, 'data_url');
		console.log(response);
		// await addDoc(collection(dbService, 'nweets'), {
		// 	text: nweet,
		// 	createdAt: serverTimestamp(),
		// 	creatorId: userObj.uid,
		// });
		// setNweet('');
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
			const {
				currentTarget: { result },
			} = finishedEvent;
			setAttachment(result);
		};
		reader.readAsDataURL(theFile);
	};

	const onClearAttachment = () => {
		setAttachment(null);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind" maxLength={120} />
				<input type="file" accept="image/*" onChange={onFileChange} />
				<input type="submit" value="Nweet" />
				{attachment && (
					<div>
						<img src={attachment} alt="preview" width="50px" height="50px" />
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				)}
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
