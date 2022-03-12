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
			if (user) {
				const {displayName, photoURL, uid} = user;

				if (!displayName || !photoURL) {
					throw new Error('Missing information from Google Account.');
				}
				const info = {
					id: uid,
					name: displayName,
					avatar: photoURL
				};
				dispatch(saveInfoUser(info));
			}
		}).catch((error) => dispatch(signFail(error)));
	};
};


// On Auth State Changed
export const authStateChanged = () => {
	return (dispatch) => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				const {displayName, photoURL, uid} = user;

				if (!displayName || !photoURL) {
					throw new Error('Missing information from Google Account.');
				}
				const info = {
					id: uid,
					name: displayName,
					avatar: photoURL
				};
				dispatch(saveInfoUser(info));
			}
		});
	};
};