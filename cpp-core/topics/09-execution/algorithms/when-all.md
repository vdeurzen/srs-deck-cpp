---
id: execution-when-all
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

## What does `when_all(a, b)` do when `a` fails while `b` is still running?

---

It requests stop on `b`, waits for it to finish anyway, and then
completes once with `a`'s error. That sentence contains the three
things worth remembering about `when_all`.

**It is a join, not a race.** The combined operation completes only
after every child has completed, on whichever channel. There is no
state in which `when_all` has finished while a child is still touching
its operation state — which is what makes it safe for the children to
borrow from the enclosing scope.

**Failure cancels the siblings.** The first child to complete with
`set_error` (or `set_stopped`) causes a stop request to be sent to the
others through their environments. Children that honour stop tokens
wind up quickly; children that ignore them are still waited for.

**Values concatenate.** If both succeed, the result is all of their
values in order — `when_all` of a sender of `int` and a sender of
`std::string` completes with `(int, std::string)`. This is why each
child must have exactly one value completion signature; when that is
not true, `when_all_with_variant` (or `into_variant` on each child)
makes the shape unambiguous again.

Concurrency here is what the children's schedulers provide: `when_all`
starts them all, and whether that means parallelism depends on where
each one was told to run.
