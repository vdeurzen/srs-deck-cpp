---
id: smart-pointers-weak-ptr-lock
kind: code
version: 1
level: 3
tags: [smart-pointers, ownership]
input: chips
choices:
  c1: ["w.lock()", "w.lock().get()", "!w.expired()", "w"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_same_v<decltype(pin(std::weak_ptr<Node>{})),
                                 std::shared_ptr<Node>>);
    int main() {}
requires:
  - smart-pointers-weak-ptr-lock-intro
  - fn-auto-return-type
elaborate: Where in your own code could an object be freed between a check and its use, and what would pinning it with `lock()` cost there?
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr/lock
---

`w` observes a `Node` whose last owner, in code running at the same time,
may destroy it at any moment.
Complete `pin` so that a caller can safely write
`if (auto p = pin(w)) use(p);` (an `if` may declare a variable, then test
it).

```cpp
#include <memory>
struct Node {};
auto pin(std::weak_ptr<Node> w) {
    return {{c1::w.lock()}};
}
```

---

`lock()` returns a `shared_ptr`: empty if the object was destroyed,
otherwise an owner that keeps the `Node` alive for the caller's whole
`if` body. Test and acquire are one indivisible step. `w.lock().get()`
hands back a raw pointer, and the `shared_ptr` that `lock()` made is
destroyed at the end of `pin`'s `return`: the `Node` can go before `use`
runs. `!w.expired()` is a test with nothing
acquired; the answer can change before the next line. Returning `w`
itself gives the caller a `weak_ptr`, which gives no access to the object
at all, precisely because it may already be gone.
