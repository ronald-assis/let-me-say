import { USER_INFO } from '../actions';

const INITIAL_STATE = {
	name: '',
	email: '',
};

const user = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case USER_INFO: {
		return {
			...state,
			name: action.user.name,
			email: action.user.email,
		};
	}
	default:
		return state;
	}
};

export default user;