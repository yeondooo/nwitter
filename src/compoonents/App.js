import { useEffect, useState } from 'react';
import AppRouter from 'compoonents/Router';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserObj({
					displayName: user.displayName,
					uid: user.uid,
				});
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);

	const refreshUser = () => {
		const user = getAuth.currentUser;
		setUserObj({
			displayName: user.displayName,
			uid: user.uid,
			updateProfile: (args) => user.updateProfile(args),
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
