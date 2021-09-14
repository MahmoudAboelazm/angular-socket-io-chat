export const checkIfTwoArrEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;
  arr1.sort();
  arr2.sort();
  return arr1.every((element, index) => {
    return element === arr2[index];
  });
};
