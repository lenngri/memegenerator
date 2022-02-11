
exports.createSingleMemeService = async function(req, res) {


    const memeFromKonvaObject = (konvaObject, backgroundImage) => {
        // create stage (konva canvas object) from konvaObject
        const stage = Konva.Node.create(konvaObject);
      
        // create Konva Image instance from background image
        const background = new Konva.Image({
          image: backgroundImage,
          width: stage.width(),
          height: stage.height(),
        });
        // fetch layer to add background image to
        const layer = stage.getLayers()[0];
      
        // append the background image to the layer
        layer.add(background);
      
        // move the background image to the background
        background.moveToBottom();
        return stage.toDataURL();
      };
}
