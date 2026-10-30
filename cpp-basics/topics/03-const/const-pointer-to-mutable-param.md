---
id: const-pointer-to-mutable-param
kind: basic
version: 1
level: 2
tags: [const, pointers]
requires:
  - cpp-essentials/const-pointer-read-rule
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Qualification_conversions
  - https://eel.is/c++draft/conv.qual
elaborate: Find a function in your code that takes a plain pointer or reference but only reads through it. What does every `const` caller have to do to call it today?
---

## What happens on the last line?

```cpp
void print_all(int* first, int n);   // only reads
const int readings[] = {3, 1, 4};
print_all(readings, 3);
```

---

**Compile error: `const int*` does not convert to `int*`.** Dropping
`const` implicitly would let `print_all` write to read-only data, so only
the opposite direction (`int*` to `const int*`) is implicit. It is tempting
to expect it to work, because the address is the same. Fix the function: take
`const int* first`. Do not cast the `const` away.
