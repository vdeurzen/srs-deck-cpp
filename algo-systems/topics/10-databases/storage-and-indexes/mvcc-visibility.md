---
id: db-mvcc-visibility
kind: code
version: 1
level: 4
tags: [databases, concurrency, transactions, postgres]
input: chips
choices:
  c1:
    - "committed(s, v.xmin) && !committed(s, v.xmax)"
    - "committed(s, v.xmin)"
    - "!committed(s, v.xmax)"
    - "committed(s, v.xmin) || !committed(s, v.xmax)"
compile:
  harness: |
    constexpr Snapshot s = 0b1110;                 // transactions 1, 2, 3 committed
    static_assert( visible({1, 0}, s));            // live row
    static_assert(!visible({1, 3}, s));            // deleted by a committed transaction
    static_assert( visible({1, 5}, s));            // its deleter is not in the snapshot
    static_assert(!visible({4, 0}, s));            // created after the snapshot
    int main() {}
requires:
  - db-mvcc
refs:
  - https://www.postgresql.org/docs/current/mvcc-intro.html
  - https://www.vldb.org/pvldb/vol10/p781-Wu.pdf
elaborate: A transaction must also see its own uncommitted writes. Which case would you add to this test for that?
---

A version records `xmin`, the transaction that created it, and `xmax`,
the one that deleted or replaced it (0 if none). A snapshot holds the
transactions committed when it was taken. Complete the visibility test.

```cpp
#include <cstdint>
struct Version { int xmin, xmax; };
using Snapshot = std::uint64_t;          // bit t set: transaction t had committed
constexpr bool committed(Snapshot s, int t) { return t != 0 && (s >> t & 1); }

constexpr bool visible(Version v, Snapshot s) {
  return {{c1::committed(s, v.xmin) && !committed(s, v.xmax)}};
}
```

---

**Visible iff its creator had committed and its deleter had not.** A
version deleted by a transaction the snapshot never saw commit is still
live *for this reader*: that is how an old snapshot keeps reading rows a
newer transaction has already removed. Real Postgres adds in-progress
and own-transaction cases on top of this core.
