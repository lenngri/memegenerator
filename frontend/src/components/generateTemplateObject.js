export const generateTemplateObject = (userID, source, image) => {
  const templateObject = {
    userID: userID,
    source: source,
    template: getDataUrl(image),
    description: 'default description',
    isPrivate: true,
  };

  return templateObject;
};

function getDataUrl(img) {
  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // Set width and height
  canvas.width = img.width;
  canvas.height = img.height;
  // Draw the image
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/jpeg');
}
