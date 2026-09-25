---
id: compiler-gvn-hash-consing
kind: basic
version: 1
level: 5
tags: [compilers, ssa, optimisation, hashing]
refs:
  - https://en.wikipedia.org/wiki/Value_numbering
  - https://en.wikipedia.org/wiki/Hash_consing
---

## How does global value numbering decide that two expressions are the same, and what does hash-consing change about the cost?

---

Value numbering assigns each computed value a **number**, such that two
values get the same number when they are provably equal. The rule is
**congruence**: two operations are congruent if they have the same
opcode and their corresponding operands are congruent. Constants fold
to themselves, commutative operands are sorted into a canonical order,
and in SSA the operand *is* the defining instruction, so congruence is
a structural comparison with no dataflow needed.

Implemented directly, that is a hash table keyed by `(opcode,
value-number of each operand)`. Look up, and either find an existing
number — the expression is redundant, replace it with the earlier
value — or install a new one. Local value numbering does this per
basic block; **global** value numbering extends it across blocks, which
is where dominance enters: a redundant computation can only be replaced
by one that **dominates** it.

**Hash-consing** takes the same idea and makes it the *only* way to
construct a node: the IR's factory function looks the node up in the
table and returns the existing one if it is there, so structurally
identical expressions are literally the same object. Then

- equality is pointer comparison, and hashing is the pointer;
- CSE stops being a pass — it happens at construction time, for free;
- memory shrinks, since a shared subexpression is stored once;
- a memoisation table keyed by node pointer works for any analysis.

The costs are real: every construction is a hash lookup, nodes become
immutable (you cannot mutate a shared node — you build a new one), and
the table must be scoped or garbage-collected or it retains everything
the compiler ever built. Mutable-IR compilers like LLVM therefore
hash-cons only the naturally immutable parts (constants, types,
attributes, metadata) and keep GVN as a pass; functional-style IRs
hash-cons everything.

The limit of congruence is worth naming: it catches `a+b` twice, and
after commutative canonicalisation `b+a`, but not `a+b` versus
`b+a+0-0` unless simplification runs first, and not two loops that
compute the same thing differently. Extending it — deciding equality
modulo a set of rewrite rules — is what e-graphs are for.
