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
elaborate: Say what you would run to make the lookup fast again, and what you would change so the nightly job stops causing this.
---
A nightly job updated every row of a Postgres table `users`. Since then
`SELECT email FROM users WHERE id = 42`, served by the `id` index, has
been several times slower, and it stays slow. An interviewer asks where
the extra work comes from. Answer aloud.
---
- [ ] Non-HOT updates added an entry to every index, so the lookup for 42 now visits several `id` entries
- [ ] HOT updates added no index entry, so the lookup follows a HOT chain within the page to the new version
- [ ] Every version reached is checked against the snapshot, so the work grows with versions, not rows
- [ ] VACUUM cannot remove versions an open snapshot might still see, such as an idle `REPEATABLE READ` session's
- [ ] The bloated index and heap span more pages, so fewer fit in the buffer pool and lookups miss to disk
