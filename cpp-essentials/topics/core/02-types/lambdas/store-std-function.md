---
id: lambda-store-std-function
kind: code
version: 1
level: 2
tags: [lambdas, callables]
requires:
  - lambda-std-function-intro
  - vector-basics
input: chips
choices:
  c1:
    - "std::function<int(int)>"
    - "auto"
    - "int(*)(int)"
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://en.cppreference.com/w/cpp/language/lambda
elaborate: Name a place in your own code, such as a list of callbacks, where storing closure objects in a `std::function<int(int)>` is worth its possible heap allocation, and say why.
---

`int(int)` is the type of a function taking and returning `int`, and
`int(*)(int)` a pointer to such a function. Complete the element type so `make_ops` can return both closure objects in
one vector.

```cpp
#include <functional>
#include <vector>
std::vector<{{c1::std\::function<int(int)>}}> make_ops(int k) {
    return { [](int x) { return x + 1; }, [k](int x) { return x * k; } };
}
```

---

Each lambda expression has its own closure type, so `auto` cannot name
one element type for both. A function pointer, `int(*)(int)`, accepts only
the captureless closure object. `std::function<int(int)>` **type-erases**: it
stores a copy of any callable with that signature, possibly on the heap.
