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
    #include <type_traits>
    static_assert(std::is_invocable_r_v<int, decltype(first),
                                        const std::array<int, 3>&>);
    static_assert(std::is_invocable_r_v<int, decltype(first),
                                        std::vector<int>>);
    int main() {}
elaborate: Why does `span<int>` refuse a temporary `vector` that `span<const int>` accepts, and what bug does that refusal prevent?
requires:
  - vocab-span-intro
  - iter-array-fixed-size
  - vc-plain-ref-rejects-temporary
refs:
  - https://en.cppreference.com/w/cpp/container/span
---

Let `first` read any contiguous run of `int`s without copying it: here a
`const std::array` and a temporary `std::vector`.

```cpp
#include <array>
#include <span>
#include <vector>
int first(std::{{c1::span<const int>}} xs) {
    return xs[0];
}
```

---

`std::span<const int>` binds to any contiguous range of `int` and owns
nothing, so the caller keeps the data alive. The `const` matters, as for
a `const&` parameter: `span<int>` refuses the `const` array and the
temporary `vector`, since it could write through them. `vector<int>`
would copy and rejects the `array`; `array<int, 3>` rejects the `vector`.
