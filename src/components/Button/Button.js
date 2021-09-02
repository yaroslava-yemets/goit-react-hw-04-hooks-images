import PropTypes from 'prop-types';
import './Button.css';

function Button ({onClick}) {
    return (
        <button 
            onClick={onClick}
            className="Button" 
            type="button">
                Load more
        </button> 
    )
};

Button.propTypes = {
    onClick: PropTypes.func,
};

export default Button;