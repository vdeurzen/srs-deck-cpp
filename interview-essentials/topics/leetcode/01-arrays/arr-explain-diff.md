---
id: arr-explain-diff
kind: explain
version: 2
level: 4
tags: [arrays, recognition, lc-1109, lc-370]
requires:
  - arr-diff-signal
  - arr-diff-code
  - rec-range-sum-or-difference
refs:
  - https://leetcode.com/problems/corporate-flight-bookings/
  - https://leetcode.com/problems/range-addition/
  - https://cp-algorithms.com/data_structures/fenwick.html#2-range-update-and-point-query
elaborate: Where outside interview problems do many writes each cover a range before one final read, such as a calendar's bookings or a histogram of request durations?
---
An interviewer asks how you would spot, from the statement, a problem
where updating every element of every range is too slow, and what you
would do instead. Answer aloud.
---
- [ ] Many updates each add a value to a whole range, and the array is read only at the end
- [ ] Instead add the value at the range's start and subtract it just past its end, then take one running sum
- [ ] +5 on indices 1–3 marks +5 at index 1, −5 at index 4; the running sum is 5 only there
- [ ] That is O(1) per update plus one O(n) pass, instead of the range's length per update
- [ ] If the array is fixed and ranges are only read, prefix sums of the input answer the queries instead
