---
id: smart-pointers-weak-ptr-lock
kind: code
version: 1
level: 3
tags: [smart-pointers, ownership]
input: chips
choices:
  c1: ["w.lock()", "*w", "w.get()", "w.expired()"]
compile:
  harness: |
    int main() {}
requires:
  - smart-pointers-weak-ptr-breaks-cycles
refs:
  - https://en.cppreference.com/w/cpp/memory/weak_ptr/lock
---

`w` observes a `Node` that another thread may destroy at any moment.
Complete the test so the `Node` is used only if it is still alive and
cannot die between the test and the call.

```cpp
#include <memory>
struct Node { void visit() {} };
void poke(std::weak_ptr<Node> w) {
    if (auto p = {{c1::w.lock()}}) p->visit();
}
```

---

A `weak_ptr` cannot be dereferenced: it has no `operator*` and no
`get()`, precisely because the object may already be gone. `lock()`
returns a `shared_ptr` — empty if the object was destroyed, otherwise a
temporary owner that keeps the `Node` alive for the whole `if` body.
Checking `expired()` and then using the pointer would be a race: the
answer can change before the next line (and `expired()` yields a `bool`,
which `->` rejects). Test and acquire are one atomic step, and the
`shared_ptr` you get back is the proof.
