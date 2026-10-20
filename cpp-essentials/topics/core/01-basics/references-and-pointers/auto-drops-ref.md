---
id: ptr-auto-drops-ref
kind: code
version: 2
level: 2
tags: [auto, references, const]
requires:
  - ptr-reference-vs-pointer
  - types-auto-deduces
  - string-basics
  - class-struct-members
input: chips
choices:
  c1: ["std::string", "std::string&", "const std::string&", "std::string*"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_same_v<decltype(m), decltype(n)>,
                  "m is not declared with the type auto gave n");
    int main() {}
elaborate: Say aloud where a plain `auto` in your own code silently copies a string or a container that you only meant to read.
refs:
  - https://en.cppreference.com/w/cpp/language/auto
  - https://en.cppreference.com/w/cpp/language/template_argument_deduction
---

`label()` returns a reference to the string that `cfg` owns. Write the
type that `auto` deduces for `n`, so that `m` is declared exactly as `n`
is.

```cpp
#include <string>
struct Config {
  std::string name;
  std::string& label() { return name; }
};
Config cfg{"prod"};
auto n = cfg.label();
{{c1::std\::string}} m = cfg.label();
```

---

**`std::string`: plain `auto` drops the initialiser's reference.** `n` is
a brand-new string holding a copy of `cfg.name`, so changing `n` leaves
`cfg` alone. To keep the reference, write it: `auto&`, or `const auto&`
for read-only access. A `std::string*` would need `&cfg.label()`.
