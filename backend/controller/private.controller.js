exports.getPrivateData = (req, res, next) => {
    console.log(req)
    res.status(200).json({
        success: true,
        data: "You got access to the private data in this route!",
    });
};