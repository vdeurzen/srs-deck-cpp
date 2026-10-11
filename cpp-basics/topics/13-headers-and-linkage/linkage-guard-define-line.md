---
id: linkage-guard-define-line
kind: code
version: 1
level: 1
tags: [headers, preprocessor]
requires:
  - linkage-include-is-paste
input: chips
choices:
  c1: ["#define SHAPES_H", "#define SHAPES", "#undef SHAPES_H"]
compile:
  harness: |
    // paste the submitted header into this file a second time, then use it
    #ifndef PASTE_AGAIN
    #define PASTE_AGAIN
    #include __FILE__
    int main() { Rect r{2, 3}; return r.w * r.h - 6; }
    #endif
refs:
  - https://en.cppreference.com/w/cpp/preprocessor/conditional
  - https://en.cppreference.com/w/cpp/preprocessor/include
---

`shapes.h` is included twice in `main.cpp`. Complete the missing line.

```cpp
// shapes.h
#ifndef SHAPES_H
{{c1::#define SHAPES_H}}
struct Rect { int w; int h; };
#endif
```

---

The **include guard**: the first copy defines the very macro the
`#ifndef` tests, so every later copy in the same translation unit is
skipped. With a different macro name, or none defined, the second copy
defines `Rect` again: `redefinition of 'struct Rect'`. `#pragma once` is
the one-line, non-standard but universally supported alternative.
