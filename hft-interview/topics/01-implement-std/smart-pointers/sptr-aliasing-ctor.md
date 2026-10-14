---
id: sptr-aliasing-ctor
kind: basic
version: 1
level: 3
tags: [smart-pointers, ownership, implement-std]
requires:
  - cpp-core/smart-pointers-shared-ptr-control-block
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/util.smartptr.shared.const#14
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/shared_ptr
---

## `std::shared_ptr<Car> car` owns a `Car` with a member `Engine engine`. A callback needs a `shared_ptr<Engine>` that keeps the engine valid, without a second allocation. Which constructor call builds it?

---

**`std::shared_ptr<Engine>(car, &car->engine)`, the aliasing constructor.**
It shares `car`'s control block, so the `Car` lives while the callback
holds it, but `get()` returns the engine. That is why your
`shared_ptr` stores its object pointer beside the block pointer: they
can name different objects. `shared_ptr<Engine>(&car->engine)` would
make a second block that deletes a member.
