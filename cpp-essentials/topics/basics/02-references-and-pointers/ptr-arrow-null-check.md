---
id: ptr-arrow-null-check
kind: code
version: 2
level: 1
tags: [pointers, nullptr, undefined-behaviour]
requires:
  - ptr-null-pointer
  - ptr-arrow-member
  - constexpr-fn-static-assert
elaborate: Find a function in your code that takes a pointer. Where does it check for null, and what would happen on the path that forgets?
input: chips
choices:
  c1: ["r == nullptr", "*r == nullptr", "r->w == 0", "&r == nullptr"]
compile:
  harness: |
    constexpr int width_of_box() { Rect box{3, 4}; return width_or_zero(&box); }
    static_assert(width_of_box() == 3);
    static_assert(width_or_zero(nullptr) == 0);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_member_access_operators
  - https://en.cppreference.com/w/cpp/language/pointer#Null_pointers
---

`r` may point to a `Rect`, or be null. Complete the guard so the
function returns the width, or 0 when there is no `Rect`.

```cpp
struct Rect { int w, h; };
constexpr int width_or_zero(Rect* r) {
  if ({{c1::r == nullptr}}) return 0;
  return r->w;
}
```

---

**Test the pointer itself: `r == nullptr` asks whether there is a `Rect` at all.**

`*r == nullptr` and `r->w == 0` both read through `r` first, which is
undefined behaviour exactly when `r` is null. `&r == nullptr` tests the
address of the parameter `r`, which is never null.
