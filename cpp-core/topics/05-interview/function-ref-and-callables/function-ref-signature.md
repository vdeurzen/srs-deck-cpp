---
id: callables-function-ref-signature
kind: code
version: 2
level: 3
tags: [callables]
input: chips
choices:
  c1: ["F&&", "F", "std::function<int(int)>", "int(*)(int)"]
compile:
  harness: |
    struct NoCopy {
      NoCopy() = default;
      NoCopy(const NoCopy&) = delete;
      int operator()(int x) const { return x; }
    };
    template<class A>
    concept Callable = requires(A& a) { call(a); };
    static_assert(Callable<NoCopy>);
    int main() {}
requires:
  - move-semantics-perfect-forwarding
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function_ref
  - https://wg21.link/P0792
---

Complete the parameter type so `call` accepts any callable matching
`int(int)`, even a non-copyable one, without owning it: no allocation,
no copy of the target.

```cpp
#include <concepts>
#include <functional>
template<std::invocable<int> F>
int call({{c1::F&&}} f) { return f(1); }
```

---

A forwarding reference to a constrained template parameter binds to the
caller's callable in place: nothing is copied or allocated, and even a
non-copyable functor works. `std::function` type-erases *and* owns, usually
via a heap allocation, and cannot be deduced here; a function pointer
rejects capturing lambdas and functors. A non-template, type-erased
non-owning parameter is what `std::function_ref` (P0792, C++26) provides;
until then, take the callable as a template parameter whenever it only
needs to live for the duration of the call.
