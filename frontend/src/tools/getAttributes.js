const getAttributes = (konvaObject) => {
  const layer0Children = konvaObject.children[0].children;
  const attrsArray = [];
  for (let i = 0; i < layer0Children.length; i++) {
    if (layer0Children[i].className === 'Text') attrsArray.push(layer0Children[i].attrs);
  }
  return attrsArray;
};

export default getAttributes;
