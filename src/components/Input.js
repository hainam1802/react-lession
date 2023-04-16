import React from "react";
import PropTypes from "prop-types";
const Input = (props) => {
  const { inputRef, id, label, labelSize,lastRow,frmField ,errMessage, ...others} = props;

  const labelClass = `col-sm-${labelSize ? labelSize : 3} col-form-label required`; //! neu co label size thi dung` con ko thi dung mac dinh bang 3
  const inputClass = `form-control ${errMessage ? 'is-invalid' : ''} `; //! neu co label size thi dung` con ko thi dung mac dinh bang 3
  return (
    <>
      <div className={`row ${lastRow ? 'mb-3' : ''}`}>
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>

        <div className="col-sm">
          {others["rows"] > 1 ? (
            <textarea
              ref={inputRef}
              className="form-control"
              id={id}
              {...others}
            ></textarea>
          ) : (
            <input
              ref={inputRef}
              id={id}
              {...others}
              {...frmField}
              className={inputClass}
            />
          )}
          {errMessage ? <div className="invalid-feedback">{errMessage}</div> : ''}

        </div>

      </div>
    </>
  );
};
Input.prototype = {
  type: PropTypes.oneOf(["text","password","email"]),
  inputRef: PropTypes.object,
  id: PropTypes.oneOf([PropTypes.string,PropTypes.number]),
  label: PropTypes.string.isRequired,

}
export default Input;
