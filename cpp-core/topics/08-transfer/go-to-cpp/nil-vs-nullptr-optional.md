---
id: transfer-nil-vs-nullptr-optional
kind: cloze
version: 1
level: 2
tags: [transfer, misconception, pointers]
requires:
  - vocab-optional-maybe-value
elaborate: Go lets you call a method on a nil pointer receiver as long as the method never dereferences it. Why does the equivalent C++ member-function call on a null pointer not get the same safety net?
refs:
  - https://en.cppreference.com/w/cpp/language/nullptr
  - https://en.cppreference.com/w/cpp/utility/optional
---

Go's `nil` is a well-behaved zero value: a `nil` pointer, map, slice,
channel, or interface can be compared, passed around, and even have a
method called on it, and only *dereferencing* one that actually needs
data panics. It is tempting to treat C++'s `nullptr` the same way, but
`int* p = nullptr;` and then `*p` is not a safe no-op the way reading
through a `nil` map is — it is {{c1::undefined behaviour::the compiler
is free to assume it never happens, and optimise accordingly, rather
than trap it at runtime}} the instant it happens, whether or not the
dereferenced value is ever used. Calling a non-static member function
through a null pointer is the same trap in different clothes: the call
itself is {{c2::undefined behaviour, even if the body never touches
`this`::same rule: a body that never reads a member may happen to
"work", but nothing makes it valid}}, and in practice it usually only
crashes once the body reads a member. When "no value" is a real, expected case rather than a
programmer error, {{c3::std\::optional<T>::makes the absence a distinct,
checkable state instead of a special pointer value at all}} is usually
the closer match to what Go's `nil` was doing.
