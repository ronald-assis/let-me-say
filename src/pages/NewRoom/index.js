import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {  useSelector } from 'react-redux';

import { Button } from '../../components/Button';
import {database} from '../../services/firebase';
import { useAuthStateChanged } from '../../hooks/useAuthStateChanged';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import '../Home/Home.scss';

export function NewRoom(){
	const [newRoom, SetNewRoom] = useState('');
	const [roomCode, setRoomCode] = useState('');
	const [authorId, setAuthorId] = useState('');

	const {currentUser} = useSelector((state) => state.user); 
	const {push} = useHistory();

	useAuthStateChanged();

	useEffect(() => {
		const roomAuthor = database.ref(`rooms/${roomCode}`);

		roomAuthor.on('value', (room) => {
			const databaseRoom = room.val();
			setAuthorId(databaseRoom.authorId);
		});

		return () => {
			roomAuthor.off('value');
		};
	},[roomCode]);

	const handleCreateRoom = async (event) => {
		event.preventDefault();

		if (newRoom.trim() === '') return;

		const roomRef = database.ref('rooms');

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: currentUser?.id,
		});

		push(`/admin/rooms/${firebaseRoom.key}`);

	};

	const handleJoinRoom = async (event) => {
		event.preventDefault();

		if (roomCode.trim() === '') return;

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			alert('Room does not exists');
			return; 
		}

		if (roomRef.val().endedAt) {
			alert('Room already closed.');
			return;
		}

		if (authorId === currentUser.id) {
			return push(`/admin/rooms/${roomCode}`);
		}
		push(`/rooms/${roomCode}`);
	};

	return (
		<div id='home'>
			<aside>
				<img src={illustrationImg} alt="Illustration" />
				<strong>Conte um pouco mais do seu dia</strong>
				<p>Conheça novas pessoas</p>
			</aside>
			<main>
				<div className='main-content'>
					<img src={logoImg} alt="Letmeask" />
					<h1>{currentUser?.name}</h1>
					<h2>Criar um nova sala</h2>
					<form onSubmit={handleCreateRoom}> 
						<input
							type="text"
							onChange={(event) => SetNewRoom(event.target.value)}
							value={newRoom}
							placeholder='nome da sala'
						/>
						<Button type='submit' isOutlined={false}>Criar sala</Button>
					</form>
					<div className='separator'>ou entre em uma sala</div>
					<form onSubmit={handleJoinRoom}> 
						<input 
							type="text"
							name=""
							value={roomCode}
							onChange={(event) => setRoomCode(event.target.value)}
							placeholder='Digite o código da sala' />
						<Button type='submit' isOutlined={false}>Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
}