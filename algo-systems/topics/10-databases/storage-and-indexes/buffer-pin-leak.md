---
id: db-buffer-pin-leak
kind: basic
version: 1
level: 3
tags: [databases, caching, raii]
requires:
  - db-buffer-pool
  - cpp-core/raii-owner-in-destructor
refs:
  - https://15445.courses.cs.cmu.edu/
  - https://github.com/postgres/postgres/blob/master/src/backend/storage/buffer/README
---

## Under steady load, a hand-written buffer pool starts failing with "no evictable frame". The pool is big enough. What is the likely bug?

---

**A leaked pin: some path never unpins, so its frame can never be evicted.**

The pin count is a reference count. An early return or exception that
skips `unpin` shrinks the usable pool by a frame each time. The fix is a
page guard whose destructor unpins.
