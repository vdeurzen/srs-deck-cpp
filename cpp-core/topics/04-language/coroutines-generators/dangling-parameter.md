---
id: coroutines-generator-dangling-parameter
kind: basic
version: 1
level: 4
tags: [coroutines, lifetimes, misconception]
elaborate: Which parameter types in your own coroutines are secretly references — string_view, span, a lambda taken by const&? Pick one and decide whether the caller can really keep it alive.
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
  - https://en.cppreference.com/w/cpp/language/coroutines
---

## "A coroutine copies its parameters into the frame, so `auto g = chars(std::string{"hi"});` followed by `for (char c : g)` is fine — the frame owns the string." Where does this go wrong?

---

The copy is real, but it copies the *parameter*, and the parameter here
is a reference:

```cpp
std::generator<char> chars(const std::string& s) {
  for (char c : s) co_yield c;
}

auto g = chars(std::string{"hi"});   // temporary dies at the ';'
for (char c : g) { /* use-after-free */ }
```

The frame stores the reference; the `std::string` temporary it refers
to is destroyed at the end of the full-expression that called `chars` —
and because the generator is lazy, the body has not run a single
statement by then. (GCC 16 with `-fsanitize=address` reports a
stack-use-after-scope on the first `begin()`.)

Writing the call inline, `for (char c : chars(std::string{"hi"}))`, is
*not* a counter-example: C++23 (P2718R0) extends every temporary in a
range-for's initialiser to the end of the loop, so that spelling is
rescued by the loop, not by the frame — and only on a compiler that
implements it (GCC 15, Clang 19; GCC 14 still destroys the string before
the first `co_yield`). Move the call one line up and the rescue is gone.

Take the parameter **by value** and the frame really does own it:
`std::generator<char> chars(std::string s)`. The same applies to every
view-like parameter — `std::string_view`, `std::span`, `const T&`,
a lambda by reference — each one is a borrow the caller must outlive,
and "the frame copies parameters" is exactly the phrasing that hides it.

No mainstream compiler diagnoses this reliably, so the discipline is the
defence.
