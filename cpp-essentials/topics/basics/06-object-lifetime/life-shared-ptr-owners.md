---
id: life-shared-ptr-owners
kind: trace
version: 1
level: 1
tags: [lifetime, ownership, tracing]
requires:
  - life-ctor-dtor-count
  - life-unique-ptr-owns-trace
probes:
  1: { owners: "2", alive: "1" }
  2: { owners: "1", alive: "1" }
  3: { owners: "0", alive: "0" }
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/use_count
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/make_shared
---

```cpp
int alive = 0;   // the constructor adds 1, the destructor subtracts 1
struct Doc {
  Doc()  { ++alive; }
  ~Doc() { --alive; }
};

int main() {
  std::shared_ptr<Doc> a = std::make_shared<Doc>();
  long owners = 0;
  {
    std::shared_ptr<Doc> b = a;
    owners = a.use_count();     // @1
  }
  owners = a.use_count();       // @2
  a = nullptr;
  owners = a.use_count();       // @3
}
```

---

`std::make_shared<Doc>()` creates one `Doc` owned by a `shared_ptr`.
Copying a `shared_ptr` adds an **owner**, not a `Doc`: `use_count()` is
2 while `b` exists, yet `alive` stays 1. When `b` dies at its `}` the
count drops to 1 and the `Doc` survives, because `a` still owns it.
Setting `a` to `nullptr` releases the last owner, so the `Doc` is
destroyed right there; an empty `shared_ptr` reports 0. Verified by
compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23`), with a clean `-fsanitize=address` run.
