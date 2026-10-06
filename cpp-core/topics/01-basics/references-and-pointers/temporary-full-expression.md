---
id: ptr-temporary-full-expression
kind: trace
version: 1
level: 1
tags: [lifetime, temporaries, tracing]
requires:
  - raii-storage-durations
probes:
  1: { trail: "t~t", first: "t" }
  2: { trail: "t~tl" }
  3: { trail: "t~tlu~u", second: "u" }
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime
  - https://timsong-cpp.github.io/cppwp/n4950/class.temporary#4
---

```cpp
std::string trail;   // constructors append their letter, destructors '~' then the letter
struct Noisy {
  char c;
  Noisy(char ch) : c(ch) { trail += c; }
  ~Noisy() { trail += '~'; trail += c; }
};
Noisy make(char c) { return Noisy{c}; }

int main() {
  char first = make('t').c;    // @1
  Noisy local{'l'};            // @2
  char second = make('u').c;   // @3
}
```

---

`make('t')` yields a **temporary**, and a temporary is destroyed at the
end of the *full-expression* that created it — the `;` — so by Probe 1
the `t` has already been built and torn down (`t~t`), after `first` took
its copy of `c`. `local` is different: it is a named automatic object, so
it is still alive at Probe 3 and only dies when `main` ends. The second
temporary follows the first's pattern (`u~u`) while `local` sits
untouched in between. Reading `.c` off the temporary was fine because
the read happened *inside* the full-expression; keeping a pointer or
reference to it past the `;` would not be. `return Noisy{c}` constructs
the temporary directly (guaranteed elision), so no copies appear in the
trail. Verified by compiling and running this program under GCC 16.2
(`g++ -std=c++23`), including a clean run under `-fsanitize=address`.
