---
id: storage-construct-at
kind: code
version: 1
level: 3
tags: [raw-storage, construct-at, c++20]
input: chips
choices:
  c1:
    - "std::construct_at(slot, s)"
    - "*slot = s"
    - "slot = new std::string(s)"
    - "std::allocator<std::string>{}.construct(slot, s)"
    - "::new (slot) std::string(s)"
compile:
  harness: |
    consteval bool test() {
        std::allocator<std::string> a;
        std::string* p = a.allocate(1);
        put(p, std::string(20, 'x'));          // long enough to own heap memory
        bool ok = p->size() == 20 && (*p)[19] == 'x';
        std::destroy_at(p);
        a.deallocate(p, 1);
        return ok;
    }
    static_assert(test());
    int main() {}
requires:
  - storage-allocate-vs-construct
refs:
  - https://en.cppreference.com/w/cpp/memory/construct_at
  - https://timsong-cpp.github.io/cppwp/n4950/specialized.construct#1
---

`slot` points into storage from `std::allocator<std::string>::allocate`,
and no `std::string` lives there yet. Complete `put` so that afterwards
a `std::string` holding a copy of `s` exists at `slot`. The test runs in
a constant expression.

```cpp
#include <memory>
#include <string>
constexpr void put(std::string* slot, const std::string& s) {
    {{c1::std\::construct_at(slot, s)}};
}
```

---

`std::construct_at(p, args...)` (C++20) begins a new object's lifetime
at `p` and returns a pointer to it. `*slot = s` calls `operator=` on a
string that does not exist: assignment needs a live target.
`slot = new std::string(s)` builds a string elsewhere and only repoints
the local parameter, so `p` stays empty (and the new string leaks).
`std::allocator<T>::construct` was removed in C++20. Placement new is
right at run time, but a constant expression rejects it before C++26.
