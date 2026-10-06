---
id: coroutines-frame-operator-new
kind: basic
version: 1
level: 4
tags: [coroutines, performance]
requires:
  - coroutines-frame-allocation
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Dynamic_allocation
---

## Where does the memory for a coroutine frame come from?

---

**`promise_type::operator new` if the promise declares one, else global
`operator new`.** The lookup in the promise's scope is the
customisation point for pooling frames. A promise that also declares a
static `get_return_object_on_allocation_failure()` opts into the nothrow
form: allocation failure returns that object to the caller instead of
throwing.
