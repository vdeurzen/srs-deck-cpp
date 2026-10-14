---
id: erasure-fnptr-vtable
kind: chunk
version: 1
level: 4
tags: [type-erasure, callables, implement-std]
expose_ms: 9000
compile:
  harness: |
    #include <type_traits>
    struct Twice { int k; constexpr int operator()(int x) const { return k * x; } };
    struct Inc { int k; constexpr int operator()(int x) const { return k + x; } };
    static_assert(std::is_same_v<decltype(vt<Twice>.call), int (*)(void*, int)>);
    static_assert(std::is_same_v<decltype(vt<Twice>.destroy), void (*)(void*)>);
    static_assert(vt<Twice>.call != vt<Inc>.call);   // one table per type
    [[maybe_unused]] constexpr const VTable* table = &vt<Twice>;
    int main() {}
requires:
  - cpp-core/staticpoly-type-erasure-skeleton
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/language/lambda#Closure_type
  - https://github.com/gcc-mirror/gcc/blob/releases/gcc-14.2.0/libstdc%2B%2B-v3/include/bits/std_function.h
---

```cpp
struct VTable {
    int (*call)(void*, int);
    void (*destroy)(void*);
};
template <class F> constexpr VTable vt{
    [](void* p, int x) { return (*static_cast<F*>(p))(x); },
    [](void* p) { delete static_cast<F*>(p); }};
```

---

**A hand-built vtable**: type erasure for `int(int)` without virtual
functions. The wrapper holds a `void*` to its heap-allocated target and
a `const VTable*`; constructing it from a callable `F` stores `&vt<F>`.

- `VTable` lists the operations every target needs, each taking the
  target as `void*`. A real `function` adds clone and move.
- `vt<F>` is one constant table per callable type, built at compile time.
- Each captureless lambda converts to a plain function pointer and is the
  only place that still knows `F`: it casts `void*` back to `F*`.

Unlike the `Concept`/`Model` hierarchy, the target needs no vptr and no
wrapper class. A wrapper with an inline buffer gives its table a destroy
entry that calls `std::destroy_at` instead of `delete`. libstdc++'s
`std::function` is similar: it keeps an invoker pointer and a manager
pointer in the object itself.

The harness checks the table's types and that each `F` gets its own
table, not what the lambdas do: a wrong body such as `return x;` still
compiles and is not caught.
