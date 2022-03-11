import {auth, provider} from '../../services/firebase';

export const SIGN_START = 'SIGN_START';
export const USER_INFO = 'USER_INFO';
export const SIGN_FAIL = 'SIGN_FAIL';

export const sing_start = () => ({
	type: SIGN_START,
});

export const saveInfoUser = (user) => ({
	type: USER_INFO,
	user,
});

export const signFail = (error) => ({
	type: SIGN_FAIL,
	error: error,
});

export const signInitiate = () => {
	return (dispatch) => {
		dispatch(sing_start());
		auth.signInWithPopup(provider).then(({user}) => {
			console.log(user);
			dispatch(saveInfoUser(user));
		}).catch((error) => dispatch(signFail(error)));
	};
};