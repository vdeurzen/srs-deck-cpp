---
id: stl-multiset-erase-one
kind: basic
version: 1
level: 2
tags: [stl, sliding-window, misconception, lc-480]
requires:
  - std-multiset-keeps-dupes
  - cpp-essentials/iter-end-one-past
refs:
  - https://leetcode.com/problems/sliding-window-median/
  - https://en.cppreference.com/w/cpp/container/multiset/erase
elaborate: If the value might be absent, what must the fix check?
---

Sliding Window Median (LC 480): return the median of every window of `k`
consecutive values. A solution keeps the window in a
`std::multiset<int>`. The value 5 leaves the window, and many expect
`erase(5)` to drop it the way it entered, as one element:

```cpp
std::multiset<int> window{2, 5, 5, 7};
window.erase(5);
```

## What does `window` hold now?

---

**`{2, 7}`: `erase(key)` removes every element equal to the key.** It
returns the number removed (2). To drop one copy, erase by iterator:

```cpp
window.erase(window.find(5));   // {2, 5, 7}
```

`find` must not return `end()`: erasing `end()` is undefined
behaviour. Verified with GCC 16.2.
