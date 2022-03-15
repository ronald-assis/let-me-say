import {
	SIGN_START, USER_INFO, SIGN_FAIL,
	LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_FAIL,
} from '../actions';

const INITIAL_STATE = {
	loading: false,
	currentUser: null,
	error: null,
};

const user = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case SIGN_START:
	case LOGOUT_START: {
		return {
			...state,
			loading: true,
		};
	}

	case USER_INFO:
	case LOGOUT_SUCCESS: {
		return {
			...state,
			currentUser: action.user,
		};
	}
	case SIGN_FAIL:
	case LOGOUT_FAIL: {
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