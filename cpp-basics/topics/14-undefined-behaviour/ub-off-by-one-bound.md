---
id: ub-off-by-one-bound
kind: code
version: 1
level: 1
tags: [undefined-behaviour, arrays, constexpr]
requires:
  - ub-static-assert-finds-ub
input: chips
choices:
  c1: ["i < 4", "i <= 4", "i < 5"]
compile:
  harness: |
    static_assert(total() == 9);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/array
  - https://en.cppreference.com/w/cpp/language/constant_expression
---

`total` adds up the marks. Complete the loop condition.

```cpp
constexpr int total() {
    int marks[4] = {3, 1, 4, 1};
    int sum = 0;
    for (int i = 0; {{c1::i < 4}}; ++i) sum += marks[i];
    return sum;
}
```

---

An array of 4 has valid indices 0 to 3, so the loop runs while `i < 4`.
Both wrong bounds also read `marks[4]`, one past the end: undefined
behaviour. At run time that read could silently add whatever lies next in
memory; inside the `static_assert` GCC must reject it instead:
`array subscript value '4' is outside the bounds`.
