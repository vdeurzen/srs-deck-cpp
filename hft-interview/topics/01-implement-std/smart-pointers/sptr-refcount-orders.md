---
id: sptr-refcount-orders
kind: code
version: 1
level: 4
tags: [smart-pointers, atomics, memory-model, implement-std]
input: chips
choices:
  c1:
    - "std::memory_order_acq_rel"
    - "std::memory_order_release"
    - "std::memory_order_acquire"
    - "std::memory_order_relaxed"
compile:
  harness: |
    struct FakeAtomic {                              // records the decrement's order
        long v;
        std::memory_order last_sub = std::memory_order_seq_cst;
        constexpr long fetch_add(long k, std::memory_order) { long o = v; v += k; return o; }
        constexpr long fetch_sub(long k, std::memory_order m) {
            last_sub = m;  long o = v;  v -= k;  return o;
        }
    };
    consteval bool test() {
        Ctrl<int, FakeAtomic> c{{1}, new int(7)};
        c.retain();
        c.release();
        c.release();                                 // the last owner deletes
        return c.strong.v == 0 && c.strong.last_sub == std::memory_order_acq_rel;
    }
    static_assert(test());
    int main() {}
requires:
  - cpp-essentials/smart-pointers-shared-ptr-control-block
  - cpp-essentials/atomics-synchronizes-with
refs:
  - https://www.boost.org/doc/libs/release/libs/atomic/doc/html/atomic/usage_examples.html#boost_atomic.usage_examples.example_reference_counters
  - https://github.com/llvm/llvm-project/blob/main/libcxx/include/__memory/shared_count.h
  - https://en.cppreference.com/w/cpp/atomic/memory_order#Release_sequence
  - https://timsong-cpp.github.io/cppwp/n4950/intro.races#5
---

You're implementing `shared_ptr`'s strong count. Other threads may use
the object and drop their owners at any time; the owner that takes the
count to zero deletes it. Choose the decrement's memory order.

```cpp
#include <atomic>
template <class T, class A = std::atomic<long>>
struct Ctrl {
    A strong{1};
    T* obj;
    constexpr void retain() { strong.fetch_add(1, std::memory_order_relaxed); }
    constexpr void release() {
        if (strong.fetch_sub(1, {{c1::std\::memory_order_acq_rel}}) == 1) delete obj;
    }
};
```

---

**Every decrement releases; the one that reaches zero must also
acquire.** Each owner's last writes to the object must happen before
the `delete` in whichever thread runs it: the release half publishes
them, the acquire half in the deleting thread receives them. One
acquire is enough because every decrement is a read-modify-write: the
chain of them after each owner's release is that release's *release
sequence*, so the final decrement synchronizes with every earlier one.
`release` alone lets the destructor miss another thread's writes;
`acquire` alone publishes nothing.

Boost.Atomic's example writes `release` plus an `acquire` fence inside
the `if`, paying for acquire only once; libc++ and libstdc++ both use
`acq_rel` here. The `A` parameter lets a constexpr stand-in replace
`std::atomic`, which is not usable in constant evaluation.
