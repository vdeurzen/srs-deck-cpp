---
id: rec-intervals-greedy-vs-dp
kind: basic
version: 1
level: 3
tags: [greedy, dynamic-programming, intervals, recognition, lc-435, lc-1235]
requires:
  - technique-exchange-argument
refs:
  - https://leetcode.com/problems/non-overlapping-intervals/
  - https://leetcode.com/problems/maximum-profit-in-job-scheduling/
  - https://en.wikipedia.org/wiki/Activity_selection_problem
elaborate: Without the greedy, (b) still sorts by end time. For job i, which earlier result would you want to read, and how would you find it in O(log n)?
---

Two interval statements:

> (a) Given `intervals`, return the minimum number of intervals you need
> to remove to make the rest non-overlapping.
>
> (b) Job `i` runs from `startTime[i]` to `endTime[i]` and earns
> `profit[i]`. Return the maximum profit from a set of jobs with no two
> overlapping.

## Only one of them can use "keep the interval that ends earliest, repeatedly". Which property of the other breaks it?

---

**(b)'s intervals carry weights, so the exchange argument breaks.**

In (a) every interval counts 1, so swapping an optimal answer's first
interval for an earlier-ending one never loses. In (b) that swap can
trade a high-profit job for a cheap one: one long job may outearn
several short ones.
