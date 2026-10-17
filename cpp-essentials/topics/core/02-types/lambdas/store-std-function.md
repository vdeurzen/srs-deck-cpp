---
id: lambda-store-std-function
kind: code
version: 1
level: 2
tags: [lambdas, callables]
requires:
  - lambda-closure-type
input: chips
choices:
  c1:
    - "std::function<int(int)>"
    - "auto"
    - "int(*)(int)"
    - "decltype([](int x) { return x + 1; })"
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/language/lambda
---

Complete the element type so `make_ops` can return both lambdas in one
vector.

```cpp
#include <functional>
#include <vector>
std::vector<{{c1::std\::function<int(int)>}}> make_ops(int k) {
    return { [](int x) { return x + 1; }, [k](int x) { return x * k; } };
}
```

---

Each lambda expression has its own closure type, so even an identical
`decltype([]...)` names a different type. A function pointer accepts only
the captureless lambda. `std::function<int(int)>` **type-erases**: it
stores a copy of any callable with that signature, possibly on the heap.
