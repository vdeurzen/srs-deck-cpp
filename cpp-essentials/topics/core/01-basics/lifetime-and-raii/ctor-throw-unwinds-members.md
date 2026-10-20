---
id: raii-ctor-throw-unwinds-members
kind: trace
version: 2
level: 2
tags: [lifetime, raii, exceptions, tracing]
requires:
  - raii-ctor-throw-worked
  - exceptions-unwinding-destroys-locals
probes:
  1: { trail: "yx~x~y" }
elaborate: Which of your own classes opens two things in one constructor body? If the second open throws, what releases the first, and what member split would fix it?
refs:
  - https://en.cppreference.com/w/cpp/language/throw#Stack_unwinding
  - https://eel.is/c++draft/except.ctor#3
---

Read `trail` once the handler at @1 has run.

```cpp
std::string trail;   // constructors append their letter, destructors '~' then the letter
struct Part {
  char c;
  Part(char ch) : c(ch) { trail += c; }
  ~Part() { trail += '~'; trail += c; }
};
struct Whole {
  Part y{'y'};
  Part x{'x'};
  Whole() { throw 1; }
  ~Whole() { trail += 'W'; }
};
int main() {
  try { Whole w; } catch (int) {}   // @1
}
```

---

Members are built in declaration order, `y` then `x`, before the
constructor body runs and throws. Unwinding destroys the fully built
members in reverse, `~x` then `~y`, and `~Whole` never runs because `w`
was never completely constructed. Values verified with GCC 16.2.
