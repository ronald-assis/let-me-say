import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authStateChanged } from '../Redux/actions';

export function useAuthStateChanged() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = dispatch(authStateChanged());

		return () => {
			unsubscribe;
		};
	},[]);
}