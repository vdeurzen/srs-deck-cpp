---
id: err-unwind-runs-destructors
kind: trace
version: 2
level: 2
tags: [exceptions, raii, destructors, tracing]
requires:
  - err-unwind-worked
  - err-throw-jumps-to-catch
probes:
  1: { events: "oc!" }
refs:
  - https://eel.is/c++draft/except.ctor
  - https://en.cppreference.com/w/cpp/language/throw
elaborate: Where in your own code does a lock or file rely on a destructor to be released on every exit path?
---

`std::runtime_error` is a standard exception type derived from `std::exception`.

```cpp
std::string events;
struct File {
    File()  { events += 'o'; }   // open
    ~File() { events += 'c'; }   // close
};
void save() {
    File f;
    throw std::runtime_error("disk full");
}

try { save(); }
catch (const std::exception&) { events += '!'; }   // @1
```

---

Leaving `save` by exception still destroys `f`: **stack unwinding runs the
destructor of every fully constructed local** between the `throw` and the
handler, before the handler body runs. So `c` lands before `!`. That is
why a file or lock held by such an object is released on every exit path.
Values from running an instrumented copy built with GCC 16.2.
