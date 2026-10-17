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
    static_assert(std::is_same_v<decltype(pin(std::weak_ptr<Node>{})),
                                 std::shared_ptr<Node>>);
    int main() {}
requires:
  - smart-pointers-weak-ptr-breaks-cycles
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr/lock
---

`w` observes a `Node` that another thread may destroy at any moment.
Complete `pin` so that a caller can safely write
`if (auto p = pin(w)) p->visit();`.

```cpp
#include <memory>
#include <type_traits>
struct Node { void visit() {} };
auto pin(const std::weak_ptr<Node>& w) {
    return {{c1::w.lock()}};
}
```

---

`lock()` returns a `shared_ptr`: empty if the object was destroyed,
otherwise an owner that keeps the `Node` alive for the caller's whole
`if` body. Test and acquire are one atomic step. `w.lock().get()` hands
back a raw pointer whose owner, the temporary, dies at the `;`: the
`Node` can go before `visit()`. `!w.expired()` is a test with nothing
acquired; the answer can change before the next line. Returning `w`
itself gives the caller a `weak_ptr`, which has no `operator->` at all,
precisely because the object may already be gone.
