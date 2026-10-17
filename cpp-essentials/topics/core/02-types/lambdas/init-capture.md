---
id: lambda-init-capture
kind: code
version: 1
level: 3
tags: [lambdas, move-semantics]
requires:
  - lambda-capture-trace
  - smart-pointers-unique-ptr-ownership
input: chips
choices:
  c1: ["p = std::move(p)", "p", "&p", "="]
compile:
  harness: |
    using Reader = decltype(make_reader(nullptr));
    static_assert(!std::is_copy_constructible_v<Reader>);
    static_assert(std::is_move_constructible_v<Reader>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
---

Complete the capture so the returned lambda owns the `int` and is safe
to call after `make_reader` returns.

```cpp
#include <memory>
#include <type_traits>
auto make_reader(std::unique_ptr<int> p) {
    return [{{c1::p = std\::move(p)}}] { return *p; };
}
```

---

An **init-capture** declares a new closure member and initialises it
from any expression, here by moving. `[p]` and `[=]` try to copy a
`unique_ptr` and fail. `[&p]` compiles but refers to the parameter, which
dies at `return`: a dangling, copyable closure.
