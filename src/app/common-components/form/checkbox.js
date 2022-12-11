import React,{useState} from "react";

const FormCheck = (props) => {
  const {name, checked, onChange,bottomTitle,checkBoxClassName,containerClassName } = props;
  const [state, setState] = useState({
    checked: false
  })
  return (
    <div class={`${containerClassName}`}>
      <div class={ `form-check ${checkBoxClassName}`}>
        <input
          name={name}
          class="form-check-input"
          type="checkbox"
          id="checkbox3"
          checked={checked}
          onChange={(e) => {
            onChange(e.target.name);
            }}
        />
        <label class="form-check-label" for="Skip SSL">
         {bottomTitle}
        </label>
      </div>
    </div>
  );
};

export default FormCheck;
