---
id: ll-wire-timestamps
kind: basic
version: 1
level: 5
tags: [low-latency, hft, measurement, networking]
requires:
  - ll-kernel-bypass
refs:
  - https://www.kernel.org/doc/html/latest/networking/timestamping.html
  - https://linuxptp.nwtime.org/documentation/ptp4l/
---

## Tick-to-trade is measured with `rdtsc`, from the poll loop returning a market-data packet to the order being written to the NIC's TX ring. What time between the packet reaching the NIC port and the order leaving it is not counted?

---

**Time inside the NIC: the packet waiting in the RX ring, the order
waiting in the TX queue.** Stamp at the port with hardware timestamps from
the same NIC clock (PTP only to compare across hosts): via
`SOF_TIMESTAMPING_*_HARDWARE` on the kernel stack, from the RX/TX
descriptors under kernel bypass, or with a passive wire tap.
