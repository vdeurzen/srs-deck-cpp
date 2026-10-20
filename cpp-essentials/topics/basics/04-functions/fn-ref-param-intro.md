---
id: fn-ref-param-intro
kind: basic
version: 1
level: 1
tags: [functions, parameters, references]
requires:
  - ptr-reference-must-bind
  - fn-param-change-intro
elaborate: Name a function in your code that must change its caller's variable; would a reader of the call see that?
refs:
  - https://en.cppreference.com/w/cpp/language/reference#Lvalue_references
  - https://eel.is/c++draft/dcl.init.ref
---

```cpp
void add_tip(int& total) {
    total += 3;
}

int main() {
    int bill = 20;
    add_tip(bill);
}
```

## What is `bill` after `add_tip(bill)`?

---

**23: `total` is a reference, another name for the caller's `bill`.**

A parameter of type `int&` is bound to the argument when the call
starts, so every write to `total` is a write to `bill`. No copy is made,
and the call site looks exactly like a by-value call.
