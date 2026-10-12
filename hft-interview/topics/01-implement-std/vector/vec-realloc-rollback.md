---
id: vec-realloc-rollback
kind: trace
version: 1
level: 4
tags: [vector, exceptions, tracing, implement-std]
probes:
  1: { i: "2", log: "" }
  2: { log: "701", n: "4" }
requires:
  - vec-realloc-order
  - cpp-core/exceptions-unwinding-destroys-locals
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/vector.modifiers#2
  - https://timsong-cpp.github.io/cppwp/n4950/specialized.destroy#1
---

```cpp
// Vec<Tok>::realloc_append(const Tok& x): b holds Toks 0 1 2 3, n == cap == 4, x.id == 7.
// Tok(const Tok&) throws when id == 2; ~Tok() appends its id to `log`, which starts empty.
Tok* nb = a.allocate(2 * cap);
bool made = false;  std::size_t i = 0;
try {
    std::construct_at(nb + n, x);  made = true;
    for (; i != n; ++i) std::construct_at(nb + i, b[i]);    // copies
} catch (...) {                                             // @1
    if (made) std::destroy_at(nb + n);
    std::destroy(nb, nb + i);
    a.deallocate(nb, 2 * cap);                              // @2
    throw;
}
```

---

The growth path of `push_back` with the rollback an interviewer asks
for. `Tok` has only a throwing copy constructor, so relocation copies,
and the copy of element 2 throws with `i == 2`.

**Nothing cleans up raw storage for you.** At `@1` the copies of 0 and
1 and the new 7 are alive in `nb`, yet `log` is still empty: unwinding
destroys locals, not objects built with `construct_at`. The `catch` must
destroy exactly what was built (`made` and `i` record it), then free
the block. `n` is still 4 and the old Toks are intact: the strong
guarantee. libstdc++ tracks its progress the same way.

Values from compiling and running an instrumented copy with GCC 16.2
(`g++ -std=c++23 -fsanitize=address,undefined`, clean).
