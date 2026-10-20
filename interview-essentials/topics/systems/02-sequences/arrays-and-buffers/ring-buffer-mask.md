---
id: seq-ring-buffer-mask
kind: code
version: 1
level: 2
requires:
  - seq-ring-buffer-full-vs-empty
  - foundations-bitwise-operators
  - cpp-essentials/constexpr-fn-static-assert
elaborate: What would break, silently, if someone later changed the capacity to 10, and how would you make the compiler catch it?
tags: [ring-buffer, low-latency, bit-tricks]
input: chips
choices:
  c1:
    ["(kCapacity - 1)", "kCapacity", "(kCapacity + 1)", "~kCapacity"]
compile:
  harness: |
    static_assert(slot_of(0) == 0);
    static_assert(slot_of(7) == 7);
    static_assert(slot_of(8) == 0);
    static_assert(slot_of(9) == 1);
    static_assert(slot_of(1'000'000'003) == 3);
    int main() {}
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Bitwise_logic_operators
---

A ring buffer keeps a monotonically increasing sequence number and maps it
to a slot. Complete the wrap for a power-of-two capacity.

```cpp
constexpr unsigned kCapacity = 8;  // a power of two

constexpr unsigned slot_of(unsigned sequence) {
  return sequence & {{c1::(kCapacity - 1)}};
}
```

---

**`x & (n − 1)` is `x % n` when n is a power of two:** n − 1 is a run of
1 bits below n's single bit, so the AND keeps exactly the remainder's
bits. It costs one cycle, where an integer division costs tens of cycles
on most x86 cores. `kCapacity` and `kCapacity + 1` keep the wrong bits;
`~kCapacity` keeps nearly all of them.
