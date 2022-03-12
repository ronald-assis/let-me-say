import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { database } from '../../services/firebase';
import { RoomCode } from '../../components/RoomCode';
import {Button} from '../../components/Button';

import logoImg from '../../assets/images/logo.svg';
import './Room.scss';

export function Room({match: {params: id}}) {
	const [newTalk, setNewTalk] = useState('');
	const [talks, setTalks] = useState([]);
	const [title,setTitle] = useState('');
	const roomId = id.id;
	const {currentUser} = useSelector((state) => state.user); 

	useEffect(() => {
		const roomRef = database.ref(`rooms/${roomId}`);

		roomRef.once('value', (room) => {
			const databaseRoom = room.val();
			const parsedTalks = Object.entries(databaseRoom.talks ?? {}).map(([key, value]) => ({
				id: key,
				content: value.content,
				author: value.author,
				isHighlighted: value.isHighlighted,
				isAnswered: value.isAnswered,
			}));

			setTitle(databaseRoom.title);
			setTalks(parsedTalks);
		});
	}, [roomId]);

	const handleSendTalk = async (event) => {
		event.preventDefault();
		if (newTalk.trim() === '') return;

		const talk = {
			content:  newTalk,
			author: {
				name: currentUser.name,
				avatar: currentUser.avatar,
			},
			isHighlighted: false,
			isAnswered: false,
		};

		await database.ref(`rooms/${roomId}/talks`).push(talk);
		setNewTalk('');
	};

	return (
		<div id='page-room'>
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<RoomCode code={roomId} />
				</div>
			</header>

			<main>
				<div className="room-title">
					<h1>Sala {title}</h1>
					{talks.length > 0 && <span>{talks.length} conversas(s)</span>}
				</div>

				<form onSubmit={handleSendTalk}>
					<textarea
						placeholder="Sobre o que quer conversa?"
						onChange={(event) => setNewTalk(event.target.value)}
						value={newTalk}
					/>

					<div className="form-footer">
						<div className="user-info">
							<img src={currentUser?.avatar} alt={currentUser?.name} />
							<span>{currentUser?.name}</span>
						</div>
						<Button type="submits">
							Enviar conversa
						</Button>
					</div>
				</form>
			</main>
		</div>
	);
}

Room.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		})
	})
};