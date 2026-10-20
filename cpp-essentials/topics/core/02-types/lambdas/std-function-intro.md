---
id: lambda-std-function-intro
kind: basic
version: 1
level: 1
tags: [lambdas, callables]
requires:
  - lambda-closure-type
elaborate: Say in one sentence, as to an interviewer, when a template parameter is a better way than `std::function` to accept a callback.
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/function
  - https://eel.is/c++draft/func.wrap.func
---

```cpp
int k = 3;
auto inc = [](int x) { return x + 1; };
auto mul = [k](int x) { return x * k; };
```

## `inc` and `mul` have different closure types. Which standard library type can hold either, so one variable stores `inc` now and `mul` later? (`int(int)` is the type of a function taking and returning `int`.)

---

**`std::function<int(int)>`, from `<functional>`.**

It holds a copy of any callable with that call signature, whatever its
type, and forwards each call to it: **type erasure**. A closure object too big
for its small internal buffer is stored on the heap, so building one may
allocate.
