import React, { useState } from "react";
import images from "../../../assets/images/index";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import "./daterange-styles.scss";

const CustomDateRangePicker = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const handleEvent = (event, picker) => {
    console.log("start: ", picker.startDate._d);
    console.log("end: ", picker.endDate._d);
    setFromDate(picker.startDate._d.toISOString());
    setToDate(picker.endDate._d.toISOString());
  };
  return (
    <DateRangePicker
      // startDate={new Date()}
      // endDate={new Date()}
      alwaysShowCalendars={false}
      onEvent={handleEvent}
    >
      <input type="text" className="form-control" />
    </DateRangePicker>
  );
};

export default CustomDateRangePicker;
