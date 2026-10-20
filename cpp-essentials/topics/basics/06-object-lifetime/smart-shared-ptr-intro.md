---
id: smart-shared-ptr-intro
kind: basic
version: 1
level: 1
tags: [lifetime, ownership, smart-pointers, worked-example]
requires:
  - smart-unique-ptr-intro
  - ptr-null-pointer
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/use_count
  - https://eel.is/c++draft/util.smartptr.shared
---

## `std::make_shared<int>(7)` creates an `int` owned by a `std::shared_ptr`. `a` created the `int`, yet it is still alive after line 3. Why?

```cpp
std::shared_ptr<int> a = std::make_shared<int>(7);
std::shared_ptr<int> b = a;
a = nullptr;
```

```
line  effect              owners   int alive
1     a owns the new int  a        yes
2     copy: b owns it too a, b     yes
3     a now owns nothing  b        yes
```

---

**`b` still owns it: the `int` is destroyed only when its last owner lets go.**

A `shared_ptr` keeps a count of owners (`use_count()`): copying one adds
an owner; setting one to `nullptr` or destroying it removes one. The owner
that brings the count to 0 deletes the `int`. Who created it does not
matter.
