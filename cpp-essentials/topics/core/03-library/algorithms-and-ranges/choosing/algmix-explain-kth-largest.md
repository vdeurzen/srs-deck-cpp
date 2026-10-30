---
id: algmix-explain-kth-largest
kind: explain
version: 2
level: 4
tags: [algorithms, choosing, interview]
requires:
  - algmix-kth-largest
  - sel-cost
  - sel-median-code
  - sel-top-three-ordered
elaborate: Say how your answer changes if the numbers arrive one at a time and you must answer after each.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
  - https://en.cppreference.com/w/cpp/algorithm/partial_sort
  - https://leetcode.com/problems/kth-largest-element-in-an-array/
---
An interviewer asks how you would find the k-th largest of n numbers with the standard library. Talk through your choice.
---
- [ ] Only one position of sorted order is wanted, and the order of the rest doesn't matter
- [ ] So call `nth_element` with the position n − k, then read the element there
- [ ] For k = 1, the largest, that position is n − 1, the last slot of ascending order
- [ ] It works only on the side holding that position: linear on average, against n·log n for sort
- [ ] Use `partial_sort` instead when the top k must also come out in order
