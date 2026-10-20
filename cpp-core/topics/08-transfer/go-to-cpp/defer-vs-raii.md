---
id: transfer-defer-vs-raii
kind: basic
version: 2
level: 2
tags: [transfer, misconception, raii]
requires:
  - cpp-essentials/raii-owner-in-destructor
  - raii-scope-exit-order
elaborate: Where in your own code would an extra `{ }` block release a lock or a file earlier than the end of the function?
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/language/storage_duration#Automatic_storage_duration
---

Many expect every file opened in this loop to stay open until `process`
returns. `File`'s destructor closes its file.

```cpp
void process(const std::vector<std::string>& paths) {
    for (const auto& p : paths) {
        File f{p};
        f.consume();
    }
    log_done();
}
```

## When does each `File` here close?

---

**At the end of each iteration: `f` is destroyed when its block ends,
before the next file opens.**

Go's `defer` is scoped to the function, so the habit expects cleanup at
`return`. A destructor is scoped to the enclosing block, any block: one
file is open at a time, and all are closed before `log_done()`.
