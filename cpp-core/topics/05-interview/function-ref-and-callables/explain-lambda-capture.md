---
id: callables-explain-lambda-capture
kind: explain
version: 1
level: 4
tags: [callables]
requires:
  - trace-copy-vs-reference
refs:
  - https://en.cppreference.com/w/cpp/language/lambda
---
Explain lambda captures to a senior interviewer: by value versus by
reference, and how a capture-by-reference can dangle.
---
- [ ] `[x]` captures by value: a copy of `x` at the point the lambda is created, independent of `x`'s later lifetime
- [ ] `[&x]` captures by reference: the lambda stores a reference, and reading it after `x` is destroyed is undefined behaviour
- [ ] `[=]`/`[&]` are implicit default captures — capture everything used, by value or by reference respectively
- [ ] The classic dangling case: a lambda capturing local variables by reference outlives the scope it was created in, e.g. stored, returned, or posted to another thread
- [ ] `mutable` is needed to modify a by-value capture inside `operator()`, since the call operator is `const` by default
- [ ] Capturing `this` by reference (implicit in `[=]` pre-C++20, or `[this]`) means member access can dangle if the object is destroyed first; `[*this]` captures the object by value instead
- [ ] Init-captures (`[y = std::move(x)]`) let you move into the lambda or compute a captured value, not just name an existing variable
- [ ] A lambda passed to something that may run asynchronously should prefer by-value or init-captures over by-reference, for exactly this reason
