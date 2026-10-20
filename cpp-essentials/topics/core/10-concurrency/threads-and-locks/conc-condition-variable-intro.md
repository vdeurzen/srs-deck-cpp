---
id: conc-condition-variable-intro
kind: basic
version: 1
level: 1
tags: [concurrency, threads, condition-variable]
requires:
  - conc-mutex-takes-turns
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable/wait
  - https://en.cppreference.com/w/cpp/thread/condition_variable
elaborate: Say in one sentence why the consumer could not simply loop on `has_job()` with `m` locked.
---

A producer adds work with `++jobs` under `m`, then calls
`cv.notify_one()`.

```cpp
std::mutex m;
std::condition_variable cv;
int jobs = 0;
bool has_job() { return jobs > 0; }

void consume() {
    std::unique_lock<std::mutex> lk(m);   // locks m until lk is destroyed
    cv.wait(lk, has_job);
    --jobs;
}
```

## `jobs` is 0 when the consumer reaches `cv.wait`. What does `wait` do?

---

**Unlocks `m` and sleeps; each wake-up relocks `m` and rechecks `has_job()`.**

Releasing `m` is what lets the producer take it to add a job. `wait`
returns only when `has_job()` is true with `m` held, so `--jobs` never
runs on 0, even after a wake-up that came with no job.
