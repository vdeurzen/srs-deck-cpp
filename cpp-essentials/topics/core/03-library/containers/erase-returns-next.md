---
id: containers-erase-returns-next
kind: cloze
version: 1
level: 2
tags: [containers, iterators, idioms]
requires:
  - containers-erase-invalidates-iterator
elaborate: Say, as to an interviewer, why this loop's header has no `++it`.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/erase
---

Remove every `0` from the `std::vector<int> v` in one pass:

```cpp
for (auto it = v.begin(); it != v.end();) {
    if (*it == 0)
        {{c1::it = v.erase(it)::one statement}};
    else
        ++it;
}
```

---

**`erase` returns an iterator to the element after the erased one**, so
assigning it moves on without touching the dead `it`. Each branch
advances exactly once, so the header has no increment.
