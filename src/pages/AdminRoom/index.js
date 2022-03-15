import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import { database } from '../../services/firebase';
import { RoomCode } from '../../components/RoomCode';
import {Button} from '../../components/Button';
import { Talks } from '../../components/Talks';
import { useRoom } from '../../Hooks/useRoom';
import { useAuthStateChanged } from '../../Hooks/useAuthStateChanged';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';
import excluir from '../../assets/images/excluir.png';
import close from '../../assets/images/close.png';
import '../Room/Room.scss';

export function AdminRoom({match: {params: id}}) {
	const [newTalk, setNewTalk] = useState('');
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
	const roomId = id.id;
	const {push} = useHistory();
	const {talks, title} = useRoom(roomId);
	const {currentUser} = useSelector((state) => state.user); 

	useAuthStateChanged();

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
		await database.ref(`rooms/${roomId}/talks/${talkId}`).remove();
		setIsDeleteModalOpen(!isDeleteModalOpen);
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

	const toggleDeleteModal = () => {
		setIsDeleteModalOpen(!isDeleteModalOpen);
	};

	const toggleCloseModal = () => {
		setIsCloseModalOpen(!isCloseModalOpen);

	};

	const customSyles = {
		content: {
			top: '50%',
			left: '50%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
			transform: 'translate(-50%, -50%)',
			backgroundColor: '#F8F8F8',
			width: '590px',
			height: '362px',
			borderRadius: '8px',
			gap: '16px',
		},

		overlay: {
			backgroundColor: 'rgb(5 2 6 / 80%)',
		}
	};

	return (
		<div id='page-room'>
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={toggleCloseModal}>Encerrar sala</Button>
					</div>
				</div>

				<Modal
					isOpen={isCloseModalOpen}
					onRequestClose={toggleCloseModal}						
					style={customSyles}
				>
					<img src={close} alt="Close room" />
					<h1>Encerrar sala</h1>
					<p>Tem certeza que você deseja encerrar esta sala?</p>
					<div>
						<button onClick={toggleCloseModal}>Cancelar</button>
						<button onClick={handleendRoom}>Sim,encerrar</button>
					</div>
				</Modal>
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
						<Button type="submit" isOutlined={false}>
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
								onClick={toggleDeleteModal}
							>
								<img src={deleteImg} alt="Remove talk" />
							</button>

							<Modal
								isOpen={isDeleteModalOpen}
								onRequestClose={toggleDeleteModal}
								style={customSyles}
							>
								<img src={excluir} alt="excluir talk" />
								<h1>Excluir conversa</h1>
								<p>Tem certeza que você deseja excluir esta conversa?</p>
								<div>
									<button onClick={toggleDeleteModal}>Cancelar</button>	
									<button
										type='button'
										onClick={() => handleDeleteTalk(talk.id)}
									>
										Sim, excluir
									</button>

								</div>
							</Modal>

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