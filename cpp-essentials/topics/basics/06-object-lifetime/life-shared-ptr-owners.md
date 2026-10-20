---
id: life-shared-ptr-owners
kind: trace
version: 2
level: 1
tags: [lifetime, ownership, tracing]
requires:
  - life-ctor-dtor-count
  - smart-shared-ptr-intro
elaborate: Pick a shared object in code you know; which owner do you expect to be the last one, and is that obvious from the code?
probes:
  1: { a.use_count(): "2", alive: "1" }
  2: { a.use_count(): "1", alive: "1" }
  3: { alive: "0" }
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/use_count
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/make_shared
---

`a.use_count()` is the number of `shared_ptr`s that own the `Doc`.

```cpp
int alive = 0;   // the constructor adds 1, the destructor subtracts 1
struct Doc {
  Doc()  { ++alive; }
  ~Doc() { --alive; }
};

int main() {
  std::shared_ptr<Doc> a = std::make_shared<Doc>();
  {
    std::shared_ptr<Doc> b = a;   // @1
  }                               // @2 (just after this brace)
  a = nullptr;                    // @3 (after this line)
}
```

---

Copying a `shared_ptr` adds an **owner**, not a `Doc`: the count is 2
while `b` exists, yet `alive` stays 1. When `b` dies at its `}` the count
drops to 1 and the `Doc` survives, because `a` still owns it. Setting `a`
to `nullptr` releases the last owner, so the `Doc` is destroyed right
there. Verified by compiling and running an instrumented copy under
GCC 16.2 (`g++ -std=c++23`).
