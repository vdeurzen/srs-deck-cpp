---
id: ptr-auto-drops-ref
kind: code
version: 1
level: 2
tags: [auto, references, const]
requires:
  - ptr-reference-vs-pointer
  - types-auto-deduces
  - string-basics
  - class-struct-members
input: chips
choices:
  c1: ["const auto&", "auto&", "auto", "const auto"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_same_v<decltype(n), const std::string&>,
                  "n must be a read-only reference, not a copy");
    int main() {}
elaborate: Say aloud where a plain `auto` in your own code silently copies a string or a container that you only meant to read.
refs:
  - https://en.cppreference.com/w/cpp/language/auto
  - https://en.cppreference.com/w/cpp/language/template_argument_deduction
---

`label()` returns a reference to a string that the `Config` owns. Declare
`n` as a read-only name for that same string, with no copy made.

```cpp
#include <string>
struct Config {
  std::string name;
  std::string& label() { return name; }
};
Config cfg{"prod"};
{{c1::const auto&}} n = cfg.label();
```

---

Plain `auto` discards the reference of the initialiser, and `n` becomes
a brand-new `std::string` holding a copy. `const auto` still copies; it only makes the
copy read-only. `auto&` keeps the reference, but `label()` returns a
non-`const` one, so `n` could modify `cfg.name`. Both halves have to be
written: `const auto&`.
