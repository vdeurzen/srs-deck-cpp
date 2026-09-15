---
id: value-categories-temporary-materialization
kind: basic
version: 1
level: 3
tags: [value-categories]
refs:
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Temporary_materialization
---

## What is "temporary materialization", and when does it happen?

The implicit conversion from a prvalue to an xvalue of the same type,
inserted whenever a prvalue needs a result object — for instance, binding
`const T&` to a prvalue, or calling a member function on `T{}`. A temporary
object is created ("materialized") at that point and the expression
becomes an xvalue denoting it.

Before C++17 this step was folded into "the prvalue is a temporary that
gets copied/moved"; C++17 guaranteed copy elision by making the
prvalue-to-xvalue conversion the only place a temporary object is actually
created, so `T t = T{};` constructs `t` directly with no copy or move to
elide.
