---
id: book-explain
kind: explain
version: 1
level: 5
tags: [hft, order-book, matching, design]
requires:
  - interview-essentials/book-trade-price
  - book-modify-priority
refs:
  - https://web.archive.org/web/20110219155647/http://howtohft.wordpress.com/2011/02/15/how-to-build-a-fast-limit-order-book/
  - https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457316046/CME+Globex+Matching+Algorithms
---
The interviewer: "Design a limit order book and its matcher for one
instrument (FIFO venue). New, cancel and modify must not allocate." Walk through the data structures and the matching path.
---
- [ ] Price levels sit in an array indexed by `(price − base) / tick`, with a cached best per side, so the touch is one load
- [ ] Each level is an intrusive FIFO threaded through pooled orders, and fills come off its front, fully filled orders leaving it
- [ ] An id → handle map makes cancel O(1): look up the slot, check its generation, unlink two neighbours
- [ ] An aggressor trades while the best opposite price crosses its limit, and each fill prints at the resting order's price
- [ ] A modify that changes price or increases size loses queue position, so it is unlink plus append; only a decrease edits in place
