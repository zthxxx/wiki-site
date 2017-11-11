/**
 * @param {number[]} array
 * @param {number} start
 * @param {number} end
 * @return {number} pivot-index
 */
function partition (array, start, end) {
  let pivot = array[start];
  while (start < end) {
    while (start < end && array[end] >= pivot) end--;
    array[start] = array[end];
    while (start < end && array[start] <= pivot) start++;
    array[end] = array[start];
  }
  array[start] = pivot;
  return start;
}

/**
 * quick sorting
 * @param {number[]} array
 * @param {number} start
 * @param {number} end
 * @return {number[]}
 */
function quickSort (array, start, end) {
  let pivot = partition(array, start, end);
  if (start < end) {
    quickSort(array, start, pivot - 1);
    quickSort(array, pivot + 1, end);
  }
  return array;
}

let arr = [8, 1, 3, 9, 2, 4, 1, 9, 8, 7, 10];

console.log(quickSort(arr, 0, arr.length-1));

console.log('ok');

