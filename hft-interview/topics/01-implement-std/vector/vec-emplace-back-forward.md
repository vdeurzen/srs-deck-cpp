---
id: vec-emplace-back-forward
kind: code
version: 1
level: 3
tags: [vector, perfect-forwarding, implement-std]
input: chips
choices:
  c1:
    - "std::forward<Args>(args)..."
    - "std::move(args)..."
    - "args..."
    - "std::forward<Args...>(args...)"
compile:
  harness: |
    #include <string>
    struct Quote {                                    // records which constructor ran
        std::string sym;  int px;  bool stole;
        constexpr Quote(const std::string& s, int p) : sym(s), px(p), stole(false) {}
        constexpr Quote(std::string&& s, int p) : sym(std::move(s)), px(p), stole(true) {}
    };
    consteval bool test() {
        Vec<Quote> v;
        std::string kept(20, 'k'), spent(20, 's');    // long: each owns heap memory
        v.emplace_back(kept, 101);                    // lvalue: must copy
        v.emplace_back(std::move(spent), 102);        // rvalue: may steal
        return !v.b[0].stole && kept.size() == 20 && v.b[1].stole && v.b[1].px == 102;
    }
    static_assert(test());
    int main() {}
requires:
  - cpp-essentials/move-semantics-perfect-forwarding
  - cpp-core/storage-construct-at
refs:
  - https://en.cppreference.com/w/cpp/container/vector/emplace_back
  - https://en.cppreference.com/w/cpp/utility/forward
---

The interviewer wants `emplace_back`: build the element in place from
the caller's arguments, copying from lvalues and moving from rvalues.
Complete the construction.

```cpp
#include <memory>
#include <utility>
template <class T> struct Vec {                   // growth left out: room for 4
    std::allocator<T> a;  T* b = a.allocate(4);  std::size_t n = 0;
    template <class... Args> constexpr T& emplace_back(Args&&... args) {
        T* p = std::construct_at(b + n, {{c1::std\::forward<Args>(args)...}});
        ++n;  return *p;
    }
    constexpr ~Vec() { std::destroy(b, b + n);  a.deallocate(b, 4); }
};
```

---

Each `args` is a named forwarding reference, so an lvalue. The pack
expansion `std::forward<Args>(args)...` casts each one back to the
caller's value category, so `kept` is copied and `spent` is moved.
`std::move(args)...` steals from `kept` too; bare `args...` copies
`spent`. `std::forward<Args...>(args...)` expands inside one call:
`forward` takes one argument.
