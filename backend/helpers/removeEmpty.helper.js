// https://stackoverflow.com/questions/25421233/javascript-removing-undefined-fields-from-an-object

exports.removeEmpty = (obj) => {
    console.log("removing empty or missing values using the removeEmpty.helper")
    Object.keys(obj).forEach((k) => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
    return obj;
};