---
id: vec-zero-capacity-growth
kind: code
version: 1
level: 2
tags: [vector, growth, implement-std]
input: chips
choices:
  c1:
    - "cap == 0 ? 1 : 2 * cap"
    - "2 * cap"
    - "cap + cap / 2"
    - "cap + 1"
    - "cap ? cap + cap / 2 : 1"
compile:
  harness: |
    #include <memory>
    #include <string>
    consteval bool push_17() {               // starts like a default-constructed vector
        std::allocator<std::string> a;
        std::string* b = nullptr;
        std::size_t n = 0, cap = 0, grows = 0;
        for (char c = 'a'; c != 'r'; ++c) {
            if (n == cap) {                  // full: move everything to a bigger buffer
                std::size_t m = next_capacity(cap);
                std::string* nb = a.allocate(m);
                for (std::size_t i = 0; i != n; ++i) std::construct_at(nb + i, std::move(b[i]));
                std::destroy(b, b + n);
                if (b) a.deallocate(b, cap);
                b = nb;  cap = m;  ++grows;
            }
            std::construct_at(b + n, std::string(20, c));
            ++n;
        }
        bool ok = n == 17 && b[16][0] == 'q' && grows <= 6;   // geometric: 1 2 4 8 16 32
        std::destroy(b, b + n);  a.deallocate(b, cap);
        return ok;
    }
    static_assert(push_17());
    int main() {}
requires:
  - linear-dynamic-array-growth
  - cpp-essentials/expr-conditional-operator
  - stl-size-t-unsigned
elaborate: Say to an interviewer what goes wrong with a growth rule that has a fixed point, and where else a starting value of zero breaks a multiply.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_vector.h
---

You're implementing `push_back`. When `size == cap` it allocates
`next_capacity(cap)` slots and moves the elements across. A
default-constructed vector starts with `cap == 0` and no buffer.
Complete `next_capacity` so growth stays geometric (`constexpr` lets
the compiler run it).

```cpp
#include <cstddef>
constexpr std::size_t next_capacity(std::size_t cap) {
    return {{c1::cap == 0 ? 1 : 2 * cap}};
}
```

---

**Doubling has a fixed point at zero.** `2 * cap` and `cap + cap / 2`
both return 0 for an empty vector: `allocate(0)`, then a construct past
the end of a zero-slot buffer, undefined behaviour. Guarding
zero isn't enough for 1.5: `1 + 1 / 2` is 1 again, so it stalls there.
`cap + 1` works from zero but reallocates on every push: O(n²) in total.

libstdc++ computes `size() + max(size(), 1)`, so 0 → 1 → 2 → 4; MSVC
grows by 1.5 but never to less than the size it needs. Both are implementation
choices; the standard asks only for amortised O(1) `push_back`.
