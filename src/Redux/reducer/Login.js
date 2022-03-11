import { SIGN_START,USER_INFO, SIGN_FAIL } from '../actions';

const INITIAL_STATE = {
	loading: false,
	currentUser: null,
	error: null,
};

const user = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case SIGN_START: {
		return {
			...state,
			loading: true,
		};
	}

	case USER_INFO: {
		return {
			...state,
			currentUser: action.user,
		};
	}
	case SIGN_FAIL: {
		return {
			...state,
			error: action.error,
		};
	}
	default:
		return state;
	}
};

export default user;