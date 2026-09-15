---
id: callables-function-ref-signature
kind: code
version: 1
level: 3
tags: [callables]
input: chips
choices:
  c1:
    [
      "std::function_ref<int(int)>",
      "std::function<int(int)>",
      "int(*)(int)",
      "const std::function<int(int)>&",
    ]
compile:
  harness: |
    static_assert(std::is_same_v<decltype(call), int(std::function_ref<int(int)>)>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function_ref
  - https://wg21.link/P0792
---

Complete the parameter type so `call` accepts any callable matching
`int(int)` without owning it — no allocation, no copy of the target.

```cpp
#include <functional>
int call({{c1::std::function_ref<int(int)>}} f) { return f(1); }
```

---

`std::function_ref` (P0792, C++26) is a non-owning, type-erased reference
to a callable: cheap to pass by value, unlike `std::function`, which
type-erases *and* owns — usually via a heap allocation — so it is the
better parameter type whenever the callable only needs to live for the
duration of the call.
