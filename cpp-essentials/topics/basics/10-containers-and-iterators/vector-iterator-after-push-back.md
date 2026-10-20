---
id: vector-iterator-after-push-back
kind: basic
version: 1
level: 2
tags: [containers, vector, iterators, misconception]
requires:
  - iter-size-vs-capacity
  - iter-iterator-basics
  - ub-definition
elaborate: Say how you would change this code so the last read is safe, and why your version survives the growth.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://en.cppreference.com/w/cpp/container#Iterator_invalidation
---

Many expect an iterator to keep naming its element while the vector grows.

```cpp
std::vector<int> v{1, 2};
auto it = v.begin();
v.push_back(3);
int x = *it;
```

`v.capacity()` is 2 before the `push_back`.

## What does the last line do?

---

**Undefined behaviour: `push_back` moved the elements to a new buffer.**

Size equalled capacity, so the vector allocated a bigger buffer, moved 1
and 2 into it and freed the old one. `it` still points into the freed
buffer. The read may even yield 1, so a test can miss it; an index such as
`v[0]` stays valid.
