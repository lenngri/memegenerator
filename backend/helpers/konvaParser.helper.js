// source: https://konvajs.org/docs/data_and_serialization/Complex_Load.html (11.02.2022)

exports.memeFromKonvaObject = (konvaObject, filePath) => {
  // create stage (konva canvas object) from konvaObject
  const stage = Konva.Node.create(konvaObject);

  // fetch layer to add background image to
  const layer = stage.getLayers()[0];

  const background = Konva.Image.fromURL(filePath, function (image) {
    // image is Konva.Image instance
    // append the background image to the layer
    layer.add(image);
    // move the background image to the background
    image.moveToBottom();
  });

  return stage.toDataURL({ mimeType: 'image/jpeg', quality: 1.0 });
};
