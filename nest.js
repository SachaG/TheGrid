module.exports = function(items, idKey, parentIdKey){
  if(!items) return null;

  var resultArray = [];
  var parentsById = {};

  for(var i = 0; i < items.length; i++){
    var item = items[i]
      , transformedItem = {item: item, children: []}
      , id = item[idKey]
      , parentId = item[parentIdKey];

    parentsById[id] = transformedItem;
    parent = parentsById[parentId];
    if(parent)
      parent.children.push(transformedItem);
    else
      resultArray.push(transformedItem);
  }
  return resultArray;
};
