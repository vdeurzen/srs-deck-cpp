---
id: technique-rec-word-in-grid
kind: basic
version: 1
level: 3
tags: [recognition, grids]
requires:
  - technique-backtracking-undo
  - graph-bfs-and-dfs
  - graph-grid-as-graph
elaborate: Say aloud which cheap check you would run before the search to reject a board that lacks enough copies of some letter.
refs:
  - https://leetcode.com/problems/word-search/
  - https://doi.org/10.1145/321296.321300
---

A 4 × 4 board of letters and a word of at most 10 letters. The word
must be spelled along a path of up, down, left and right steps, each
cell used at most once on that path.

## Which technique decides whether the word is on the board?

---

**Backtracking: mark a cell, try its neighbours for the next letter, unmark it on return.**

A cell that failed on one path may be needed on another, so the marks
belong to the current path. A plain graph DFS marks each cell for good
and never unmarks it, so it can miss the word. (Word Search, LC 79.)
