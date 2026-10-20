---
id: chunks-erase-remove
kind: cloze
version: 2
level: 2
tags: [idioms, containers]
requires:
  - stdalgo-remove-if-keeps-size
  - containers-erase-invalidates-iterator
elaborate: Say aloud what `v.erase(std::remove_if(v.begin(), v.end(), pred))`, with the second argument left out, would remove instead.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/remove
  - https://en.cppreference.com/w/cpp/container/vector/erase
  - https://en.cppreference.com/w/cpp/container/vector/erase2
---

`v.erase(first, last)` removes the elements in `[first, last)`. Remove
every element of the `std::vector<int> v` for which `pred` is true:

```cpp
v.erase(std::remove_if(v.begin(), v.end(), pred), {{c1::v.end()}});
```

---

**The erase-remove idiom.** `remove_if` moves the kept elements to the
front and returns the new logical end; `erase` then cuts everything from
there to `v.end()`. Without that second argument `erase` removes one
element only. In C++20, `std::erase_if(v, pred)` does both steps.
