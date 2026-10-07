---
id: db-hll-merge
kind: basic
version: 1
level: 4
tags: [databases, sketches, distributed]
requires:
  - db-hll-register-update
refs:
  - http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf
  - https://redis.io/docs/latest/commands/pfmerge/
---

## Each of 50 shards kept a HyperLogLog of its user ids. How do you count distinct users across all shards?

---

**Take the register-wise maximum of the 50 sketches, then estimate once.**

The result is exactly the sketch one HLL would have built from all 50
streams: the merge loses nothing. Adding the 50 estimates counts a user
once per shard it appears on.
