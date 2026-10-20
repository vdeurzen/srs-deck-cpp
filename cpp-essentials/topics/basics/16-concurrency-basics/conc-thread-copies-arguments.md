---
id: conc-thread-copies-arguments
kind: basic
version: 1
level: 2
tags: [concurrency, threads, references]
requires:
  - conc-start-with-arguments
  - vc-plain-ref-rejects-temporary
refs:
  - https://en.cppreference.com/w/cpp/thread/thread/thread
  - https://en.cppreference.com/w/cpp/utility/functional/ref
elaborate: Say why copying every argument is the safer default for a new thread, and what passing a reference makes you guarantee instead.
---

`std::ref(x)` (from `<functional>`) wraps a reference to `x` in a small
object that can be copied.

```cpp
void tally(int& sum, int n) { sum += n; }

int sum = 0;
std::thread a(tally, sum, 2);             // does not compile
std::thread b(tally, std::ref(sum), 2);   // compiles
```

## Why is the line creating `a` rejected?

---

**`std::thread` copies each argument, and `int& sum` cannot bind to that copy.**

The thread keeps its own copy of `sum` and passes it to `tally` the way
a temporary is passed, which a non-`const` `int&` refuses. Otherwise
`tally` would update a copy nobody reads. `std::ref` survives the copy
and still refers to `sum`.
