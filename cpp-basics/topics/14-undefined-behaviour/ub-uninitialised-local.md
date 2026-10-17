---
id: ub-uninitialised-local
kind: cloze
version: 1
level: 1
tags: [undefined-behaviour, initialization]
requires:
  - cpp-essentials/ub-passing-tests-prove-nothing
  - cpp-essentials/types-uninit-local-read
refs:
  - https://en.cppreference.com/w/cpp/language/default_initialization
  - https://timsong-cpp.github.io/cppwp/n4950/basic.indet
  - https://wg21.link/P2795
---

```cpp
int total_of(const std::vector<int>& xs) {
    int sum;
    for (int x : xs) sum += x;
    return sum;
}
```

A local `int` declared without an initializer holds an
{{c1::indeterminate::not 0}} value, and the first `sum += x` reads it:
{{c2::undefined behaviour::the standard's verdict}} in C++23. Variables
with static storage duration, such as globals, start at zero; locals do not.
(C++26 calls this read erroneous behaviour instead; it is still a bug.)
