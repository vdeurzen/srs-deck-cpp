---
id: err-chunk-catch-report
kind: chunk
version: 1
level: 1
tags: [exceptions, idioms]
expose_ms: 6000
compile: null
requires:
  - err-catch-by-reference-why
refs:
  - https://en.cppreference.com/w/cpp/language/catch
  - https://en.cppreference.com/w/cpp/error/exception/what
---

```cpp
try {
    run_job();
} catch (const std::exception& e) {
    std::cerr << "error: " << e.what() << '\n';
}
```

---

**Catch any standard exception and report it.** Every standard library
exception, and every well-behaved user one, derives from `std::exception`,
so this one handler sees them all. `const&` binds to the thrown object
without copying or slicing it, so `what()` returns the message the
`throw` site wrote. It is graded by text (`compile: null`) because
`run_job` and the includes belong to the surrounding program.
