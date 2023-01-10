import { useState } from 'react';
import AppRouter from 'compoonents/Router';
import { auth } from 'fbase';

function App() {
	console.log('auth', auth);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<AppRouter isLoggedIn={isLoggedIn} />
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
		</>
	);
}

export default App;
