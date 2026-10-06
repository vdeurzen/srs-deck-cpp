---
id: lambda-dangling-reference
kind: basic
version: 1
level: 2
tags: [lambdas, lifetime, misconception]
requires:
  - lambda-capture-trace
elaborate: In Go the compiler moves a captured variable to the heap when the closure escapes. Which C++ capture gives you that "the closure keeps it alive" behaviour, and who owns the value then?
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://en.cppreference.com/w/cpp/language/reference#Dangling_references
---

## A closure "remembers" its variables, so `next()` returns 1, then 2. What really happens?

```cpp
auto make_counter() {
    int count = 0;
    return [&count] { return ++count; };
}
auto next = make_counter();
next();
```

---

**Undefined behaviour: `count` died when `make_counter` returned; the
closure holds a dangling reference.**

The belief is right in Go, where escape analysis keeps captured
variables alive. A C++ reference capture extends no lifetime. Capture by
value instead: `[count]() mutable { return ++count; }`.
