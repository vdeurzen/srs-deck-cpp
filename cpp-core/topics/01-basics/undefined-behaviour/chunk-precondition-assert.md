---
id: ub-chunk-precondition-assert
kind: chunk
version: 1
level: 1
tags: [undefined-behaviour, idioms]
requires:
  - ub-definition
expose_ms: 7000
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/error/assert
  - https://en.cppreference.com/w/cpp/language/ub
---

```cpp
#include <cassert>
int& at(int* p, int n, int i) {
  assert(p != nullptr && 0 <= i && i < n);
  return p[i];
}
```

---

The precondition assert: the line *before* an operation that could be
undefined states exactly what that operation requires. In a debug build a
violation stops here, at the cause, instead of corrupting something that
fails later; with `NDEBUG` it compiles to nothing. Note what the compiler
can and cannot infer on its own: `p[i]` already lets it assume `p` is not
null, but nothing in the code implies `i < n` — the bounds half exists
only because you wrote it. Reading the idiom: whatever the `assert` says
is the contract the caller must meet. C++23's `[[assume(expr)]]` is the
mirror image — the promise without the check.
