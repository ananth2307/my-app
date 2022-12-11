import React, { useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import "./daterange-styles.scss";

const CustomDateRangePicker = (props) => {
  const handleEvent = (event, picker) => {
    props.selectedDate({startDate: picker.startDate._d.toISOString(), endDate: picker.endDate._d.toISOString()})
  };
  return (
    <DateRangePicker
      {...props}
      alwaysShowCalendars={false}
      onEvent={handleEvent}
    >
      <input type="text" className="form-control" />
    </DateRangePicker>
  );
};

export default CustomDateRangePicker;
