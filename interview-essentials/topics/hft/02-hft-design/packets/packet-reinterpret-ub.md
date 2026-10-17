---
id: packet-reinterpret-ub
kind: basic
version: 1
level: 3
tags: [packets, undefined-behaviour, strict-aliasing, lifetime, misconception]
requires:
  - cpp-essentials/ub-definition
  - cpp-essentials/types-cstyle-reinterprets
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/basic.lval#11
  - https://timsong-cpp.github.io/cppwp/n4950/intro.object#13
  - https://en.cppreference.com/w/cpp/language/reinterpret_cast#Type_aliasing
elaborate: Where in your own code does a pointer cast read bytes as a type that was never constructed there?
---

```cpp
struct Hdr { std::uint32_t seq; std::uint16_t len, type; };
alignas(Hdr) unsigned char buf[2048];       // filled by recv()
auto* h = reinterpret_cast<const Hdr*>(buf);
on_seq(h->seq);
```

## The feed handler has parsed headers like this for years, and every test passes on x86-64. What does the C++ standard say about `h->seq`?

---

**Undefined behaviour: the cast yields a pointer to `buf[0]`, not to a `Hdr`.**
Even if implicit object creation supplied a `Hdr` in `buf`, the cast
doesn't point at it (that needs `std::launder` or `start_lifetime_as`).
So `h->seq` reads `unsigned char` storage as `uint32_t`, which the
aliasing rule forbids. Copy the bytes out with `std::memcpy` or
`std::bit_cast`.
