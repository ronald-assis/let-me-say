import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { database } from '../../services/firebase';
import { RoomCode } from '../../components/RoomCode';
import {Button} from '../../components/Button';
import { Talks } from '../../components/Talks';
import { useRoom } from '../../Hooks/useRoom';

import logoImg from '../../assets/images/logo.svg';
import '../Room/Room.scss';

export function AdminRoom({match: {params: id}}) {
	const [newTalk, setNewTalk] = useState('');
	const roomId = id.id;
	const {talks, title} = useRoom(roomId);
	const {currentUser} = useSelector((state) => state.user); 

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
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined>Encerrar sala</Button>
					</div>
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

				<div className="talks-list">
					{talks.map((talk) => (
						<Talks
							key={talk.id}
							content={talk.content}
							author={talk.author}
						/>
					))}
				</div>
			</main>
		</div>
	);
}

AdminRoom.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		})
	})
};