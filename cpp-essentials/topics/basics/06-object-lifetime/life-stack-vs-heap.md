---
id: life-stack-vs-heap
kind: basic
version: 1
level: 1
tags: [lifetime, storage-duration, new-delete]
requires:
  - ptr-holds-an-address
  - life-scope-automatic
elaborate: Say in one sentence why Go code never has this leak, and what C++ makes you do instead.
refs:
  - https://en.cppreference.com/w/cpp/language/new
  - https://en.cppreference.com/w/cpp/language/storage_duration#Dynamic_storage_duration
  - https://eel.is/c++draft/basic.stc.dynamic
---

## `new int{2}` creates an `int` holding 2 and yields its address. After `f` returns, which of the two `int`s still exists?

```cpp
void f() {
    int a = 1;
    int* p = new int{2};
}
```

---

**The one `new` made: a heap object lives until a `delete` destroys it.**

`a` and the pointer `p` are locals on the *stack*: both die at `f`'s `}`.
A dying pointer leaves its target alone, so the *heap* `int` lives on
with nobody holding its address. Nothing can ever `delete` it: a leak.
