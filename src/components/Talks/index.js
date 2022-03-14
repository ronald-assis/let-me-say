import PropTypes from 'prop-types';
import cn from 'classnames';

import avatarImg from '../../assets/images/avatar.svg';
import './Talks.scss';

export function Talks({
	content, author, isAnswered = false,
	isHighlighted = false, children,
}) {
	return (
		<div
			className={cn(
				'talks',
				{
					answered: isAnswered,
					highlighted: isHighlighted && !isAnswered,
				}
			)}
		>
			<p>{content}</p>
			<footer>
				<div className="user-info">
					<img
						src={!author.avatar ? avatarImg : author.avatar}
						alt={author.name}
					/>
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
	isAnswered: PropTypes.bool,
	isHighlighted: PropTypes.bool,
	children: PropTypes.node,
};