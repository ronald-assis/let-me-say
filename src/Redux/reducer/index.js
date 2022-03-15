import { combineReducers } from 'redux';
import userReducer from './useReducer';

const rootReducers = combineReducers({	
	user: userReducer,
});

export default rootReducers;