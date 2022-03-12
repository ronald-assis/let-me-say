import { useState, useEffect } from 'react';
import { database } from '../services/firebase';
import { useSelector } from 'react-redux';

export function useRoom(roomId) {
	const [talks, setTalks] = useState([]);
	const [title,setTitle] = useState('');

	const { currentUser } =useSelector((state) => state.user);
  
	useEffect(() => {
		const roomRef = database.ref(`rooms/${roomId}`);

		roomRef.on('value', (room) => {
			const databaseRoom = room.val();
			const parsedTalks = Object.entries(databaseRoom.talks ?? {}).map(([key, value]) => ({
				id: key,
				content: value.content,
				author: value.author,
				isHighlighted: value.isHighlighted,
				isAnswered: value.isAnswered,
				likeCount: Object.values(value.likes ?? {}).length,
				likeId: Object.entries(value.likes ?? {}).find(([, like]) => like.authorId === currentUser?.id)?.[0],
			}));

			setTitle(databaseRoom.title);
			setTalks(parsedTalks);

			return () => {
				roomRef.off('value');
			};
		});
	}, [roomId, currentUser?.id]);
  

	return { talks, title };
}