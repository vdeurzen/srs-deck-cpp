---
id: pool-typed-storage
kind: code
version: 1
level: 4
tags: [pools, raw-storage, lifetime, low-latency]
input: chips
choices:
  c1:
    - "std::destroy_at(p);"
    - "/* nothing */"
    - "a.deallocate(p, 1);"
compile:
  harness: |
    struct Tick {                                   // counts live objects
        int v;  int* live;
        constexpr Tick(int x, int* l) : v(x), live(l) { ++*live; }
        constexpr Tick(const Tick& o) : v(o.v), live(o.live) { ++*live; }
        constexpr ~Tick() { --*live; }
    };
    consteval bool test() {
        int live = 0;
        bool ok;
        {
            Pool<Tick, 2> p;
            Tick* x = p.make(Tick(1, &live));
            Tick* y = p.make(Tick(2, &live));
            p.release(x);
            ok = live == 1;
            Tick* z = p.make(Tick(3, &live));      // the freed slot is handed out again
            ok = ok && z == x && z->v == 3 && y->v == 2 && live == 2;
            p.release(y);  p.release(z);
        }
        return ok && live == 0;
    }
    static_assert(test());
    int main() {}
requires:
  - algo-systems/ll-freelist-pool
  - cpp-essentials/storage-destroy-at-pop
refs:
  - https://en.cppreference.com/w/cpp/memory/destroy_at
  - https://timsong-cpp.github.io/cppwp/n4950/allocator.members#10
elaborate: A caller releases the same order twice. What happens to the free list, and what would a generation count per slot catch?
---

The interviewer: "Write a typed object pool for orders." It allocates
`N` slots once and threads a free list of slot indices through `next`
(`N` ends the list). `make` copies an object into a free slot. Complete
`release` so the pool can hand that slot out again. The test runs in a
constant expression.

```cpp
#include <memory>
template <class T, int N> struct Pool {                  // pre: at most N objects at once
  std::allocator<T> a;  T* slot = a.allocate(N);
  int next[N], head = 0;
  constexpr Pool() { for (int i = 0; i < N; ++i) next[i] = i + 1; }
  constexpr ~Pool() { a.deallocate(slot, N); }           // pre: every object released
  constexpr T* make(const T& x) { int i = head;  head = next[i];  return std::construct_at(slot + i, x); }
  constexpr void release(T* p) { int i = int(p - slot);  {{c1::std\::destroy_at(p);}}  next[i] = head;  head = i; }
};
```

---

**`std::destroy_at(p)`: end the object's lifetime before its slot goes
back on the free list.** A slot is raw storage between uses: `make`
starts an object with `construct_at`, so `release` must run its
destructor.

- Doing nothing never runs `~T`, so whatever the order owns leaks (the
  test's live count never returns to 0).
- `a.deallocate(p, 1)` treats the slot as its own allocation, but
  `deallocate` needs exactly a pointer and count that `allocate`
  returned. Releasing the second slot passes `slot + 1`, which g142
  reports as storage that was never allocated.

Production pools typically use `alignas(T) std::byte` slots and placement new;
`std::allocator` is used here only so the compiler can check lifetimes.
