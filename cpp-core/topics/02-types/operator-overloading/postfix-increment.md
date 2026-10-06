---
id: operators-postfix-increment
kind: code
version: 1
level: 2
tags: [operators]
input: chips
choices:
  c1: ["int", "void", "Counter&", "long"]
compile:
  harness: |
    constexpr bool check() {
        Counter c;
        Counter old = c++;
        Counter& same = ++c;
        return old.n == 0 && c.n == 2 && &same == &c;
    }
    static_assert(check());
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/operator_incdec
---

Declare the postfix `c++`, which hands back the value from **before** the
increment.

```cpp
struct Counter {
    int n = 0;
    constexpr Counter& operator++() { ++n; return *this; }
    constexpr Counter operator++({{c1::int}}) {
        Counter old = *this;
        ++*this;
        return old;
    }
};
```

---

The unused `int` parameter is only a tag: it is how the language tells
postfix `operator++(int)` from prefix `operator++()`. The canonical postfix
copies, calls prefix, and returns the copy **by value**, which is why
`++c` is never slower than `c++` and is the default in loops over iterators.
`void` re-declares the prefix form; any other parameter type is ill-formed.
