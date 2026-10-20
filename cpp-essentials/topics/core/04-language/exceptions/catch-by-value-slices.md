---
id: exceptions-catch-by-value-slices
kind: trace
version: 3
level: 2
tags: [exceptions, misconception, tracing]
elaborate: Your codebase logs an exception in a handler and passes it on. Say in one sentence which statement passes it on without losing its derived type.
requires:
  - err-catch-by-reference-why
probes:
  1: { got: "B" }
refs:
  - https://en.cppreference.com/w/cpp/language/throw
  - https://eel.is/c++draft/expr.throw#3
---

Many expect `throw b;` inside a handler to send the caught exception
on unchanged.

```cpp
struct Base { virtual char tag() const { return 'B'; } };
struct Disk : public Base { char tag() const { return 'D'; } };
char got = '?';
try {
  try { throw Disk{}; }
  catch (const Base& b) { throw b; }
} catch (const Base& b) { got = b.tag(); }   // @1
```

---

`throw b;` throws a **new** exception object, copied from `b`'s declared
type, `Base`: the `Disk` part is sliced off, so the outer handler's
`tag()` runs `Base::tag`. The inner reference did bind the `Disk`; the
copy is what loses it. A bare `throw;` rethrows the original object and
would give `D`. Values verified with GCC 16.2.
