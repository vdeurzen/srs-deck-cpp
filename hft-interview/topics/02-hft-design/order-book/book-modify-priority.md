---
id: book-modify-priority
kind: basic
version: 1
level: 4
tags: [hft, order-book, matching]
requires:
  - book-fifo-vs-prorata
refs:
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457414497/Order+Functionalities
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
elaborate: Your strategy wants 5 more lots at a price where it is first in the queue. Would you modify the order, or send a second one?
---

## On a CME Globex FIFO product, the bid queue at 99 is 5 lots, 8 lots, then your 10. You modify your order's price or quantity. Which change keeps your queue position?

---

**Only a quantity decrease keeps priority there; a price change or an
increase loses it.** Shrinking takes nothing from the 13 lots ahead of
you; growing or re-pricing would. In the book, a decrease edits in
place; anything else is unlink plus append at the back. Other venues
differ, so ask which model applies.
