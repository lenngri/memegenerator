const getAttributes = (konvaObject) => {
  const layer1Children = konvaObject.children[1].children;
  const attrsArray = [];
  for (let i = 0; i < layer1Children.length; i++) {
    if (layer1Children[i].className === 'Text') attrsArray.push(layer1Children[i].attrs);
  }
  return attrsArray;
};

export default getAttributes;
