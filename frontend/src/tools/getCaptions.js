const getCaptions = (konvaObject) => {
  const layer0Children = konvaObject.children[0].children;
  const captionsArray = [];
  for (let i = 0; i < layer0Children.length; i++) {
    if (layer0Children[i].className === 'Text') {
      if (layer0Children[i].attrs.text === undefined) captionsArray.push('');
      else captionsArray.push(layer0Children[i].attrs.text);
    }
  }
  return captionsArray;
};

export default getCaptions;
