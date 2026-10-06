---
id: compiler-switch-lowering
kind: code
version: 1
level: 3
tags: [compilers, codegen, bit-tricks, branches]
input: chips
choices:
  c1:
    - "static_cast<unsigned>(c - kLo) < 64u"
    - "c - kLo < 64"
    - "c >= kLo"
    - "static_cast<unsigned>(c - kLo) <= 64u"
compile:
  harness: |
    static_assert(in_set(10) && in_set(12) && in_set(17) && in_set(40));
    static_assert(in_set(73));                    // bit 63
    static_assert(!in_set(11) && !in_set(72));
    static_assert(!in_set(9) && !in_set(-100));   // below kLo
    static_assert(!in_set(74) && !in_set(1000));  // past the word
    int main() {}
requires:
  - foundations-bits-power-of-two
  - cpp-core/types-unsigned-wrap
refs:
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/SwitchLoweringUtils.cpp
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic
elaborate: Where in your own code does a chain of `c == 'a' || c == 'e' || …` tests hide a set that fits in one 64-bit mask?
---

`switch (c) { case 10: case 12: case 17: case 40: case 73: return true; }`
is lowered by the back end into one range check and one bit test.
Complete the range check.

```cpp
#include <cstdint>

inline constexpr int kLo = 10;
inline constexpr std::uint64_t kMask =
    1ull << 0 | 1ull << 2 | 1ull << 7 | 1ull << 30 | 1ull << 63;   // case - kLo

constexpr bool in_set(int c) {
  return {{c1::static_cast<unsigned>(c - kLo) < 64u}} && (kMask >> (c - kLo) & 1);
}
```

---

**One unsigned compare checks both ends.** Below `kLo`, `c - kLo` is
negative and the cast wraps it to a huge value, so `< 64u` rejects it
along with everything past the word. Each wrong guard lets a shift by a
negative amount or by 64 through, which is undefined behaviour, so the
constant evaluation fails, just as the real code would misbehave.

LLVM's switch lowering emits this shape for a cluster of cases whose
range fits in a machine word.
