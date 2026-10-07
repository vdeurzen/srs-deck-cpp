---
id: seq-swap-and-pop
kind: code
version: 1
level: 2
tags: [containers, arena, complexity]
requires:
  - seq-array-insert-shift
input: chips
choices:
  c1:
    - "data[i] = data[--size]"
    - "data[i] = data[size--]"
    - "data[i] = data[size - 1]"
    - "std::shift_left(data.begin() + i, data.begin() + size--, 1)"
compile:
  harness: |
    constexpr Pool after_remove() {
      Pool p{{10, 20, 30, 40}, 4};
      p.remove_at(1);
      return p;
    }
    static_assert(after_remove().size == 3);
    static_assert(after_remove().data[0] == 10);
    static_assert(after_remove().data[1] == 40);   // index 1 now names 40
    static_assert(after_remove().data[2] == 30);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/container/vector/erase2
  - https://en.cppreference.com/w/cpp/algorithm/shift
---

Order does not matter in this pool, so removal must be O(1). Complete
`remove_at`.

```cpp
#include <algorithm>
#include <array>

struct Pool {
  std::array<int, 8> data{};
  int size = 0;
  constexpr void remove_at(int i) { {{c1::data[i] = data[--size]}}; }
};
```

---

**Swap-and-pop: move the last element into the hole and shrink.** One
copy instead of shifting the tail. `data[size--]` reads one past the last
element; `data[size - 1]` forgets to shrink; `shift_left` keeps order at
O(n) cost — what `std::erase_if` does when order matters.

The cost is in the harness: index 1 named 20 and now names 40, and
index 3 names nothing. Anyone holding a plain index sees a different
element with no error — the bug generation counters exist to catch.
