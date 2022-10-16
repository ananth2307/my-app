import React from "react";
import CustomSelect from "../../app/common-components/select";

const Filter = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div class="actnav dashactnav">
      <div class="actright">
        <div class="frmgroup dateinput">
          <input name="range" placeholder="Start Date / End Date" id="cal" />
        </div>
        <div class="frmgroup">
          <CustomSelect
            options={options}
            isMulti={true}
            hideSelectedOptions={false}
            isCheckboxSelect={true}
            placeholder="Select Application"
            isSearchable={true}
            closeMenuOnSelect={false}
          />
        </div>
      </div>
      <div class="dashfltr">
        <div class="filtrbtn">
          <a class="outline-btn">Filter</a>
        </div>
      </div>
    </div>
  );
};

export default Filter;
