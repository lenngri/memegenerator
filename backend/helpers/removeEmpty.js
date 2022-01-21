exports.removeEmpty = (obj) => {
    console.log("removing empty or missing values")
    Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
    return obj;
};