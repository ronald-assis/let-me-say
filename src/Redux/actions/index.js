import {auth, provider} from '../../services/firebase';

export const SIGN_START = 'SIGN_START';
export const USER_INFO = 'USER_INFO';
export const SIGN_FAIL = 'SIGN_FAIL';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';



export const sign_start = () => ({
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

export const logoutStart = () => ({
	type: LOGOUT_START,
});

export const logoutSuccess = () => ({
	type: LOGOUT_SUCCESS,
});

export const logoutFail = (error) => ({
	type: LOGOUT_FAIL,
	error: error,
});

export const signInitiate = () => {
	return async (dispatch) => {
		try {
			dispatch(sign_start());
			const result = await auth.signInWithPopup(provider);
	
			if (result.user) {
				const {displayName, photoURL, uid} = result.user;
				
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
		} catch(error) {
			dispatch(signFail(error));
		}
	};
};

export const logoutInitiate = () => {
	return async (dispatch) => {
		try {
			dispatch(logoutStart());
			await auth.signOut();
			dispatch(logoutSuccess());

		} catch(error) {
			dispatch(logoutFail(error));
		}
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