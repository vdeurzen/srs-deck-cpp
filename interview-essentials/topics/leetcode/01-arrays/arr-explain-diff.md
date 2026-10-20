---
id: arr-explain-diff
kind: explain
version: 1
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
- [ ] Cue: many updates each add a value to a whole range, and the array is read only at the end
- [ ] Pattern: add the value at the range's start, subtract it just past its end, then one running sum
- [ ] Example: seats booked on each flight, from bookings that each cover a range of flights
- [ ] Complexity: O(1) per update plus one O(n) pass, instead of the range's length per update
- [ ] Look-alike: a fixed array with many range-sum queries reads ranges, so prefix sums of the input answer it
