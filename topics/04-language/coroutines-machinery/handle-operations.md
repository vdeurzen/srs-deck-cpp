---
id: coroutines-handle-operations
kind: cloze
version: 1
level: 3
tags: [coroutines]
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
---

A `std::coroutine_handle` is a non-owning pointer to a frame, so it is
trivially copyable and nobody's destructor cleans it up. Resuming a
suspended coroutine is {{c1::resume()::or the equivalent operator(),
which calls it}}, and it returns to *you* when the coroutine next
suspends or finishes — it is an ordinary function call, not a context
switch. Freeing the frame and running the destructors of everything in
it is {{c2::destroy()}}, which is the only thing that ever frees a
frame. {{c3::done()::true only when the coroutine is suspended at its
final suspend point}} asks whether the coroutine has finished, and
`address()` hands out the raw `void*` you give to a C callback, to be
turned back into a handle with
{{c4::coroutine_handle<>\::from_address::the static member that rebuilds
the erased handle}}. Note that the handle's `explicit operator bool`
only says whether it points at a frame at all — it is not `!done()`.
