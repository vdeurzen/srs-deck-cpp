---
id: threads-thread-destructor-joinable
kind: basic
version: 1
level: 1
tags: [concurrency, threads, lifetimes]
refs:
  - https://en.cppreference.com/w/cpp/thread/thread/~thread
  - https://en.cppreference.com/w/cpp/thread/jthread
---

## A `std::thread` object is destroyed while it is still joinable. What happens?

---

**`std::terminate` is called.**

Neither default is safe — an implicit `join` can deadlock, an implicit
`detach` leaves a thread using destroyed locals — so `std::thread`
refuses to choose. `std::jthread` chooses: its destructor calls
`request_stop()` and then `join()`, which is why it is the type to
write now.
