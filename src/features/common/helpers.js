export const getMetricTypeMappedCount = (type = {}, mapping) => {
    let count = 0;
    Object.keys(type).map(key => {
        if (mapping.includes(key)) {
            count += type[key];
        }
    })
    return count
}
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
  }