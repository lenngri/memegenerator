export const generateTemplateObject = (userID, source, img) => {
  const templateObject = {
    userID: userID,
    source: source,
    template: getDataUrl(img),
    description: 'default description',
    isPrivate: true,
  };

  return templateObject;
};

function getDataUrl(img) {
  const maxWIDTH = 600;
  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // resize image
  if (img.naturalWidth > maxWIDTH) {
    canvas.width = maxWIDTH;
    canvas.height = (img.naturalHeight * maxWIDTH) / img.naturalWidth;
  } else {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
  }
  console.log('Width', canvas.width);
  console.log('height', canvas.height);
  // Draw the image to canvas and convert to Data URL
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg');
}
