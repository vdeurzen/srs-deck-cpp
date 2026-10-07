---
id: transfer-defer-vs-raii
kind: basic
version: 2
level: 2
tags: [transfer, misconception, raii]
requires:
  - raii-owner-in-destructor
  - raii-scope-exit-order
elaborate: In Go, where would you move a `defer f.Close()` that sits inside a loop, and what in C++ makes that move unnecessary?
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/language/storage_duration#Automatic_storage_duration
---

## In Go, `defer f.Close()` inside this loop closes every file when `process` returns. `File`'s destructor closes its file. When does each `File` here close?

```cpp
void process(const std::vector<std::string>& paths) {
    for (const auto& p : paths) {
        File f{p};
        f.consume();
    }
    log_done();
}
```

---

**At the end of each iteration: `f` is destroyed when its block ends,
before the next file opens.**

`defer` is scoped to the function, so the Go habit expects cleanup at
`return`. A destructor is scoped to the enclosing block, any block: one
file is open at a time, and all are closed before `log_done()`.
