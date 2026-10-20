---
id: err-throw-catch-intro
kind: basic
version: 1
level: 1
tags: [exceptions, control-flow, worked-example, foundations]
requires:
  - const-ref-names-caller
refs:
  - https://en.cppreference.com/w/cpp/language/throw
  - https://en.cppreference.com/w/cpp/language/try
---

`std::invalid_argument` is a standard exception type.

```cpp
int half(int n) {
    if (n % 2 != 0) throw std::invalid_argument("odd");
    return n / 2;
}

int status = 0;
try {
    half(3);
    status = 1;
} catch (const std::invalid_argument&) {
    status = 2;
}
```

| step | what happens | `status` |
| --- | --- | --- |
| 1 | `half(3)`: 3 is odd, so `throw` | 0 |
| 2 | `return n / 2;` skipped | 0 |
| 3 | `status = 1;` skipped | 0 |
| 4 | `catch` type matches: `status = 2;` | 2 |

## Step 3 skips `status = 1;` although `half(3)` was called from the line before. Why?

---

**`throw` leaves the whole `try` block at once; control resumes in a matching `catch`.**

A thrown exception never returns to the caller's next line. It abandons
every statement between the `throw` and a handler, here the rest of
`half` and of the `try` block, then runs the first `catch` whose type
matches.
