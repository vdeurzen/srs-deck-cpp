---
id: ptr-dangling-local
kind: basic
version: 1
level: 2
tags: [pointers, lifetime, misconception]
requires:
  - ptr-amp-and-star-cloze
elaborate: Find a function in your own code that hands out a pointer or reference. What object does it point to, and who keeps that object alive after the function returns?
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Invalid_pointers
  - https://en.cppreference.com/w/cpp/language/lifetime
---

## "`*p` is read right away, before anything can overwrite that memory, so `v` is 8." What actually happens?

```cpp
int* larger(int a, int b) {
  int m = a;
  if (b > m) m = b;
  return &m;
}
int* p = larger(3, 8);
int v = *p;
```

---

**Undefined behaviour: `m` died when `larger` returned, so `p`
dangles.** "Right away" does not matter; the object is gone, not merely
at risk. The stack slot often still holds 8, which is why the belief
survives testing. GCC warns (`-Wreturn-local-addr`) and may replace the
returned pointer with null, so the read can crash. Return the `int` by
value.
