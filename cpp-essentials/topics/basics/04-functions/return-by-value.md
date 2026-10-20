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
refs:
  - https://en.cppreference.com/w/cpp/language/return#Automatic_move_from_local_variables_and_parameters
  - https://en.cppreference.com/w/cpp/language/reference#Dangling_references
requires:
  - ptr-dangling-local
  - string-basics
  - constexpr-fn-static-assert
elaborate: Find a function in your code that returns a reference or pointer; what object does it refer to, and who keeps it alive?
---

`shout` builds its result in the local variable `s`. Pick the return type
so the caller can still read the result after `shout` has returned.

```cpp
#include <string>

constexpr {{c1::std\::string}} shout(std::string word) {
    std::string s = word;
    s += '!';
    return s;
}
```

---

**Return by value: the caller gets its own `std::string`.** A reference
would refer to `s`, which dies when `shout` returns: `const std::string&`
compiles and dangles, and in C++23 `std::string&` cannot even bind to the
returned local.
