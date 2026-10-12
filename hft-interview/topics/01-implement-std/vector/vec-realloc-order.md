---
id: vec-realloc-order
kind: parsons
version: 1
level: 3
tags: [vector, raw-storage, lifetime, implement-std]
distractors:
  - "  for (std::size_t i = 0; i != v.n; ++i) std::construct_at(nb + i, std::move(v.b[i]));  std::construct_at(nb + v.n, x);"
  - "  std::destroy(v.b, v.b + v.n + 1);"
compile:
  harness: |
    #include <string>
    template <class T> struct Vec {      // starts with room for one element
      std::allocator<T> a;  T* b = a.allocate(1);  std::size_t n = 0, cap = 1;
      constexpr void push_back(const T& x) {
        if (n == cap) realloc_insert(*this, 2 * cap, x);
        else { std::construct_at(b + n, x); ++n; }
      }
      constexpr ~Vec() { std::destroy(b, b + n); a.deallocate(b, cap); }
    };
    struct Live {                        // counts live objects
      int* live;
      constexpr explicit Live(int* l) : live(l) { ++*live; }
      constexpr Live(const Live& o) : live(o.live) { ++*live; }
      constexpr ~Live() { --*live; }
    };
    consteval bool strings() {           // 20 chars: each string owns heap memory
      Vec<std::string> w;
      for (char c : {'a', 'b', 'c', 'd'}) w.push_back(std::string(20, c));
      w.push_back(w.b[0]);               // w is full: x refers into the old buffer
      return w.n == 5 && w.cap == 8 && w.b[0] == std::string(20, 'a')
          && w.b[4] == std::string(20, 'a') && w.b[3] == std::string(20, 'd');
    }
    consteval bool counted() {
      int live = 0;
      { Vec<Live> w;  for (int i = 0; i != 5; ++i) w.push_back(Live(&live)); }
      return live == 0;
    }
    static_assert(strings());
    static_assert(counted());
    int main() {}
requires:
  - cpp-core/storage-destroy-then-deallocate
  - cpp-core/storage-uninitialized-move
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://timsong-cpp.github.io/cppwp/n4950/res.on.arguments#1.3
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/vector.tcc
---

`push_back` on a full vector, the slow path. `v` holds the allocator
`a`, the buffer `b`, the size `n` and the capacity `cap`; the caller
passes the new capacity `m`. Order the steps.

```cpp
#include <memory>
template <class V, class T> constexpr void realloc_insert(V& v, std::size_t m, const T& x) {  // x may refer into v.b
  T* nb = v.a.allocate(m);
  std::construct_at(nb + v.n, x);
  for (std::size_t i = 0; i != v.n; ++i) std::construct_at(nb + i, std::move(v.b[i]));
  std::destroy(v.b, v.b + v.n);
  v.a.deallocate(v.b, v.cap);
  v.b = nb;  v.cap = m;  ++v.n;
}
```

---

**Allocate, construct the new element, relocate, destroy, deallocate,
commit.** Each step needs the one before it: `nb` must exist before
anything is built in it, the old elements must be moved out before they
are destroyed, and destroyed before their storage is returned. The
commit comes last, so `v` describes the new buffer only once it is
complete.

The new element goes in *before* the relocation because `x` may refer
into `v.b`: the test pushes `w.b[0]`, and relocating first would copy a
moved-from string. libstdc++ orders its growth path the same way for the
same reason. The first distractor is that relocate-first order. The
second counts the new element as if it were already in `v.b`, and
destroys one slot past the old buffer.
