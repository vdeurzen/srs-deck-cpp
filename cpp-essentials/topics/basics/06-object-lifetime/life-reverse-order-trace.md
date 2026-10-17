---
id: life-reverse-order-trace
kind: trace
version: 1
level: 1
tags: [lifetime, constructors, destructors, members, tracing]
requires:
  - life-ctor-dtor-count
probes:
  1: { seq: "x12" }
  2: { seq: "x12P~2~1~x" }
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Destruction_sequence
  - https://eel.is/c++draft/stmt.jump#general-2
---

```cpp
std::string seq;   // constructors append their char; destructors '~' then the char
struct Tag {
  char c;
  Tag(char ch) : c(ch) { seq += c; }
  ~Tag() { seq += '~'; seq += c; }
};
struct Pair {
  Tag first{'1'};
  Tag second{'2'};
  ~Pair() { seq += 'P'; }
};

int main() {
  {
    Tag x{'x'};
    Pair p;        // @1
  }                // @2 (just after this brace)
}
```

---

Construction runs in declaration order: `x`, then `p`, whose members are
built in the order they are declared (`first`, `second`). At the `}`
everything is undone in **reverse**: `p` goes before `x`, because it was
built after it. Destroying `p` first runs the body of `~Pair` (`P`), and
only then destroys its members, again last-declared first: `~2`, `~1`.
`x`, built first, dies last. Verified by compiling and running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
