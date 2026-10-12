---
id: storage-destroy-then-deallocate
kind: code
version: 1
level: 3
tags: [raw-storage, lifetime, allocator]
input: chips
choices:
  c1:
    - "std::destroy(buf, buf + n); a.deallocate(buf, cap);"
    - "a.deallocate(buf, cap); std::destroy(buf, buf + n);"
    - "std::destroy_n(buf, cap); a.deallocate(buf, cap);"
    - "a.deallocate(buf, cap);"
    - "std::destroy(buf, buf + n); delete[] buf;"
compile:
  harness: |
    struct Tracked {                       // counts live objects
        int* live;
        constexpr explicit Tracked(int* l) : live(l) { ++*live; }
        constexpr Tracked(const Tracked& o) : live(o.live) { ++*live; }
        constexpr ~Tracked() { --*live; }
    };
    consteval bool test() {
        int live = 0;
        std::allocator<Tracked> a;
        Tracked* buf = a.allocate(4);
        for (int i = 0; i != 3; ++i) std::construct_at(buf + i, &live);
        release(a, buf, 3, 4);
        return live == 0;
    }
    static_assert(test());
    int main() {}
requires:
  - storage-construct-at
refs:
  - https://en.cppreference.com/w/cpp/memory/destroy
  - https://en.cppreference.com/w/cpp/memory/allocator/deallocate
  - https://timsong-cpp.github.io/cppwp/n4950/specialized.destroy#1
---

`buf` came from `a.allocate(cap)`, and its first `n` slots hold
elements built with `std::construct_at`. Complete `release` so that
nothing the buffer held outlives the call.

```cpp
#include <cstddef>
#include <memory>
template <class T>
constexpr void release(std::allocator<T>& a, T* buf,
                       std::size_t n, std::size_t cap) {
    {{c1::std\::destroy(buf, buf + n); a.deallocate(buf, cap);}}
}
```

---

Two steps, in this order: end the `n` lifetimes, then return the
storage with the same `cap` that was allocated. Deallocating first
leaves `destroy` running destructors in freed memory. Destroying `cap`
elements runs destructors on slots that never held an object. Skipping
`destroy` frees memory without running a destructor (the test's live
count stays 3). `delete[]` only pairs with `new[]`, never with
`allocate`.
