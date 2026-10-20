---
id: raii-ctor-throw-worked
kind: basic
version: 1
level: 2
tags: [lifetime, raii, exceptions, worked-example]
requires:
  - raii-owner-in-destructor
  - exceptions-unwinding-destroys-locals
refs:
  - https://en.cppreference.com/w/cpp/language/throw#Stack_unwinding
  - https://eel.is/c++draft/except.ctor#3
---

`Part` constructors append their letter to `trail`, destructors `~` then
the letter; `~Whole` appends `W`.

```cpp
struct Whole {
  Part a{'a'};
  Part b{'b'};
  Whole() { throw 1; }
  ~Whole() { trail += 'W'; }
};
```

`Whole w;` runs inside a `try`:

| step | event | `trail` |
| --- | --- | --- |
| build members | `a` constructed | `a` |
| build members | `b` constructed | `ab` |
| run body | `Whole()` throws | `ab` |
| unwind | `~b`, then `~a` | `ab~b~a` |

## Why does `trail` never get a `W`?

---

**`w`'s constructor never finished, so `w` never existed to destroy.**

An object's lifetime begins only when its constructor completes.
Unwinding destroys what *was* fully built, the members `b` and `a`, in
reverse order; the half-built `Whole` gets no destructor call.
