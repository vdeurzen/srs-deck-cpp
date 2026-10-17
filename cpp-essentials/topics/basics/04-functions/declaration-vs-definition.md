---
id: fn-declaration-vs-definition
kind: basic
version: 1
level: 1
tags: [functions, declarations]
refs:
  - https://en.cppreference.com/w/cpp/language/function
  - https://en.cppreference.com/w/cpp/language/definition
---

## `main` calls `area` before its body appears. Why does this compile?

```cpp
int area(int w, int h);                     // line A

int main() { return area(3, 4); }

int area(int w, int h) { return w * h; }    // line B
```

---

**Line A is a declaration: it gives the name and types a call needs.**

The compiler checks each call against what it has seen. A
declaration (`;` instead of a body) is enough to check `area(3, 4)`. Line B,
the definition, supplies the body, here or in another `.cpp` file.
Without line A, the call is an error.
