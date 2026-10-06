---
id: ll-memory-orders
kind: cloze
version: 1
level: 5
tags: [low-latency, concurrency, atomics]
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://www.kernel.org/doc/Documentation/memory-barriers.txt
---

`memory_order_relaxed` guarantees atomicity and nothing else: the
operation cannot tear, but it may be reordered with any other access,
so it is right for {{c1::a counter whose value nobody uses to order
other data::statistics, reference counts on increment}} and wrong for
publication.

A **release** store and an **acquire** load on the same variable form a
pair: everything sequenced before the release in the storing thread
{{c2::happens-before::becomes visible to}} everything after the
acquire in the loading thread, *provided* the acquire actually reads
the value that release wrote. That is the mechanism behind publishing
a buffer, a queue slot, or a pointer to a freshly built object — the
data itself needs no atomics at all.

`memory_order_seq_cst` adds a single {{c3::total order::one global
sequence all threads agree on}} over all such operations, which is what
Dekker-style algorithms and most "obviously correct" reasoning need. It
is the default for a reason, and on x86 a seq_cst *store* costs a
locked instruction or a fence (~20+ cycles), while acquire/release
loads and stores are {{c4::plain MOVs::x86 is already TSO, so no fence instruction
is emitted}} — so on that architecture the cost is entirely in the store side
and in what the *compiler* is allowed to reorder.

Two rules keep this survivable. Write the pairing down at the
declaration: every relaxed access needs a comment saying why no
ordering is required. And remember that a data race is
{{c5::undefined behaviour::not "a stale value" — the whole
*execution* loses meaning, including code that ran before the race}}, so "it works on x86" is not evidence — use a
thread sanitiser, and reach for seq_cst until a profile says otherwise.
