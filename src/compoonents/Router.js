import React from 'react';
import { Redirect } from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn, userObj }) => {
	return (
		<Router>
			{isLoggedIn && <Navigation />}
			<Switch>
				{isLoggedIn ? (
					<>
						<Route exact path="/">
							<Home userObj={userObj} />
						</Route>
						<Route exact path="/profile">
							<Profile userObj={userObj} />
						</Route>
						<Redirect form="*" to="/" />
					</>
				) : (
					<>
						<Route eaact path="/">
							<Auth />
						</Route>
						<Redirect form="*" to="/" />
					</>
				)}
			</Switch>
		</Router>
	);
};

export default AppRouter;
