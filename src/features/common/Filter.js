import React from "react";
import CustomSelect from "../../app/common-components/select";
import CustomDateRangePicker from "../../app/common-components/DateRangePicker/DateRangePicker";

const Filter = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="actnav dashactnav">
      <div className="actright">
        <div className="frmgroup dateinput">
          <CustomDateRangePicker />
        </div>
        <div className="frmgroup">
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
        <div className="frmgroup">
          <CustomSelect
            options={options}
            isMulti={true}
            hideSelectedOptions={false}
            isCheckboxSelect={true}
            placeholder="Select Project"
            isSearchable={true}
            closeMenuOnSelect={false}
          />
        </div>
        <div className="frmgroup">
          <CustomSelect
            options={options}
            isMulti={true}
            hideSelectedOptions={false}
            isCheckboxSelect={true}
            placeholder="Select Sprint"
            isSearchable={true}
            closeMenuOnSelect={false}
          />
        </div>
      </div>
      <div className="dashfltr">
        <div className="filtrbtn">
          <a className="outline-btn">Filter</a>
        </div>
      </div>
    </div>
  );
};

export default Filter;
