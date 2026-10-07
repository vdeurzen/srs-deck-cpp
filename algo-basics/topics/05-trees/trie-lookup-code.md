---
id: tree-trie-lookup-code
kind: code
version: 1
level: 2
tags: [tries, strings, trees]
requires:
  - tree-trie-end-flag
input: chips
choices:
  c1: ["t.word[v]", "true", "v != 0"]
compile:
  harness: |
    struct Trie { int next[16][26]{}; bool word[16]{}; int nodes = 1; };
    constexpr void add(Trie& t, std::string_view s) {
      int v = 0;
      for (char c : s) {
        int& n = t.next[v][c - 'a'];
        if (n == 0) n = t.nodes++;
        v = n;
      }
      t.word[v] = true;
    }
    constexpr Trie make() { Trie t; for (auto w : {"car", "cart", "to"}) add(t, w); return t; }
    constexpr Trie t = make();
    static_assert(contains(t, "car") && contains(t, "cart") && contains(t, "to"));
    static_assert(!contains(t, "ca") && !contains(t, "cat") && !contains(t, "t"));
    int main() {}
refs:
  - https://doi.org/10.1145/367390.367400
  - https://en.wikipedia.org/wiki/Trie
---

The trie holds "car", "cart" and "to". Complete the lookup so it accepts
exactly the stored words.

```cpp
#include <string_view>

// next[v][c - 'a']: v's child on letter c, 0 if none; node 0 is the root.
// word[v]: a stored word ends at node v.
constexpr bool contains(const auto& t, std::string_view s) {
  int v = 0;
  for (char c : s)
    if ((v = t.next[v][c - 'a']) == 0) return false;
  return {{c1::t.word[v]}};
}
```

---

Surviving the walk only proves `s` is a prefix of some stored word; the
end-of-word flag decides. `true` and `v != 0` accept "ca". Nor is "the
walk ended at a leaf" the test: "car" is stored and continues into "cart".

The loop runs once per letter, so a lookup costs O(L) for a key of
length L, however many words the trie holds. A balanced comparison tree
pays O(log n) steps instead, each comparing whole keys.
