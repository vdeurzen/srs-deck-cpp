---
id: ub-uninitialised-counter
kind: code
version: 1
level: 1
tags: [undefined-behaviour, initialization, constexpr]
requires:
  - ub-uninitialised-local
  - cpp-essentials/ub-static-assert-finds-ub
input: chips
choices:
  c1: ["int count = 0;", "int count;", "static int count = 0;"]
compile:
  harness: |
    constexpr int xs[] = {4, 7, 10, 3};
    static_assert(count_even(xs, 4) == 2);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/default_initialization
  - https://en.cppreference.com/w/cpp/language/constant_expression
---

`count_even` returns how many of the `n` values are even: the same answer
on every call, and usable in a `static_assert`. Complete the first line
of the body.

```cpp
constexpr int count_even(const int* p, int n) {
    {{c1::int count = 0;}}
    for (int i = 0; i < n; ++i)
        if (p[i] % 2 == 0) ++count;
    return count;
}
```

---

`int count;` leaves a local indeterminate, so the first `++count` reads
garbage: undefined behaviour, which GCC rejects in the `static_assert`
(`the value of 'count' is not usable in a constant expression`).
`static int count = 0;` starts at zero only once and keeps counting across
calls, so a second call is wrong; a `constexpr` function may not even
evaluate it.
