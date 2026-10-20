---
id: life-reverse-order-trace
kind: trace
version: 2
level: 1
tags: [lifetime, constructors, destructors, members, tracing]
requires:
  - life-ctor-dtor-count
  - class-default-member-init-intro
  - string-basics
probes:
  1: { seq: "P21x" }
elaborate: Say why destroying in reverse order is what lets a later member safely use an earlier one in its destructor.
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Destruction_sequence
  - https://eel.is/c++draft/stmt.jump#general-2
---

```cpp
std::string seq;   // each destructor appends a char
struct Tag {
  char c;
  ~Tag() { seq += c; }
};
struct Pair {
  Tag first{'1'};
  Tag second{'2'};
  ~Pair() { seq += 'P'; }
};

int main() {
  {
    Tag x{'x'};
    Pair p;
  }                // @1 (just after this brace)
}
```

---

Objects are built in declaration order (`x`, then `p` with `first`, then
`second`) and destroyed in **reverse**: `p` goes before `x`, because it
was built after it. Destroying `p` first runs the body of `~Pair` (`P`),
and only then destroys its members, again last-declared first: `2`, `1`.
`x`, built first, dies last. Verified by compiling and running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
