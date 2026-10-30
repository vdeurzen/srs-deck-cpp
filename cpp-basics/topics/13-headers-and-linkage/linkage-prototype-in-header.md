---
id: linkage-prototype-in-header
kind: code
version: 1
level: 1
tags: [headers, declarations]
requires:
  - cpp-essentials/linkage-include-is-paste
  - cpp-essentials/fn-declaration-vs-definition
input: chips
choices:
  c1: [";", "const;", "{ return w * h; }", "{}"]
compile:
  harness: |
    // rect.cpp: rect.h's text is pasted above; the body follows
    int area(int w, int h) { return w * h; }
    int main() { return area(2, 3) - 6; }
refs:
  - https://en.cppreference.com/w/cpp/language/definition
  - https://en.cppreference.com/w/cpp/language/function
---

`rect.h` is included by every file that calls `area`. Complete the
header line.

```cpp
// rect.h
int area(int w, int h){{c1::;}}
```

---

`int area(int w, int h);` is a **declaration**: it tells each translation
unit that the function exists and how to call it. The **definition**, the
body, is written once, in `rect.cpp`. A body in the header is a second
definition inside `rect.cpp`, so `area` would be defined twice there, and a
duplicate in every other includer, which the linker rejects. A trailing
`const` is only for member functions; on a free function it does not compile.
