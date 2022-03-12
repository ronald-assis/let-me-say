import { useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signInitiate } from '../../Redux/actions';
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import './Home.scss';

export function Home(){
	const [roomCode, setRoomCode] = useState();
	
	const {push} = useHistory();
	const dispatch = useDispatch();
	const {currentUser} = useSelector((state) => state.user); 
 
	const handleCreateRoom = async () => {
		if (!currentUser) {
			await dispatch(signInitiate());
		}

		console.log(currentUser);
		push('/create-room');
	};

	const handleJoinRoom = async (event) => {
		event.preventDefault();

		if (roomCode.trim() === '') return;

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			alert('Room does not exists');
			return; 
		}

		push(`/rooms/${roomCode}`);
	};

	return (
		<div id='home'>
			{console.log(currentUser)}
			<aside>
				<img src={illustrationImg} alt="Illustration" />
				<strong>Conte um pouco mais do seu dia</strong>
				<p>Conheça novas pessoas</p>
			</aside>
			<main>
				<div className='main-content'>
					<img src={logoImg} alt="Letmeask" />
					<button className='create-room' onClick={handleCreateRoom}>
						<img src={googleIconImg} alt="Google logo" />
            Cadastre-se com o Google
					</button>
					<div className='separator'>ou entre em uma sala</div>
					<form onSubmit={handleJoinRoom}> 
						<input 
							type="text"
							name=""
							value={roomCode}
							onChange={(event) => setRoomCode(event.target.value)}
							placeholder='Digite o código da sala' />
						<Button type='submit'>Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
}