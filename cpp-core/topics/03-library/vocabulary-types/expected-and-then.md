---
id: vocab-expected-and-then
kind: code
version: 1
level: 3
tags: [vocabulary-types, expected, error-handling]
input: chips
choices:
  c1: ["and_then", "transform", "or_else", "value_or"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_same_v<decltype(r), const std::expected<int, Err>>);
    static_assert(r == 4);
    int main() {}
requires:
  - vocab-expected-unexpected
elaborate: In a parser of your own, which steps would you chain with `and_then` and which with `transform`?
refs:
  - https://en.cppreference.com/w/cpp/utility/expected/and_then
  - https://en.cppreference.com/w/cpp/utility/expected/transform
---

`half` can fail. Chain it after `eight` so `r` is a flat
`std::expected<int, Err>` holding `4`, and an error in either step
short-circuits.

```cpp
#include <expected>
enum class Err { odd };
constexpr std::expected<int, Err> half(int n) {
    if (n % 2 != 0) return std::unexpected(Err::odd);
    return n / 2;
}
constexpr std::expected<int, Err> eight = 8;
constexpr auto r = eight.{{c1::and_then}}(half);
```

---

`and_then(f)` is for a step that returns an `expected` itself: on a value it
returns `f(value)` unchanged; on an error it skips `f` and passes the error
along. `transform` is for a step that cannot fail: it would wrap `half`'s
result again, giving `expected<expected<int, Err>, Err>`. `or_else` runs on
the error instead, and `value_or` ends the chain with a plain `int`.
