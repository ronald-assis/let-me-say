import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {NewRoom} from '../pages/NewRoom';
import {Home} from '../pages/Home';
import {Room} from '../pages/Room';


export function Routes() {
	return (
		<Switch>
			<Route exact path="/" component={ Home } />
			<Route exact path="/create-room" component={ NewRoom } />
			<Route exact path="/rooms/:id" component={ Room } />
		</Switch>
	);
}
