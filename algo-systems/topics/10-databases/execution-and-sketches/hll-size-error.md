---
id: db-hll-size-error
kind: basic
version: 1
level: 4
tags: [databases, sketches, probabilistic]
requires:
  - db-hyperloglog
refs:
  - http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf
  - https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/
---

## Redis's HyperLogLog has 16 384 registers of 6 bits. What standard error does that give?

---

**About 0.81 %: the error is 1.04/√m, and √16 384 = 128.**

That is 12 KiB, the same whether the set holds a thousand or a billion
elements: the size depends only on `m`. Halving the error takes four
times the registers.
