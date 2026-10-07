---
id: str-aho-corasick-failure-trace
kind: trace
version: 1
level: 4
tags: [tracing, strings, automata]
probes:
  1: { "fail[4]": "1", "fail[5]": "2", "fail[6]": "0", "fail[7]": "3", "fail[9]": "3" }
requires:
  - str-aho-corasick
refs:
  - https://doi.org/10.1145/360825.360855
---

```cpp
// nodes: 1 h, 2 he, 3 s, 4 sh, 5 she, 6 hi, 7 his, 8 her, 9 hers
int go[16][26], fail[16], nodes = 1;            // node 0 = root
void insert(std::string_view p, int s = 0) {
  for (char c : p) { int& n = go[s][c - 'a']; if (!n) n = nodes++; s = n; }
}
int main() {
  for (auto p : {"he", "she", "his", "hers"}) insert(p);
  std::queue<int> q;                            // BFS from the root's children
  for (int c = 0; c < 26; ++c) if (go[0][c]) q.push(go[0][c]);
  while (!q.empty()) {
    const int s = q.front(); q.pop();
    for (int c = 0; c < 26; ++c) if (const int t = go[s][c]) {
      int f = fail[s]; while (f && !go[f][c]) f = fail[f];
      fail[t] = go[f][c]; q.push(t);
    }
  }                                             // @1
}
```

---

A child's link is found from its *parent's*: follow the parent's
failure chain until some node has an edge on the same letter. `sh` →
`h` (node 1), and then `she` → `he` (2), because `h` has an `e` edge.
`hi` has no `i` anywhere below the root, so it falls to 0. `his` and
`hers` both end in `s`, a depth-1 node, so both point at 3. That
dependency on the parent is why the build is a BFS.

Verified by compiling and running this program (with `<queue>` and
`<string_view>`) under GCC 16.2 and printing `fail[]`.
