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
- [ ] Sums overflow: 10⁵ values of up to 10⁵ reach 10¹⁰, past an `int`'s 2.1 × 10⁹
- [ ] `accumulate` sums in its initial value's type, so a 10¹⁰ total needs a `long long` zero
- [ ] A container's size is unsigned, so size minus one on an empty container wraps to 2⁶⁴ − 1
- [ ] Casting the size to `int` before subtracting gives −1, so an adjacent-pairs loop runs zero times
- [ ] Negating the smallest `int` overflows, because 2³¹ does not fit in an `int`
