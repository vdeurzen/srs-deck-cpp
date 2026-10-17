---
id: threads-scoped-lock-two-mutexes
kind: code
version: 1
level: 2
tags: [concurrency, threads, mutex]
input: chips
choices:
  c1: ["std::scoped_lock", "std::lock_guard", "std::unique_lock"]
compile:
  harness: |
    int main() {}
requires:
  - threads-data-race-is-ub
refs:
  - https://en.cppreference.com/w/cpp/thread/scoped_lock
  - https://en.cppreference.com/w/cpp/thread/lock
---

Two threads transfer between the same two accounts at once, one
calling `transfer(a, b, 5)` and the other `transfer(b, a, 7)`.
Complete the lock so the function cannot deadlock.

```cpp
#include <mutex>
struct Account { std::mutex m; int balance = 0; };
void transfer(Account& from, Account& to, int amount) {
  {{c1::std\::scoped_lock}} lk(from.m, to.m);
  from.balance -= amount;
  to.balance += amount;
}
```

---

**`std::scoped_lock` takes any number of mutexes and acquires them
with `std::lock`'s deadlock-avoidance algorithm**, so two callers
naming the same pair in opposite orders cannot each hold one and wait
for the other. `std::lock_guard` and `std::unique_lock` guard exactly
one mutex — with two arguments neither deduces, and locking the pair by
hand in argument order is the classic lock-ordering deadlock.
