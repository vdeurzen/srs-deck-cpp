---
id: db-trace-redo-lsn
kind: trace
version: 1
level: 4
tags: [databases, durability, recovery, tracing]
requires:
  - db-page-lsn
probes:
  1: { "value[0]": "5", "value[1]": "7", applied: "0" }
  2: { "value[0]": "9", "value[1]": "7", applied: "1" }
  3: { "value[0]": "9", "value[1]": "10", applied: "2" }
refs:
  - https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf
---

Two pages started at 0. Each log record adds `delta` to one page. Page 0
was written to disk after LSN 10, page 1 after LSN 11; then the system
crashed. Redo replays the whole log.

```cpp
struct Rec { int lsn, page, delta; };
Rec wal[] = {{10, 0, +5}, {11, 1, +7}, {12, 0, +4}, {13, 1, +3}};
int value[2]    = {5, 7};      // on disk at the crash
int page_lsn[2] = {10, 11};    // the LSN each page had reached when written
int applied = 0;

void redo(Rec r) {
  if (r.lsn <= page_lsn[r.page]) return;     // already in the page
  value[r.page] += r.delta;
  page_lsn[r.page] = r.lsn;
  ++applied;
}

int main() {
  redo(wal[0]); redo(wal[1]);   // @1
  redo(wal[2]);                 // @2
  redo(wal[3]);                 // @3
}
```

---

The first two records are already in their pages, so the LSN test skips
them: nothing changes. Records 12 and 13 are newer than their pages and
are applied, giving the values the system had before the crash, 9 and 10.
Without the test, replaying `+5` and `+7` again would give 14 and 17:
an increment is not idempotent, the page LSN makes its replay so.
Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
