---
id: ll-freelist-pool
kind: code
version: 1
level: 4
tags: [low-latency, allocators, memory]
input: chips
choices:
  c1:
    - "next[i] = head; head = i;"
    - "head = i; next[i] = head;"
    - "next[head] = i; head = i;"
    - "next[i] = -1; head = i;"
compile:
  harness: |
    constexpr int reuse() {
      Pool<4> p;
      int a = p.allocate(), b = p.allocate();
      p.deallocate(a); p.deallocate(b);
      int x = p.allocate(), y = p.allocate(), z = p.allocate();
      return x * 100 + y * 10 + z;
    }
    static_assert(reuse() == 102);   // b, then a, then the untouched slot 2
    int main() {}
requires:
  - ll-memory-pools
refs:
  - https://en.cppreference.com/w/cpp/memory/unsynchronized_pool_resource
  - https://google.github.io/tcmalloc/design.html
---

A fixed-size pool hands out slot indices from a free list threaded
through the slots. Complete `deallocate`.

```cpp
#include <array>
template <int N> struct Pool {
  std::array<int, N> next{};   // next free slot after i; -1 ends the list
  int head = 0;
  constexpr Pool() { for (int i = 0; i < N; ++i) next[i] = i + 1 < N ? i + 1 : -1; }
  constexpr int allocate() { int i = head; head = next[i]; return i; }   // pre: head != -1
  constexpr void deallocate(int i) { {{c1::next[i] = head; head = i;}} }
};
```

---

**Push the slot on the front of the free list: link it, then make it
the head.** Both operations are a load and a store, cannot fragment, and
reuse is LIFO, so the most recently freed — still cache-warm — slot comes
back first. Real pools keep `next` inside the free object's own storage,
so the list costs no memory.
