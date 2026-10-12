---
id: vec-erase-shift
kind: code
version: 1
level: 3
tags: [vector, raw-storage, lifetime, implement-std]
input: chips
choices:
  c1:
    - "std::destroy_at(b + --n);"
    - "--n;"
    - "std::destroy_at(b + n--);"
    - "std::destroy_at(pos); --n;"
compile:
  harness: |
    struct Count { int live = 0, last_destroyed = 0; };
    struct Tag {                                      // a value; reports its destruction
        int v;  Count* c;
        constexpr Tag(int x, Count* k) : v(x), c(k) { ++c->live; }
        constexpr Tag(const Tag& o) : v(o.v), c(o.c) { ++c->live; }
        constexpr Tag& operator=(const Tag& o) { v = o.v;  return *this; }
        constexpr ~Tag() { --c->live;  c->last_destroyed = v; }
    };
    consteval bool test() {
        Count c;
        bool ok;
        {
            Vec<Tag> w;
            for (int x : {10, 20, 30, 40}) std::construct_at(w.b + w.n++, x, &c);
            Tag* next = w.erase(w.b + 1);
            ok = w.n == 3 && c.live == 3 && c.last_destroyed == 40   // the leftover copy
              && next->v == 30 && w.b[0].v == 10 && w.b[2].v == 40;
        }
        return ok && c.live == 0;
    }
    static_assert(test());
    int main() {}
requires:
  - cpp-core/storage-destroy-at-pop
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/vector.modifiers#5
  - https://en.cppreference.com/w/cpp/container/vector/erase
---

`erase(pos)` closes the gap with `std::move`, the algorithm: it
move-assigns each later element one slot to the left. Complete it so that afterwards `[0, n)` hold exactly the
remaining elements and no other slot holds an object.

```cpp
#include <algorithm>
#include <memory>
template <class T> struct Vec {
    std::allocator<T> a;  T* b = a.allocate(4);  std::size_t n = 0;
    constexpr T* erase(T* pos) {                  // erase one element
        std::move(pos + 1, b + n, pos);
        {{c1::std\::destroy_at(b + --n);}}
        return pos;
    }
    constexpr ~Vec() { std::destroy(b, b + n);  a.deallocate(b, 4); }
};
```

---

The shift leaves a moved-from leftover in the last slot: shrink `n`,
then destroy that slot. `--n` alone leaves it alive in `[n, cap)`
(live count 4). `b + n--` destroys the empty slot past it.
`destroy_at(pos)` kills the element now holding 30 and never destroys
the leftover.
