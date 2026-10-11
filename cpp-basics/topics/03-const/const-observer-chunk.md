---
id: const-observer-chunk
kind: chunk
version: 1
level: 1
tags: [const, classes, member-functions, idioms]
expose_ms: 7000
compile:
  harness: |
    int main() {}
requires:
  - const-member-on-const-ref
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions#Member_functions_with_cv-qualifiers
---

```cpp
class Account {
  long cents_ = 0;
public:
  long balance() const { return cents_; }
  void deposit(long c) { cents_ += c; }
};
```

---

**Observers `const`, mutators not.** `balance()` only reads, so it carries
the trailing `const` and works on a `const Account&`; `deposit` changes
the state, so it does not, and the compiler stops anyone calling it
through a read-only reference. Forget the `const` on an observer and every
function taking `const Account&` loses access to it.
