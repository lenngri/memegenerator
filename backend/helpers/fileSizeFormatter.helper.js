exports.fileSizeFormatter = function (bytes, decimal = 2) {
    if (bytes === 0) {
        return '0 bytes'
    } else {
        const dm = decimal;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', ];
        const index = Math.floor(Math.log(bytes) / Math.log(1000));
        return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
    }
}