---
id: seq-ring-buffer-mask
kind: code
version: 1
level: 2
requires:
  - seq-ring-buffer-full-vs-empty
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
  - https://en.cppreference.com/w/cpp/numeric/has_single_bit
---

A ring buffer keeps a monotonically increasing sequence number and maps it
to a slot. Complete the wrap for a power-of-two capacity.

```cpp
#include <bit>
#include <cstddef>
#include <cstdint>

inline constexpr std::size_t kCapacity = 8;
static_assert(std::has_single_bit(kCapacity), "capacity must be a power of two");

constexpr std::size_t slot_of(std::uint64_t sequence) {
  return static_cast<std::size_t>(sequence) & {{c1::(kCapacity - 1)}};
}
```

---

For a power of two, `x & (n − 1)` *is* `x % n` — the mask keeps exactly
the low bits that survive the division — and it costs one cycle where a
64-bit integer division costs tens of cycles on most x86 cores. The compiler can only make that
substitution for itself when the divisor is a compile-time power of two,
which is one good reason to make the capacity a template parameter or a
`constexpr` rather than a runtime field.

Keeping a free-running 64-bit sequence and masking at the point of use,
rather than storing an already-wrapped index, is the LMAX Disruptor's
trick: `head` and `tail` never wrap in 64 bits at any plausible rate, so
`tail − head` is the size and `tail == head` is empty, where wrapped
indices would need a "full" flag or a wasted slot.

The `static_assert` on `std::has_single_bit` is part of the design, not
decoration: with any other capacity the mask silently returns wrong
slots rather than failing, so the invariant is worth pinning at compile
time.
