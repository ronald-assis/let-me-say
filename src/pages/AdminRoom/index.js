import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { database } from '../../services/firebase';
import { RoomCode } from '../../components/RoomCode';
import {Button} from '../../components/Button';
import { Talks } from '../../components/Talks';
import { useRoom } from '../../Hooks/useRoom';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';
import '../Room/Room.scss';

export function AdminRoom({match: {params: id}}) {
	const [newTalk, setNewTalk] = useState('');
	const roomId = id.id;
	const {talks, title} = useRoom(roomId);
	const {push} = useHistory();
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

	const handleendRoom = async () => {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});

		push('/');
	};

	const handleDeleteTalk = async (talkId) => {
		if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
			await database.ref(`rooms/${roomId}/talks/${talkId}`).remove();
		}
	};

	const handleCheckTalkAsAnwered = async (talkId) => {
		await database.ref(`rooms/${roomId}/talks/${talkId}`).update({
			isAnswered: true,
		});

	};


	const handleHighlightTalk = async (talkId) => {
		await database.ref(`rooms/${roomId}/talks/${talkId}`).update({
			isHighlighted: true,
		});
	};


	return (
		<div id='page-room'>
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleendRoom}>Encerrar sala</Button>
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
						<Button type="submits" isOutlined={false}>
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
							isAnswered={talk.isAnswered}
							isHighlighted={talk.isHighlighted}
						>
							{!talk.isAnswered && (
								<>
									<button
										type='button'
										onClick={() => handleCheckTalkAsAnwered(talk.id)}
									>
										<img src={checkImg} alt="Check the talk an answered" />
									</button>

									<button
										type='button'
										onClick={() => handleHighlightTalk(talk.id)}
									>
										<img src={answerImg} alt="highlight the talk" />
									</button>
								</>
							)}

							<button
								type='button'
								onClick={() => handleDeleteTalk(talk.id)}
							>
								<img src={deleteImg} alt="Remove talk" />
							</button>
						</Talks>
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