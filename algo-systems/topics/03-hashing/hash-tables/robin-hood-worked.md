---
id: hash-robin-hood-worked
kind: basic
version: 1
level: 4
tags: [hashing, open-addressing, worked-example]
requires:
  - hash-robin-hood
refs:
  - https://cs.uwaterloo.ca/research/tr/1986/CS-86-14.pdf
---

Robin Hood insert of 17 (home slot `17 % 8 = 1`) into an 8-slot table
holding 1 in slot 1, 9 in slot 2 and 2 in slot 3. PSL is a key's
distance from its home slot.

```
slot  occupant (PSL)  carried (PSL)  action
1     1 (0)           17 (0)         0 ≥ 0: walk on
2     9 (1)           17 (1)         1 ≥ 1: walk on
3     2 (1)           17 (2)         1 < 2: swap, carry 2
4     empty           2 (2)          place 2
```

## Row 3: why does 17 take slot 3 from 2?

---

**2 sits nearer its home than 17 would: the key closer to home yields.**

After the swap both keys have PSL 2, instead of 2 staying at PSL 1 and
17 going on to PSL 3. The worst probe length shrinks while the total
stays the same, and PSLs along the run still rise by at most 1.
