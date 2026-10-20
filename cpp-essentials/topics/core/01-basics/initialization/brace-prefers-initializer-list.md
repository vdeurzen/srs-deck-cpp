---
id: initialization-brace-prefers-initializer-list
kind: basic
version: 2
level: 2
tags: [initialization, containers]
requires:
  - vector-sized-constructor
  - fn-overload-ranking
  - class-constructor-intro
refs:
  - https://en.cppreference.com/w/cpp/language/list_initialization
  - https://timsong-cpp.github.io/cppwp/n4950/over.match.list#1
elaborate: Where in your own code does a brace-initialized container take two integers, and which constructor did you mean?
---

`std::initializer_list<int>` is the parameter type that receives a brace
list such as `{2, 3}` as a sequence of `int`s.

```cpp
struct Grid {
    Grid(int rows, int cols);
    Grid(std::initializer_list<int> cells);
};
Grid g{2, 3};
```

## `Grid(int, int)` is an exact match for `2, 3`. Which constructor does `g` use?

---

**`Grid(std::initializer_list<int>)`: braces try it before any other
constructor.** Ordinary overload ranking only runs when no
`initializer_list` constructor can take the values. Write `Grid g(2, 3);`
for rows and cols. Same rule: `std::vector<int> v{4, 9}` holds 4 and 9.
