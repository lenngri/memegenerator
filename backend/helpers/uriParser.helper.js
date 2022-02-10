// casts data URI to buffer to save to server
// source: https://www.edureka.co/community/95996/how-do-i-parse-a-data-url-in-node

exports.parseURI = function(URI) {
    console.log("parsing dataURI to using uriParser.helper")
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const extension = URI.match(regex)[1];
    const data = URI.match(regex)[2];

    const buffer = Buffer.from(data, 'base64')

    return {image: buffer, extension: extension}
}