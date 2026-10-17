---
id: vec-build-mini-vector
kind: code
version: 1
level: 5
tags: [vector, raw-storage, move-semantics, implement-std]
input: chips
choices:
  c1:
    - "2 * cap"
    - "cap + 1"
    - "n"
  c2:
    - "std::move_if_noexcept(b[i])"
    - "std::move(b[i])"
    - "b[i]"
compile:
  harness: |
    #include <string>
    template <class T> constexpr void push(MiniVec<T>& w, T& x) {         // lvalue
        if (w.n == w.cap) w.realloc_append(x);
        else { std::construct_at(w.b + w.n, x);  ++w.n; }
    }
    template <class T> constexpr void push(MiniVec<T>& w, T&& x) {        // rvalue
        if (w.n == w.cap) w.realloc_append(std::move(x));
        else { std::construct_at(w.b + w.n, std::move(x));  ++w.n; }
    }
    template <class T> constexpr void release(MiniVec<T>& w) {
        std::destroy(w.b, w.b + w.n);  w.a.deallocate(w.b, w.cap);
    }
    consteval bool strings() {                 // 20 chars: each owns heap memory
        MiniVec<std::string> w;
        std::string s(20, 'a');
        for (int i = 0; i != 4; ++i) push(w, s);   // lvalue: s must stay intact
        push(w, w.b[0]);                           // full: the argument aliases b
        bool ok = s.size() == 20 && w.n == 5 && w.b[4] == std::string(20, 'a');
        release(w);
        return ok;
    }
    template <bool NothrowMove> struct Counted {   // counts copies made of it
        int* copies;
        constexpr explicit Counted(int* c) : copies(c) {}
        constexpr Counted(const Counted& o) : copies(o.copies) { ++*copies; }
        constexpr Counted(Counted&& o) noexcept(NothrowMove) : copies(o.copies) {}
    };
    template <bool NothrowMove> consteval int copies_for_3_rvalue_pushes() {
        int copies = 0;
        MiniVec<Counted<NothrowMove>> w;
        for (int i = 0; i != 3; ++i) push(w, Counted<NothrowMove>(&copies));  // grows at 1 and 2
        release(w);
        return copies;
    }
    static_assert(strings());
    static_assert(copies_for_3_rvalue_pushes<true>() == 0);    // every transfer moves
    static_assert(copies_for_3_rvalue_pushes<false>() == 3);   // relocations copy 1 + 2
    consteval bool grows_geometrically() {
        MiniVec<int> w;
        for (int i = 0; i != 17; ++i) { int x = i; push(w, x); }
        bool ok = w.cap == 32 && w.b[16] == 16;
        release(w);
        return ok;
    }
    static_assert(grows_geometrically());
    int main() {}
requires:
  - vec-emplace-back-forward
  - vec-relocate-move-if-noexcept
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://en.cppreference.com/w/cpp/utility/move_if_noexcept
  - https://timsong-cpp.github.io/cppwp/n4950/vector.modifiers#2
---

Capstone. `MiniVec`'s `push_back` and `emplace_back` call
`realloc_append` when `n == cap`. Complete the new capacity, so that
`push_back` stays amortised O(1), and the relocation, so that growth can
roll back if a copy throws. The test runs in a constant expression.

```cpp
#include <memory>
#include <utility>
template <class T> struct MiniVec {
    std::allocator<T> a;  T* b = a.allocate(1);  std::size_t n = 0, cap = 1;
    template <class... Args> constexpr void realloc_append(Args&&... args) {
        const std::size_t m = {{c1::2 * cap}};  T* nb = a.allocate(m);
        std::construct_at(nb + n, std::forward<Args>(args)...);
        for (std::size_t i = 0; i != n; ++i) std::construct_at(nb + i, {{c2::std\::move_if_noexcept(b[i])}});
        std::destroy(b, b + n);  a.deallocate(b, cap);
        b = nb;  cap = m;  ++n;
    }
};
```

---

The whole growth path in one function: pick the new capacity, construct
the new element first (so `push(w, w.b[0])` copies a live string),
relocate, then destroy, free and commit. `cap + 1` grows by one, so 17
pushes end at capacity 17, not 32: O(n²) copies in total. `n` equals
`cap` here, so the new element lands out of bounds. `std::move(b[i])`
moves a type whose move may throw (0 copies, 3 expected); `b[i]` copies
a type whose move is `noexcept`.
