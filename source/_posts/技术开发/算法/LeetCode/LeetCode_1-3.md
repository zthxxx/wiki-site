---
title: LeetCode 1-3
toc: false
date: 2017-11-14 23:55:49
tags: [算法, 刷题]
---


## #1 Two Sum

题意：

求数组中和为给定值的两个数的下标

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (let [index, num] of nums.entries()) {
        let other = target - num;
        let otherIndex = nums.indexOf(other);
        if (otherIndex !== -1 && otherIndex !== index) {
            return [index, otherIndex];
        }
    }
};
```


## #2 Add Two Numbers

题意：

有两个数，用链表依次从个位开始串联表示；求这两个数的和，并也用链表表示

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let [pl1, pl2] = [l1, l2];
    let [carry, plus] = addNode(pl1, pl2);
    let plusHead = plus;
    while (true) {
        [pl1, pl2] = [pl1 && pl1.next, pl2 && pl2.next];
        if (!pl1 && !pl2 && !carry) {
            return plusHead;
        }
        [carry, plus.next] = addNode(pl1, pl2, carry);
        plus = plus.next;
    }
};

function addNode(pl1, pl2, carry=0) {
    let v1 = pl1 && pl1.val || 0;
    let v2 = pl2 && pl2.val || 0;
    let sum = v1 + v2 + carry;
    return [~~(sum / 10), new ListNode(sum % 10)];
}
```


## #3 Longest Substring Without Repeating Characters

题意：

求最长无重复子字符串的长度

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let length = 0;
    let delIndex = 0;
    let map = new Map();
    for (let [index, chr] of Object.entries(s)) {
        if (map.has(chr)) {
            let last = map.get(chr);
            for (; delIndex <= last; delIndex++) {
                map.delete(s[delIndex]);
            }
        }
        map.set(chr, index);
        let size = map.size;
        length = size > length ? size : length;
    }
    return length;
};
```

