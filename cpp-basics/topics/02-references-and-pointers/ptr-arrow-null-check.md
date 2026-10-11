---
id: ptr-arrow-null-check
kind: code
version: 1
level: 1
tags: [pointers, nullptr, undefined-behaviour]
requires:
  - ptr-amp-and-star-cloze
  - ptr-nullptr-overload
input: chips
choices:
  c1: ["r == nullptr", "*r == nullptr", "r->w == 0", "&r == nullptr"]
  c2: ["r->w", "r.w", "*r.w", "(*r)->w"]
compile:
  harness: |
    constexpr Rect sq{3, 4};
    static_assert(area_or_zero(&sq) == 12);
    static_assert(area_or_zero(nullptr) == 0);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_member_access_operators
  - https://en.cppreference.com/w/cpp/language/pointer#Null_pointers
---

`r` may point to a `Rect`, or be null. Complete the guard and the member
access.

```cpp
struct Rect { int w, h; };
constexpr int area_or_zero(const Rect* r) {
  if ({{c1::r == nullptr}}) return 0;
  return {{c2::r->w}} * r->h;
}
```

---

`r->w` is shorthand for `(*r).w`: go through the pointer, then pick the
member. `r.w` fails because `r` is a pointer, not a `Rect`; `*r.w`
parses as `*(r.w)`, the same mistake; `(*r)->w` dereferences twice. The guard
must test the pointer itself. Dereferencing a null pointer, by `*r` or
by `r->`, is undefined behaviour, so `r->w == 0` as a guard is the bug it
means to prevent. Inside a constant expression the compiler rejects that
dereference outright; at run time it usually crashes, or worse, does not.
