import { combineReducers } from 'redux';
import userReducer from './Login';

const rootReducers = combineReducers({	
	userReducer,
});

export default rootReducers;