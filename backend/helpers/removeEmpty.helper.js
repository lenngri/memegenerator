exports.removeEmpty = (obj) => {
    console.log("removing empty or missing values using the removeEmpty.helper")
    Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
    return obj;
};