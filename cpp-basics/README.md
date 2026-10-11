# `cpp-basics`

A from-the-ground-up crash course on C++ foundations, for a programmer who wants
them in long-term memory before `cpp-core`. Levels 1–2, one idea per Card, at
least half of each topic hands-on (`trace`, `code`, `chunk`), each topic ending
in one `explain` capstone.

`cpp-core`, `algo-basics` and `algo-systems` build on this Deck: their entry
Cards `require` the matching `cpp-basics/<id>` Card. This Deck declares no
relations. It re-teaches some `cpp-core` basics in new wording on purpose:
nothing was moved, so review history stays.

| Topic | Covers |
| --- | --- |
| `01-types-and-values` | sizes, signed/unsigned, promotion, narrowing, literals, `auto`, brace init, uninitialised reads |
| `02-references-and-pointers` | `&` and `*`, `nullptr`, `->`, references that cannot rebind, arrays decaying, pointer arithmetic, dangling |
| `03-const` | const objects, const references, pointer-to-const vs const pointer, const members, `constexpr` |
| `04-functions` | declaration vs definition, parameter passing, return by value, overloading, default arguments, namespaces, recursion |
| `05-classes` | struct vs class, constructors and init lists, invariants, `explicit`, `= default`/`= delete`, static members |
| `06-object-lifetime` | scope, when ctors/dtors run, copy construction vs assignment, temporaries, `new`/`delete` |
| `07-value-categories-intro` | lvalues vs temporaries, what `T&`, `const T&` and `T&&` bind, lifetime extension |
| `08-inheritance` | is-a, virtual dispatch, `override`, virtual destructors, abstract classes, slicing |
| `09-templates-basics` | function and class templates, deduction, instantiation, concepts and constrained `auto` |
| `10-containers-and-iterators` | vector, array, string, size vs capacity, half-open ranges, map lookup, invalidation |
| `11-algorithms-and-lambdas` | lambdas and captures, find_if, sort with comparators, accumulate, transform, erase_if |
| `12-error-handling` | throw/catch, catch by reference, unwinding, `noexcept`, assert vs exceptions |
| `13-headers-and-linkage` | `#include`, header/source split, guards, ODR, `inline`, internal linkage, `extern` |
| `14-undefined-behaviour` | what UB means, out of bounds, overflow, uninitialised reads, dangling, sanitizers |

## Validating

    tool/validate cpp-basics cpp-core algo-basics algo-systems
    scripts/check-code cpp-basics cpp-core algo-basics algo-systems
