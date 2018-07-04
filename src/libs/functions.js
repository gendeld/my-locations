/* Replaces object from an array,
  receives a finder function that checks if array item equals to request object,
  the action object which contains the attribute we want to check against
  and a item to replace the removed one */
export const replaceItem = function(array, finder, action, replacer) {
  let newArray = array.slice();
  newArray.splice(newArray.findIndex(finder), 1, replacer);
  return newArray;
};

/* Removes object from an array,
  receives a finder function that checks if array item equals to request object,
  and the action object which contains the attribute we want to check against */
export const removeItem = function(array, finder, action) {
  let newArray = array.slice();
  newArray.splice(newArray.findIndex(finder), 1);
  return newArray;
};
