const getCaptions = (konvaObject) => {
  const layer1Children = konvaObject.children[1].children;
  const captionsArray = [];
  for (let i = 0; i < layer1Children.length; i++) {
    if (layer1Children[i].className === 'Text') {
      if (layer1Children[i].attrs.text === undefined) captionsArray.push('');
      else captionsArray.push(layer1Children[i].attrs.text);
    }
  }
  return captionsArray;
};

export default getCaptions;
