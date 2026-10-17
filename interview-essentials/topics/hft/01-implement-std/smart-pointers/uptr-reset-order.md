---
id: uptr-reset-order
kind: code
version: 1
level: 4
tags: [smart-pointers, lifetime, implement-std]
input: chips
choices:
  c1:
    - "T* old = p; p = q; if (old) d(old);"
    - "T* old = p; if (old) d(old); p = q;"
    - "p = q;"
    - "if (p != q) { if (p) d(p); p = q; }"
compile:
  harness: |
    struct Session { UPtr<Session> self; };          // an object that owns itself
    consteval bool test() {
        UPtr<int> u;
        u.reset(new int(1));
        u.reset(new int(2));
        u.reset();
        auto* s = new Session;
        s->self.p = s;
        s->self.reset();                             // deletes s, and with it self
        return u.p == nullptr;
    }
    static_assert(test());
    int main() {}
requires:
  - cpp-essentials/life-unique-ptr-frees
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/unique.ptr.single.modifiers#3
  - https://en.cppreference.com/w/cpp/memory/unique_ptr/reset
---

You're implementing `unique_ptr::reset(q)`. Complete it so it stays
correct even when deleting the old object destroys `*this` (the harness
resets a `Session` that owns itself).

```cpp
#include <memory>
template <class T, class D = std::default_delete<T>>
struct UPtr {
    T* p = nullptr;
    D d;
    constexpr ~UPtr() { if (p) d(p); }
    constexpr void reset(T* q = nullptr) {
        {{c1::T* old = p; p = q; if (old) d(old);}}
    }
};
```

---

**Store the new pointer first, delete the old one last.** The standard
specifies exactly that order and notes why: the deleter may destroy
`*this`. Here deleting the `Session` runs `~UPtr` on `self`; it must
find `self` already holding `q`. Deleting while `p` still holds the old
pointer makes that destructor delete the `Session` again from inside its
own destructor, recursing until constant evaluation gives up. `p = q;`
alone leaks the old object. Idiom: `T* old = std::exchange(p, q);`. The
standard has no `p != q` guard; `reset(get())` is a double-delete bug,
separate from re-entry.
