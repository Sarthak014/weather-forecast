import PropTypes from "prop-types";
import { Fragment } from 'react';

const ButtonGroup = ({ classes, data, isDivider, selected, handleClick }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      {data.map(({ id, name, text }, index) => {
        const activeBtnStyle = selected===name ? 'text-cyan-300' : 'text-white';

        return (
          <Fragment key={id}>
            <button id={id} name={name} className={`${classes} ${activeBtnStyle}`} onClick={handleClick}>
              {text}
            </button>

            {isDivider && index !== data.length - 1 && (
              <p className="text-xl text-white mx-1">|</p>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

ButtonGroup.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  classes: PropTypes.string.isRequired,
  isDivider: PropTypes.bool,
  handleClick: PropTypes.func
};

export default ButtonGroup;
