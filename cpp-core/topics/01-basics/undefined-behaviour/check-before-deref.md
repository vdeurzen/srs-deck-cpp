---
id: ub-check-before-deref
kind: code
version: 1
level: 1
tags: [undefined-behaviour, pointers]
requires:
  - cpp-essentials/ub-definition
  - ub-constexpr-rejects-ub
input: chips
choices:
  c1:
    - "if (p == nullptr || n == 0) return 0;"
    - "if (n == 0) return 0;"
    - "if (*p == 0 || n == 0) return 0;"
    - "if (p == nullptr && n == 0) return 0;"
compile:
  harness: |
    constexpr int one[] = {1};
    static_assert(first_or_zero(one, 1) == 1);
    static_assert(first_or_zero(nullptr, 0) == 0);
    static_assert(first_or_zero(nullptr, 3) == 0);   // a null range whose count is stale
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://en.cppreference.com/w/cpp/language/constant_expression
---

`first_or_zero` returns the first element of a range, or `0` for an empty
one. Complete the guard so the function never reads through a null
pointer, whatever arguments it is given.

```cpp
constexpr int first_or_zero(const int* p, int n) {
  {{c1::if (p == nullptr || n == 0) return 0;}}
  return *p;
}
```

---

The guard has to be evaluated *before* the operation it protects, and
has to cover every case that would make that operation undefined: here
both "no pointer" and "no elements". Checking `n` alone trusts a count
the pointer contradicts; `*p == 0` dereferences before testing; `&&` lets
a null pointer with a stale count through. In a `constexpr` function the
compiler catches each of them: a null dereference is core-language
undefined behaviour, and an evaluation that would hit core-language
undefined behaviour is not a constant expression, so a constant-evaluated
call with a null pointer fails to compile.
