---
id: graph-bfs-mark-on-push-trace
kind: trace
version: 2
level: 3
tags: [tracing, graphs, traversal, bugs]
probes:
  1: { "q.size()": "2" }
  2: { "q.front()": "2", "q.back()": "2" }
requires:
  - interview-essentials/graph-bfs-mark-on-push
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Pseudocode
elaborate: A web crawler queues every link it finds and skips pages already fetched when it dequeues them. What grows, and how would you stop it?
---

A BFS that marks a vertex when it is popped, one pop per `step`.

```cpp
const std::vector<int> adj[3] = {{1, 2}, {2}, {}};   // 0→1, 0→2, 1→2
std::queue<int> q;
bool seen[3] = {};

void step() {
  const int u = q.front(); q.pop();
  if (seen[u]) return;
  seen[u] = true;
  for (int v : adj[u]) if (!seen[v]) q.push(v);
}

int main() {
  q.push(0);
  step();   // @1
  step();   // @2
}
```

---

Popping 0 marks it and pushes 1 and 2. Popping 1 sees 2 unmarked, since
2 is marked only when *it* is popped, so 2 goes in a second time: the
queue is `2 2`. The second copy will be popped and skipped. Marking at
the push would have stopped it. On a dense graph these duplicates make
the queue O(E) long.

Verified by compiling and running this program under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
