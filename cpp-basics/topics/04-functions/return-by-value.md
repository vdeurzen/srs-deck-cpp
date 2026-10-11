---
id: fn-return-by-value
kind: code
version: 1
level: 1
tags: [functions, return]
input: chips
choices:
  c1: ["std::string", "std::string&", "const std::string&"]
compile:
  harness: |
    static_assert(shout("hi") == "hi!");
    int main() {}
requires:
  - fn-by-value-vs-reference
refs:
  - https://en.cppreference.com/w/cpp/language/return#Automatic_move_from_local_variables_and_parameters
  - https://en.cppreference.com/w/cpp/language/reference#Dangling_references
---

`shout` builds its result in the local variable `s`. Pick the return type
so the caller can still read the result after `shout` has returned.

```cpp
#include <string>

constexpr {{c1::std\::string}} shout(const char* word) {
    std::string s = word;
    s += '!';
    return s;
}
```

---

**Return by value**: the caller gets its own `std::string`; the result is
moved or elided from `s`, never copied, so it is cheap. A reference return would
refer to `s`, which is destroyed when `shout` returns: a dangling reference.
`const std::string&` compiles and dangles (the constant evaluation catches
the read); `std::string&` does not even compile, because since C++23
`return s;` treats the local `s` as an rvalue.
