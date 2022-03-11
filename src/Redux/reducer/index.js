import { combineReducers } from 'redux';
import userReducer from './Login';

const rootReducers = combineReducers({	
	user: userReducer,
});

export default rootReducers;