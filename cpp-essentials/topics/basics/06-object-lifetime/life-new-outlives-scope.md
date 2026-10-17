---
id: life-new-outlives-scope
kind: trace
version: 1
level: 1
tags: [lifetime, new-delete, storage-duration, tracing]
requires:
  - life-ctor-dtor-count
probes:
  1: { alive: "2" }
  2: { alive: "1" }
  3: { alive: "0" }
refs:
  - https://en.cppreference.com/w/cpp/language/new
  - https://en.cppreference.com/w/cpp/language/delete
---

```cpp
int alive = 0;   // the constructor adds 1, the destructor subtracts 1
struct Box {
  Box()  { ++alive; }
  ~Box() { --alive; }
};

int main() {
  Box* kept = nullptr;
  {
    Box local;
    kept = new Box;   // @1
  }                   // @2 (just after this brace)
  delete kept;        // @3 (after this line)
}
```

---

`new Box` constructs a `Box` with **dynamic storage duration**: no scope
owns it, so the `}` that destroys `local` leaves it alone. Only the
pointer `kept` is a local, and a pointer's lifetime ending (it does not
here) would not destroy what it points to either. The object lives until
`delete kept;` runs its destructor and frees the memory. Forget that line
and it is never destroyed: a leak. Verified by compiling and running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`), with a clean
`-fsanitize=address` run.
