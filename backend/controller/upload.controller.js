const singleFileUpload = async () => {
    try {
        const file = req.file;
        res.status(201).send('File uploaded successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    singleFileUpload
}