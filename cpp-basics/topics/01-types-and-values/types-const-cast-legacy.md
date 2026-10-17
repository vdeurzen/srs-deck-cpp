---
id: types-const-cast-legacy
kind: code
version: 1
level: 2
tags: [types, casts, legacy-code]
input: chips
choices:
  c1: ["const_cast<char*>", "const_cast<const char*>", "static_cast<char*>", "reinterpret_cast<char*>"]
compile:
  harness: |
    static_assert(length("dial") == 4);
    int main() {}
requires:
  - cpp-essentials/types-static-cast-value
  - cpp-essentials/const-pointer-read-rule
refs:
  - https://en.cppreference.com/w/cpp/language/const_cast
  - https://eel.is/c++draft/expr.const.cast
---

`count_chars` comes from a C library you cannot change, and its
parameter is `char*`. Complete the call so `length` can hand it `text`.

```cpp
constexpr int count_chars(char* s) {
    int n = 0;
    while (s[n] != '\0') ++n;
    return n;
}
constexpr int length(const char* text) {
    return count_chars({{c1::const_cast<char*>}}(text));
}
```

---

`const_cast` is the only named cast that may remove `const`; the target
type must be the one *without* it, `char*`. `static_cast` and
`reinterpret_cast` both refuse to cast away constness. It is safe here only because `count_chars` never writes:
writing through the result to an object that really is `const`, like the
string literal `"dial"`, is undefined behaviour.
