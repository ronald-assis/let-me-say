import PropTypes from 'prop-types';
import copyImg from '../../assets/images/copy.svg';
import './RoomCode.scss';

export function RoomCode({code}) {
	const copyRoomCodeToClipboard = () => {
		navigator.clipboard.writeText(code);
	};

	return (
		<button className="room-code" onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt="Copy room code" />
			</div>
			<span>Sala #{code}</span>
		</button>
	);
}

RoomCode.propTypes = {
	code: PropTypes.string.isRequired,
};