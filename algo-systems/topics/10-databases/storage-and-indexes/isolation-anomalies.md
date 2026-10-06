---
id: db-isolation-anomalies
kind: cloze
version: 1
level: 2
tags: [databases, transactions, isolation]
refs:
  - https://arxiv.org/abs/cs/0701157
  - https://www.postgresql.org/docs/current/transaction-iso.html
---

Name each anomaly: dirty read, non-repeatable read or phantom. T1 reads a value that T2 has written but not yet
committed: a {{c1::dirty read}}. T1 reads a row, T2 updates it and
commits, and T1's second read of that row returns the new value: a
{{c2::non-repeatable read}}. T1 runs `SELECT … WHERE qty > 10`, T2
inserts a matching row and commits, and T1's re-run returns one more
row: a {{c3::phantom}}.

---

The SQL standard defines its isolation levels by which of these three
it forbids. Berenson et al. showed that list is incomplete: lost updates
and write skew slip past a level that forbids all three, which is why
`SERIALIZABLE` is defined by outcome — equivalent to *some* serial order —
not by a list of anomalies.
