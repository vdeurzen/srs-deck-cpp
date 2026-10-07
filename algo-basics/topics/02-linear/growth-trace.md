---
id: linear-growth-trace
kind: trace
version: 1
level: 2
tags: [dynamic-arrays, amortised, tracing]
requires:
  - linear-dynamic-array-growth
probes:
  1: { cap: "8", copies: "7" }
  2: { cap: "16", copies: "15" }
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---

A model of a dynamic array that doubles when full. `copies` counts the
elements moved into a new block.

```cpp
int cap = 1, size = 0, copies = 0;

void push() {
  if (size == cap) {     // full: allocate 2*cap, move everything over
    copies += size;
    cap *= 2;
  }
  ++size;
}

int main() {
  for (int k = 0; k < 5; ++k) push();   // @1
  for (int k = 0; k < 4; ++k) push();   // @2
}
```

---

The fifth and ninth pushes find the block full. After 9 pushes the
copies were 1 + 2 + 4 + 8 = 15, **less than twice the 9 elements**:
each doubling copies as much as all earlier ones together, plus one
(8 = 1 + 2 + 4 + 1).
So the total stays under 2n and each push costs O(1) on average over the
sequence, even though the ninth push alone copied 8.

This is a model: `std::vector`'s growth factor is implementation-defined
(libstdc++ doubles, MSVC grows by 1.5); the standard only requires
amortised O(1).

(Values from running it under GCC 16.2.)
