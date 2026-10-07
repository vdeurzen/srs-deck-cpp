---
id: hash-chaining-vs-open-addressing
kind: basic
version: 1
level: 3
tags: [hashing, memory-hierarchy, containers]
requires:
  - foundations-cache-cost-model
refs:
  - https://abseil.io/about/design/swisstables
  - https://en.cppreference.com/w/cpp/container/unordered_map
elaborate: "Your hottest map: is it node-based or flat, and how many cache lines does one hit touch?"
---

## A lookup that hits: why does a chained table typically pay one more cache miss than an open-addressed one?

```
chaining:   buckets[h] ──► node{key,val,next} ──► node…
open addr.: slots[h]  = {key,val}  (neighbours in the same line)
```

---

**Chaining follows a pointer to a separately allocated node; open addressing finds the key in place.**

The bucket array gives only a pointer, so the key costs a second,
dependent load into wherever the allocator put the node. An
open-addressed probe reads the slot and its neighbours from the line it
already loaded.
