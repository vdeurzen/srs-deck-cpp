---
id: ptr-dangling-local
kind: basic
version: 1
level: 2
tags: [pointers, lifetime, misconception]
requires:
  - ptr-amp-and-star-cloze
  - life-scope-automatic
  - ub-definition
elaborate: Find a function in your own code that hands out a pointer or reference. What object does it point to, and who keeps that object alive after the function returns?
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Invalid_pointers
  - https://en.cppreference.com/w/cpp/language/lifetime
---

## "`*p` is read right away, before anything can overwrite that memory, so `v` is 8." What actually happens?

```cpp
int* sum(int a, int b) {
  int m = a + b;
  return &m;
}
void use() {
  int* p = sum(3, 5);
  int v = *p;
}
```

---

**Undefined behaviour: `m` died when `sum` returned, so `p`
dangles.** "Right away" does not matter; the object is gone, not merely
at risk. That memory often still holds 8, which is why the belief
survives testing; GCC may even return null instead, so the read can
crash. Return the `int` by value.
