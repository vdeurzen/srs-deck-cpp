---
id: vocab-span-parameter
kind: code
version: 1
level: 2
tags: [vocabulary-types, span, ownership]
input: chips
choices:
  c1: ["span<const int>", "span<int>", "vector<int>", "array<int, 3>"]
compile:
  harness: |
    constexpr std::array<int, 3> fixed{1, 2, 3};
    static_assert(sum(fixed) == 6);
    static_assert(sum(std::vector{4, 5}) == 9);
    int main() {}
elaborate: Why does `span<int>` refuse a temporary `vector` that `span<const int>` accepts, and what bug does that refusal prevent?
requires:
  - containers-default-to-vector
refs:
  - https://en.cppreference.com/w/cpp/container/span
---

Let `sum` read any contiguous run of `int`s without copying it: here a
`const std::array` and a temporary `std::vector`.

```cpp
#include <array>
#include <span>
#include <vector>
constexpr int sum(std::{{c1::span<const int>}} xs) {
    int total = 0;
    for (int x : xs) total += x;
    return total;
}
```

---

`std::span<const int>` is a pointer and a length: it binds to any contiguous
range of `int` and owns nothing, so the caller keeps the data alive. The
`const` matters: `span<int>` refuses the `const` array and the temporary
`vector`, since it could write through them. `vector<int>` would copy and
rejects the `array`; `array<int, 3>` rejects the `vector`.
