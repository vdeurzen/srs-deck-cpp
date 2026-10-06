---
id: ptr-auto-drops-ref
kind: code
version: 1
level: 2
tags: [auto, references, const]
requires:
  - ptr-reference-vs-pointer
input: chips
choices:
  c1: ["const auto&", "auto", "const auto", "auto*"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_same_v<decltype(n), const std::string&>,
                  "n is a copy: auto deduces a value type and drops the reference");
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/auto
  - https://en.cppreference.com/w/cpp/language/template_argument_deduction
---

`label()` returns a reference to a string that the `Config` owns. Declare
`n` so that it refers to that string instead of copying it.

```cpp
#include <string>
struct Config {
  std::string name;
  const std::string& label() const { return name; }
};
const Config cfg{"prod"};
{{c1::const auto&}} n = cfg.label();
```

---

Plain `auto` deduces the way a by-value template parameter does: the
reference and the top-level `const` of the initialiser are discarded, and
`n` becomes a brand-new `std::string` holding a copy. `const auto` still
copies; it only makes the copy read-only. `auto*` demands a pointer, and
`label()` does not return one. To keep the reference you have to write it:
`const auto&` (or `auto&`; `auto&&` binds too). The rule holds everywhere
`auto` appears: `for (auto s : names)` copies every string, and
`for (const auto& s : names)` does not.
