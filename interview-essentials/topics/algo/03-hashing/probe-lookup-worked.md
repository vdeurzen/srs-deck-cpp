---
id: hashing-probe-lookup-worked
kind: basic
version: 1
level: 2
tags: [hashing, open-addressing, worked-example]
requires:
  - hashing-open-addressing
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
---

## A linear-probing table: 8 slots, `0` marks empty, home slot `key % 8`, each step moves to the next slot (wrapping after 7). Insert and lookup walk the same sequence.

```text
slot:  0  1  2  3   4   5   6  7
key:   0  0  0  3  11  19   0  7
```

Lookup of 27 (home slot 27 % 8 = 3):

| step | slot | holds | action |
|---|---|---|---|
| 1 | 3 | 3 | not 27: step on |
| 2 | 4 | 11 | not 27: step on |
| 3 | 5 | 19 | not 27: step on |
| 4 | 6 | empty | stop: 27 is absent |

Why may the lookup stop at slot 6 without looking at slot 7?

---

**Had 27 been inserted, it would sit in slot 6 or before it.**

Insert walks the same steps from slot 3 and takes the first empty slot.
So a present key always sits before the first gap after its home slot,
and reaching that gap proves the key is absent.
