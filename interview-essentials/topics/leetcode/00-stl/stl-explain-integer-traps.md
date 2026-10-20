---
id: stl-explain-integer-traps
kind: explain
version: 2
level: 3
tags: [stl, integers]
requires:
  - stl-int-size-cast
  - stl-accumulate-overflow
  - stl-int-min-traps
refs:
  - https://en.cppreference.com/w/cpp/types/size_t
  - https://en.cppreference.com/w/cpp/algorithm/accumulate
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
elaborate: Which of these three traps would you check first on a new problem's constraints, and why?
---
A teammate asks which integer mistakes most often break otherwise
correct solutions to coding problems. Answer aloud.
---
- [ ] Problem: limits like 10⁵ values of up to 10⁵ push a sum past an int's range
- [ ] Mechanism: a container's size is unsigned, so size minus one on an empty container wraps to 2⁶⁴ − 1
- [ ] Example: casting the size to int before subtracting gives −1, so an adjacent-pairs loop runs zero times
- [ ] Mechanism 2: accumulate sums in its initial value's type, so a 10¹⁰ total needs a long long zero
- [ ] Pitfall: negating the smallest int overflows, because 2³¹ does not fit in an int
