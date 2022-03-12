import { useState, useEffect } from 'react';
import { database } from '../services/firebase';

export function useRoom(roomId) {
	const [talks, setTalks] = useState([]);
	const [title,setTitle] = useState('');
  
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
			}));

			setTitle(databaseRoom.title);
			setTalks(parsedTalks);
		});
	}, [roomId]);
  

	return { talks, title };
}