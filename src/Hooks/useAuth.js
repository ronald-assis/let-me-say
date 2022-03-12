import { useDispatch } from 'react-redux';
import { signInitiate } from '../Redux/actions';

export function useAuth() {
	const dispatch = useDispatch();
	const value = dispatch(signInitiate());

	return value;
}