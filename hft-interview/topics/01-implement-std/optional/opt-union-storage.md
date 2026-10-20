---
id: opt-union-storage
kind: code
version: 1
level: 3
tags: [optional, raw-storage, lifetime, implement-std]
input: chips
choices:
  c1:
    - "union { T val; };"
    - "T val;"
    - "alignas(T) std::byte val[sizeof(T)];"
    - "std::unique_ptr<T> val;"
compile:
  harness: |
    struct Tick {                                   // no default constructor
        int v;  int* live;
        constexpr Tick(int x, int* l) : v(x), live(l) { ++*live; }
        constexpr Tick(const Tick& o) : v(o.v), live(o.live) { ++*live; }
        constexpr ~Tick() { --*live; }
    };
    consteval bool test() {
        int live = 0;
        bool ok;
        {
            Opt<Tick> o;
            ok = !o.engaged && live == 0;           // empty: no Tick exists
            o.set(Tick(7, &live));
            ok = ok && o.engaged && o.val.v == 7 && live == 1;
        }
        return ok && live == 0;
    }
    static_assert(test());
    int main() {}
requires:
  - opt-union-member-lifetime
  - cpp-essentials/vocab-optional-maybe-value
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/optional.optional.general
  - https://en.cppreference.com/w/cpp/language/union#Anonymous_unions
  - https://github.com/gcc-mirror/gcc/blob/releases/gcc-14.2.0/libstdc%2B%2B-v3/include/std/optional#L203-L262
---

`Opt<T>` holds at most one `T` inside the object, never on the heap, and
an empty `Opt` must not create a `T` at all: `T` may have no default
constructor. `set` is only called on an empty `Opt`. Complete the
storage member; the test runs in a constant expression.

```cpp
#include <memory>
template <class T> struct Opt {
    {{c1::union { T val; };}}
    bool engaged = false;
    constexpr Opt() {}
    constexpr ~Opt() { if (engaged) std::destroy_at(&val); }
    constexpr void set(const T& x) { std::construct_at(&val, x); engaged = true; }
};
```

---

**The union keeps `val` out of `Opt`'s own construction and
destruction**, so `construct_at` starts it, `destroy_at` ends it, and
`engaged` records which state holds.

- `T val;` is constructed with every `Opt`, so `Opt()` needs a `Tick()`
  that doesn't exist.
- The byte array fails here because `construct_at(&val, x)` is ill-typed:
  `&val` points to bytes, not to a `T`. Making it work takes placement
  new and a `reinterpret_cast`, which a constant expression rejects.
- `std::unique_ptr<T>` puts the value on the heap, and `construct_at`
  can't build a `unique_ptr` from a `const T&`.

libstdc++'s `std::optional` also stores its value in a union.
