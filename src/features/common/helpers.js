import { DATE_FORMAT } from "../../app/utilities/constants";
import moment from "moment";

const initialStartDate = moment().subtract(14, "days").format(DATE_FORMAT);
const initialEndDate = moment().format(DATE_FORMAT);

export const getDefaultSelectedDate = () => ({
  initialStartDate,
  initialEndDate,
});

export const getMetricTypeMappedCount = (type = {}, mapping) => {
  let count = 0;
  Object.keys(type).map((key) => {
    if (mapping.includes(key)) {
      count += type[key];
    }
  });
  return count;
};
export const statusOrder = (array, order, key) => {
  array.sort(function (a, b) {
    let A = a[key],
      B = b[key];
    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });
  return array;
};
export const getMetricMatchingStatus = (type, mapping) => {
  let status = {
    isMatching: false,
    matchedKey: "",
  };
  if (typeof type === "object") {
    Object.keys(type).map((key) => {
      if (mapping.includes(key)) {
        status = {
          isMatching: true,
          matchedKey: key,
        };
      }
    });
  } else {
    if (mapping.includes(type)) {
      status = {
        isMatching: true,
        matchedKey: type,
      };
    }
  }
  return status;
};
