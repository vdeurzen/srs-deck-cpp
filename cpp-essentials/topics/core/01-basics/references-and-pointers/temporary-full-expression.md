---
id: ptr-temporary-full-expression
kind: trace
version: 2
level: 2
tags: [lifetime, temporaries, references, tracing]
requires:
  - life-temporary-full-expression
  - ptr-lifetime-extension
elaborate: Say aloud which line in your own code keeps a reference to something a function returned by value, and whether it survives past the `;`.
probes:
  1: { trail: "k" }
  2: { trail: "kt~t" }
  3: { trail: "kt~t~k" }
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization#Lifetime_of_a_temporary
  - https://timsong-cpp.github.io/cppwp/n4950/class.temporary#6
---

Read `trail` just after each marked line; @3 is after the inner block
closes.

```cpp
std::string trail;   // constructors append their letter, destructors '~' then the letter
struct Noisy {
  char c;
  Noisy(char ch) : c(ch) { trail += c; }
  ~Noisy() { trail += '~'; trail += c; }
};
Noisy make(char c) { return Noisy{c}; }

int main() {
  {
    const Noisy& kept = make('k');   // @1
    char first = make('t').c;        // @2
  }                                  // @3
}
```

---

`kept` binds directly to the temporary from `make('k')`, so that
temporary lives as long as `kept`: no `~k` at @1. The `t` temporary is
bound to nothing and dies at its `;`, after `.c` is read. The extended
`k` dies with `kept`, at the block's `}`. Values verified with GCC 16.2.
