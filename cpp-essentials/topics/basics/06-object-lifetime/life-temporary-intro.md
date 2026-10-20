---
id: life-temporary-intro
kind: basic
version: 1
level: 1
tags: [lifetime, temporaries, foundations, misconception]
requires:
  - life-destructor-intro
  - const-ref-names-caller
elaborate: Say what a C++ function that keeps a reference parameter must therefore assume about its argument.
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime#Temporary_object_lifetime
  - https://eel.is/c++draft/class.temporary#4
---

`Tag{}` creates a `Tag` object that has no name.

```cpp
struct Tag { ~Tag(); };
void show(const Tag& t);

void run() {
    show(Tag{});   // A
    int n = 0;     // B
}                  // C
```

## Many expect the unnamed `Tag` to live until the closing brace, like a named local. At which marked point is it destroyed?

---

**At the end of line A: a temporary dies at the end of its full-expression.**

An unnamed object like this is a *temporary*. Its full-expression is the
whole statement, so it is alive while `show` runs and its destructor runs
at A's `;`, long before `C`, where a named local would die.
