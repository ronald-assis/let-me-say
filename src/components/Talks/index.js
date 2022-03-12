import PropTypes from 'prop-types';
import './Talks.scss';

export function Talks({content, author, children}) {
	return (
		<div className="talks">
			<p>{content}</p>
			<footer>
				<div className="user-info">
					<img src={author.avatar} alt={author.name} />
					<span>{author.name}</span>
				</div>
				<div>
					{children}
				</div>
			</footer>
		</div>
	);
}

Talks.propTypes = {
	content: PropTypes.string.isRequired,
	author: PropTypes.shape({
		name: PropTypes.string,
		avatar: PropTypes.string,
	}).isRequired,
	children: PropTypes.node,
};