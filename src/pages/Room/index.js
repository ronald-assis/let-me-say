import { useSelector } from 'react-redux';
export function Room() {
	const {currentUser} = useSelector((state) => state.user); 

	return (
		<>
			<h1>Sala</h1>
			<p>{currentUser?.name}</p>
		</>
	);
}