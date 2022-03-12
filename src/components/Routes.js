import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import {NewRoom} from '../pages/NewRoom';
import {Home} from '../pages/Home';
import {Room} from '../pages/Room';
import {authStateChanged} from '../Redux/actions';
import { useDispatch } from 'react-redux';


export function Routes() {
	const dispatch = useDispatch();
	useEffect(()=>{
		const unsubscribe = dispatch(authStateChanged());

		return () => {
			unsubscribe();
		};
	},[]);

	return (
		<Switch>
			<Route exact path="/" component={ Home } />
			<Route exact path="/create-room" component={ NewRoom } />
			<Route exact path="/rooms/:id" component={ Room } />
		</Switch>
	);
}
