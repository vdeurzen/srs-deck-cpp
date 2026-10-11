---
id: err-unwind-runs-destructors
kind: trace
version: 1
level: 2
tags: [exceptions, raii, destructors, tracing]
requires:
  - err-throw-jumps-to-catch
probes:
  1: { events: "owc" }
  2: { events: "owcoc!" }
refs:
  - https://eel.is/c++draft/except.ctor
  - https://en.cppreference.com/w/cpp/language/throw
---

```cpp
std::string events;
struct File {
    File()  { events += 'o'; }   // open
    ~File() { events += 'c'; }   // close
};
void save(bool fail) {
    File f;
    if (fail) throw std::runtime_error("disk full");
    events += 'w';               // write
}

save(false);                                            // @1
try { save(true); }
catch (const std::exception&) { events += '!'; }        // @2
```

---

Leaving `save` normally destroys `f` at the closing brace: `o w c`. On
the second call the `throw` skips the write, but leaving the function by
exception still destroys `f`: **stack unwinding runs the destructor of
every fully constructed local** between the `throw` and the handler,
before the handler body runs. That is why a file or lock held by such an
object is released on every exit path. Values from running an
instrumented copy built with GCC 16.2 (`g++ -std=c++23`).
