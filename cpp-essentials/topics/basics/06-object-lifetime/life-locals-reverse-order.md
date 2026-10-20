---
id: life-locals-reverse-order
kind: basic
version: 1
level: 2
tags: [lifetime, destructors, scope]
requires:
  - life-scope-exit-worked
elaborate: Say what could go wrong if `b` held a reference to `a` and the two were destroyed in declaration order instead.
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Destruction_sequence
  - https://eel.is/c++draft/stmt.jump#general-2
---

## Both `Tag`s die at `f`'s closing brace. Whose destructor runs first, `a`'s or `b`'s?

```cpp
struct Tag {
  char c;
  ~Tag();
};
void f() {
  Tag a{'a'};
  Tag b{'b'};
}
```

---

**`b`'s: locals are destroyed in reverse order of construction.**

`b` was built after `a`, so it may depend on `a` (hold its address, say).
Destroying `b` first means `a` is still intact while `b`'s destructor
runs. The last object built is the first destroyed.
