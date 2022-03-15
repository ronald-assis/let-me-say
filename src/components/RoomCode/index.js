import PropTypes from 'prop-types';
import { useState } from 'react';
import copyImg from '../../assets/images/copy.svg';
import './RoomCode.scss';

export function RoomCode({code}) {
	const [copied, setCopied] = useState(false);


	const copyRoomCodeToClipboard = () => {
		navigator.clipboard.writeText(code);
		setCopied(!copied);
	};

	return (
		<button className="room-code" onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt="Copiar código da sala" />
			</div>
			<span>Sala #{code}</span>
			{copied && (
				<span className='copy'>Copiado!</span>
			)}
		</button>
	);
}

RoomCode.propTypes = {
	code: PropTypes.string.isRequired,
};