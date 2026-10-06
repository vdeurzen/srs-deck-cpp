---
id: raii-ctor-throw-unwinds-members
kind: trace
version: 1
level: 2
tags: [lifetime, raii, exceptions, tracing]
requires:
  - raii-owner-in-destructor
  - exceptions-unwinding-destroys-locals
probes:
  1: { trail: "ab~b~a", caught: "1" }
  2: { trail: "ab~b~ap", caught: "1" }
elaborate: Which of your own classes opens two things in one constructor body? If the second open throws, what releases the first, and what member split would fix it?
refs:
  - https://en.cppreference.com/w/cpp/language/throw#Stack_unwinding
  - https://timsong-cpp.github.io/cppwp/n4950/except.ctor#3
---

```cpp
std::string trail;   // constructors append their letter, destructors '~' then the letter
struct Part {
  char c;
  Part(char ch) : c(ch) { trail += c; }
  ~Part() { trail += '~'; trail += c; }
};
struct Whole {
  Part a{'a'};
  Part b{'b'};
  Whole() { throw 1; }
  ~Whole() { trail += 'W'; }
};

int main() {
  int caught = 0;
  try {
    Whole w;
    trail += '!';
  } catch (int) {
    caught = 1;        // @1
  }
  Part p{'p'};         // @2
}
```

---

`Whole`'s members are constructed first, in declaration order (`a`, then
`b`), and only then does the constructor body run and throw. An object
whose constructor did not complete never existed as far as the language is
concerned, so `~Whole` **never runs**: no `W` appears. What does run,
during stack unwinding, is the destructor of every subobject that *was*
fully constructed, in reverse order: `~b`, then `~a`. The `!` is skipped
because the exception leaves the `try` block, and the program then
carries on normally — `p` is built afterwards.

This is why RAII is one owner per resource. Had `Whole` acquired two
handles in its own body and thrown between them, nothing would release the
first; held in two members, unwinding releases exactly what was acquired.
Verified by compiling and running this program under GCC 16.2
(`g++ -std=c++23`), including a clean run under `-fsanitize=address`.
