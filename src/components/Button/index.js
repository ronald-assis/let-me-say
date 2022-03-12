import PropTypes from 'prop-types';
import './Button.scss';

export function Button({isOutlined = false, ...props}) {
	return (
		<button
			className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
	);
}

Button.propTypes = {
	isOutlined: PropTypes.bool.isRequired,
};