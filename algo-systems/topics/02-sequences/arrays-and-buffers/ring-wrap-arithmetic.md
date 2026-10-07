---
id: seq-ring-wrap-arithmetic
kind: code
version: 1
level: 3
tags: [ring-buffer, low-latency, integer-arithmetic]
requires:
  - seq-ring-buffer-full-vs-empty
  - cpp-core/types-integral-promotion
input: chips
choices:
  c1:
    - "static_cast<std::uint16_t>(tail - head)"
    - "tail - head"
    - "(tail < head ? head - tail : tail - head)"
    - "(tail - head) % 65536"
compile:
  harness: |
    static_assert(size_of(0, 0) == 0);
    static_assert(size_of(3, 7) == 4);
    static_assert(size_of(65534, 2) == 4);   // tail has wrapped past 0
    static_assert(size_of(65535, 0) == 1);
    int main() {}
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Integral_promotion
---

A ring keeps free-running sequence numbers. They are 16 bits wide here
so the wrap is reachable in a test. Complete `size_of` so it stays
correct after `tail` wraps past zero while `head` has not.

```cpp
#include <cstdint>

constexpr int size_of(std::uint16_t head, std::uint16_t tail) {
  return {{c1::static_cast<std\::uint16_t>(tail - head)}};
}
```

---

Unsigned subtraction modulo 2¹⁶ gives the distance even across a wrap:
`2 − 65534 ≡ 4`. But both operands are **promoted to `int`** first, so
plain `tail - head` is `-65532`. The cast back to `uint16_t` restores the
modular result. With 64-bit counters there is no promotion, and the
subtraction alone is right.

Comparing with `<` fails because order means nothing once a counter has
wrapped. `%` on a negative `int` keeps the sign in C++, so it is still
`-65532`.
