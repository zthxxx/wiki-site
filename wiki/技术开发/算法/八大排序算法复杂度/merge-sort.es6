/**
 * 升序递归并归排序
 * @param {number[]} array
 * @return {number[]} sorted
 */
function mergeSort (array) {
  if (array.length === 1) return array;
  let middle = ~~(array.length / 2);
  let right = array.splice(middle);
  let left = array;
  /**
   * 以上写法等价于
   * let left = array.slice(0, middle);
   * let right = array.slice(middle);
   */
  return merge(mergeSort(left), mergeSort(right));
}

/**
 * 合并左右有序数组
 * @param {number[]} left 
 * @param {number[]} right
 * @return {number[]} sorted
 */
function merge (left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  return [...result, ...left, ...right];
}

let arr = [8, 1, 3, 9, 2, 4, 1, 9, 8, 7, 10, 5, 6];

console.log(arr);
console.log(mergeSort(arr));

console.log('ok');

