import { useEffect, useState } from 'react';
import AppRouter from 'compoonents/Router';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);
	const auth = getAuth();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserObj({
					displayName: user.displayName,
					uid: user.uid,
					updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
				});
			} else {
				setUserObj(null);
			}
			setInit(true);
		});
	}, []);

	const refreshUser = () => {
		const user = auth.currentUser;
		setUserObj({
			displayName: user.displayName,
			uid: user.uid,
			updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
		});
	};

	return (
		<>
			{init ? (
				<AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
			) : (
				'Initializing...'
			)}
			{/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
		</>
	);
}

export default App;
