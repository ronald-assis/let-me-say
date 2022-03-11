import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import {database} from '../../services/firebase';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import '../Home/Home.scss';

export function NewRoom(){
	const {currentUser} = useSelector((state) => state.user); 
	const history = useHistory();
	const [newRoom, SetNewRoom] = useState('test de sala');


	const handleCreateRoom = async (event) => {
		event.preventDefault();

		if (newRoom.trim() === '') {
			return;
		}

		const roomRef = database.ref('rooms');

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: currentUser?.id,
		});

		history.push(`/rooms/${firebaseRoom.key}`);

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
						<Button type='submit'>Criar sala</Button>
					</form>
					<p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
				</div>
			</main>
		</div>
	);
}