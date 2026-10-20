---
id: coroutines-handle-operations
kind: cloze
version: 1
level: 3
tags: [coroutines]
requires:
  - coroutines-what-makes-a-coroutine
elaborate: Say in one sentence, as to an interviewer, who should call `destroy()` on a coroutine frame and what happens if nobody does.
refs:
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
---

A `std::coroutine_handle` is a non-owning pointer to a coroutine frame.
Handing control back into a suspended coroutine is {{c1::resume()::or
the equivalent operator(), which calls it}}, which returns to you when
the coroutine next suspends or finishes. Freeing a suspended frame and
running the destructors of everything in it is {{c2::destroy()}}.
{{c3::done()::a query}} tells you whether the coroutine is suspended at
its final suspend point.

---

`resume()` is an ordinary function call, not a context switch. The
handle is trivially copyable and no destructor frees the frame, so
`destroy()` is the only way to free a suspended one. Its
`explicit operator bool` says only whether it points at a frame at all,
and `address()` hands out the `void*` for a C callback.
