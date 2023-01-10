import { useEffect, useState } from 'react';
import AppRouter from 'compoonents/Router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [init, setInit] = useState(false);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
		</>
	);
}

export default App;
