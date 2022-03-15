import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { database } from '../../services/firebase';
import { RoomCode } from '../../components/RoomCode';
import {Button} from '../../components/Button';
import { Talks } from '../../components/Talks';
import { useRoom } from '../../hooks/useRoom';
import { useAuthStateChanged } from '../../hooks/useAuthStateChanged';
import {logoutInitiate} from '../../Redux/actions';

import logoImg from '../../assets/images/logo.svg';
import avatarImg from '../../assets/images/avatar.svg';
import './Room.scss';
import { useHistory } from 'react-router-dom';

export function Room({match: {params: id}}) {
	const [newTalk, setNewTalk] = useState('');
	const roomId = id.id;
	const {push} = useHistory();
	const {talks, title} = useRoom(roomId);
	const dispatch = useDispatch();
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

	const handleLikeTalk = async (talkId, likeId) => {
		if (likeId) {
			await database.ref(`/rooms/${roomId}/talks/${talkId}/likes/${likeId}`).remove();	
		} else {
			await database.ref(`/rooms/${roomId}/talks/${talkId}/likes`).push({
				authorId: currentUser?.id,
			});
		}
	};

	const handleAuth = () => {
		dispatch(logoutInitiate());
		push('/');
	};

	return (
		<div id='page-room'>
			<header>
				<div className="content">
					<img src={logoImg} alt="Letmeask" className='logo' />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined={false} onClick={handleAuth}>Logout</Button>
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
							<img
								src={!currentUser?.avatar ? avatarImg : currentUser.avatar}
								alt={currentUser?.name}
							/>
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
							<button
								className={`like-button ${talk.likeCount ? 'liked' : ''}`}
								type='button'
								aria-label='Marcar como gostei'
								onClick={() => handleLikeTalk(talk.id, talk.likeId)}
							>
								{ talk.likeCount > 0 && <span>{talk.likeCount}</span>}
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>

							</button>
						</Talks>
					))}
				</div>
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