---
id: technique-explain-dp
kind: explain
version: 2
level: 4
tags: [choosing, optimisation]
requires:
  - technique-dp-overlapping-subproblems
  - technique-dp-optimal-substructure
  - technique-coin-change-table
  - technique-greedy-vs-dp
refs:
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
  - https://en.wikipedia.org/wiki/Change-making_problem#Dynamic_programming
elaborate: Which problem from your own work asked for a best total built from smaller choices, and what would one table cell have meant there?
---
An interviewer asks how you tell, from a problem statement alone, that
dynamic programming will solve it. Answer aloud.
---
- [ ] The statement asks for a fewest, most or count over a sequence of choices, like coins paying an amount
- [ ] The best answer contains best answers to smaller pieces: after the last coin, the rest is paid optimally
- [ ] Fewest coins for 6 from coins 4, 3, 1 is 1 plus the fewest for 2, 3 or 5
- [ ] Those smaller pieces recur: fewest for 6 and fewest for 5 both need fewest for 2
- [ ] Greedy commits to one choice instead and can lose: it pays 6 with coins 4, 1, 1
