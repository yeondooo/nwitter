import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const NweetFactory = ({ userObj }) => {
	const [nweet, setNweet] = useState('');
	const [attachment, setAttachment] = useState('');

	const onSubmit = async (e) => {
		if (nweet === '') {
			return;
		}
		e.preventDefault();
		let attachmentUrl = '';
		if (attachment !== '') {
			const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
			await uploadString(attachmentRef, attachment, 'data_url');
			attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
		}
		const nweetObj = {
			text: nweet,
			createdAt: serverTimestamp(),
			creatorId: userObj.uid,
			attachmentUrl,
		};
		await addDoc(collection(dbService, 'nweets'), nweetObj);
		setNweet('');
		setAttachment('');
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
		setAttachment('');
	};

	return (
		<form onSubmit={onSubmit} className="factoryForm">
			<div className="factoryInput__container">
				<input
					className="factoryInput__input"
					value={nweet}
					onChange={onChange}
					type="text"
					placeholder="120자 이내로 입력해주세요."
					maxLength={120}
				/>
				<input type="submit" value="&rarr;" className="factoryInput__arrow" />
			</div>
			<label htmlFor="attach-file" className="factoryInput__label">
				<span>사진 추가</span>
				<FontAwesomeIcon icon={faPlus} />
			</label>
			<input
				id="attach-file"
				type="file"
				accept="image/*"
				onChange={onFileChange}
				style={{
					opacity: 0,
				}}
			/>

			{attachment && (
				<div className="factoryForm__attachment">
					<img
						alt="preview"
						src={attachment}
						style={{
							backgroundImage: attachment,
						}}
					/>
					<div className="factoryForm__clear" onClick={onClearAttachment}>
						<span>Remove</span>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
			)}
		</form>
	);
};

export default NweetFactory;
