import React,{useState} from "react";

const FormCheck = (props) => {
  const { checked, onChange } = props;
  const [state, setState] = useState({
    checked: false
  })
  return (
    <div class="col-lg-6">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="checkbox3"
          checked={checked}
          onChange={onChange}
        />
        <label class="form-check-label" for="Skip SSL">
          Skip SSL
        </label>
      </div>
    </div>
  );
};

export default FormCheck;
