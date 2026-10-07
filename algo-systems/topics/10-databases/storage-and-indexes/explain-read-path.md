---
id: db-explain-read-path
kind: explain
version: 2
level: 5
tags: [databases, storage, indexes, postgres]
requires:
  - db-hot-update
  - db-mvcc-long-transaction
  - db-buffer-pool
refs:
  - https://www.postgresql.org/docs/current/storage-hot.html
  - https://www.postgresql.org/docs/current/routine-vacuuming.html
---
A nightly job updated every row of a Postgres table `users`. Since then
`SELECT email FROM users WHERE id = 42`, served by the `id` index, has
been several times slower, and it stays slow. Explain where the extra
work comes from.
---
- [ ] Updates that were not HOT (an indexed column changed, or the page had no room) added an entry to every index, so the `id` index grew and the lookup now visits several entries for 42
- [ ] HOT updates added no index entry, so the lookup lands on the old version and follows the HOT chain within the heap page to the new one
- [ ] Every version reached is tested against the snapshot (`xmin` committed, `xmax` not), so the work grows with the number of versions, not of rows
- [ ] The dead versions stay because VACUUM cannot remove any version an open snapshot might still see, such as an idle `REPEATABLE READ` session's
- [ ] The bloated index and heap span more pages, so fewer fit in the buffer pool and the lookup now misses to disk
