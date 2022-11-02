export const getMetricTypeMappedCount = (type = {}, mapping) => {
    let count = 0;
    Object.keys(type).map(key => {
        if (mapping.includes(key)) {
            count += type[key];
        }
    })
    return count
}