---
id: hash-chaining-vs-open-addressing
kind: basic
version: 1
level: 3
tags: [hashing, memory-hierarchy, containers]
requires:
  - foundations-cache-cost-model
  - hashing-open-addressing
  - cpp-essentials/ptr-holds-an-address
  - cpp-essentials/class-struct-members
refs:
  - https://abseil.io/about/design/swisstables
  - https://en.cppreference.com/w/cpp/container/unordered_map
elaborate: "Your hottest map: is it node-based or flat, and how many cache lines does one hit touch?"
---

## A lookup that hits: why does a chained table typically pay one more cache miss than an open-addressed one?

```cpp
struct Node { int key; int val; Node* next; };
Node* buckets[N];                    // chaining

struct Slot { int key; int val; };
Slot slots[N];                       // open addressing
```

---

**Chaining follows a pointer to a separately allocated node; open addressing finds the key in place.**

The bucket array gives only a pointer, so the key costs a second load,
whose address comes from the first, into wherever `new` put the node. An
open-addressed probe reads the slot and its neighbours from the line it
already loaded.
