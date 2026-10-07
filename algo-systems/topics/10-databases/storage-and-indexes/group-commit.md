---
id: db-group-commit
kind: code
version: 1
level: 4
tags: [databases, durability, throughput]
input: chips
choices:
  c1: ["fsyncs_per_s * clients", "fsyncs_per_s", "fsyncs_per_s / clients", "1'000'000 / clients"]
compile:
  harness: |
    static_assert(commits_per_s(2'000, 1)  == 500);       // one client, 2 ms fsync
    static_assert(commits_per_s(2'000, 16) == 8'000);
    static_assert(commits_per_s(100, 8)    == 80'000);    // fast NVMe flush
    int main() {}
requires:
  - db-commit-one-fsync
refs:
  - https://www.postgresql.org/docs/current/wal-configuration.html
  - https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf
elaborate: A benchmark runs one client against your database. What does its commit rate tell you about production with 200 connections?
---

A commit is acknowledged once a log `fsync`, taking `fsync_us`, covers
its records. The engine uses group commit. Complete the best-case commit
rate for `clients` sessions committing concurrently.

```cpp
constexpr int commits_per_s(int fsync_us, int clients) {
  const int fsyncs_per_s = 1'000'000 / fsync_us;
  return {{c1::fsyncs_per_s * clients}};
}
```

---

**One fsync makes every waiting commit durable, so the device bounds fsyncs, not commits: sync rate × group size.**
A single client gets 500 commits/s from a 2 ms flush; sixteen get up to
8 000 from the same disk. That is why adding concurrency raises commit
throughput on a slow-sync device, and why a one-client benchmark says
almost nothing.
