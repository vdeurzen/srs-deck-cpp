---
id: ptr-auto-drops-ref
kind: code
version: 1
level: 2
tags: [auto, references, const]
requires:
  - ptr-reference-vs-pointer
  - types-auto-drops-const
input: chips
choices:
  c1: ["const auto&", "auto&", "auto", "const auto"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_same_v<decltype(n), const std::string&>,
                  "n must be a read-only reference, not a copy");
    int main() {}
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

Plain `auto` deduces the way a by-value template parameter does: the
reference of the initialiser is discarded, and `n` becomes a brand-new
`std::string` holding a copy. `const auto` still copies; it only makes the
copy read-only. `auto&` keeps the reference, but `label()` returns a
non-`const` one, so `n` could modify `cfg.name`. Both halves have to be
written: `const auto&`. The rule holds everywhere
`auto` appears: `for (auto s : names)` copies every string, and
`for (const auto& s : names)` does not.
