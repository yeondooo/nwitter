import { dbService, storageService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Nweet = ({ nweetObj, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);
	const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);
	const urlRef = ref(storageService, nweetObj.attachmentURL);

	const onDeleteClick = async () => {
		const ok = window.confirm('글을 삭제 할까요?');
		if (ok) {
			await deleteDoc(NweetTextRef);
			if (nweetObj.attachmentUrl !== '') {
				await deleteObject(urlRef);
			}
		}
	};

	const toggleEditing = () => setEditing((prev) => !prev);

	const onSubmit = async (e) => {
		e.preventDefault();
		await updateDoc(NweetTextRef, {
			text: newNweet,
		});

		setEditing(false);
	};

	const onChange = (e) => {
		const { value } = e.target;
		setNewNweet(value);
	};

	return (
		<div className="nweet">
			{editing ? (
				<>
					<form onSubmit={onSubmit} className="container nweetEdit">
						<input
							type="text"
							placeholder="Edit your nweet"
							value={newNweet}
							required
							autoFocus
							onChange={onChange}
							className="formInput"
						/>
						<input type="submit" value="완료" className="formBtn" />
					</form>
					<span onClick={toggleEditing} className="formBtn cancelBtn">
						취소
					</span>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
					{isOwner && (
						<div className="nweet__actions">
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} />
							</span>
							<span onClick={toggleEditing}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
