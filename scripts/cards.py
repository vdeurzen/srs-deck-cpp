"""Shared Card parsing for the scripts in this directory.

Mirrors the parts of docs/FORMAT.md the scripts need. tool/validate stays the
authority on what loads; this only reads Cards that already validate.
"""

import os
import re

import yaml

FM = re.compile(r"\A---\n(.*?)\n---\n(.*)\Z", re.S)
FENCE = re.compile(r"^(`{3,})([\w+-]*)[^\n]*\n(.*?)\n\1[ \t]*$", re.S | re.M)
OPEN = re.compile(r"\{\{c(\d+)::")
SPLIT = re.compile(r"(?<!\\)::")


class Card:
    def __init__(self, deck, path, fm, body):
        self.deck = deck
        self.path = path
        self.fm = fm
        self.body = body
        self.id = fm["id"]
        self.kind = fm["kind"]
        self.topic = os.path.relpath(os.path.dirname(path), os.path.join(deck.root, "topics"))

    @property
    def qid(self):
        return f"{self.deck.id}/{self.id}"

    @property
    def requires(self):
        """Prerequisites as fully qualified ids."""
        return [r if "/" in r else f"{self.deck.id}/{r}" for r in self.fm.get("requires") or []]

    def compile(self):
        """Merged compile block, or None when the Card opts out or has none."""
        if "compile" in self.fm and self.fm["compile"] is None:
            return None
        merged = dict(self.deck.defaults.get("compile") or {})
        merged.update(self.fm.get("compile") or {})
        return merged if merged.get("harness") is not None else None

    def code(self):
        m = FENCE.search(self.body)
        return m.group(3) if m else None

    def split(self):
        """(front, back) around the first separator line, back '' if none."""
        parts = re.split(r"^---[ \t]*$", self.body, maxsplit=1, flags=re.M)
        return parts[0], parts[1] if len(parts) > 1 else ""


class Deck:
    def __init__(self, root):
        self.root = root.rstrip("/")
        meta = yaml.safe_load(open(os.path.join(self.root, "deck.yaml")))
        self.id = meta["id"]
        self.defaults = meta.get("defaults") or {}
        self.relations = [r["deck"] for r in meta.get("relations") or []]
        self.cards = {}
        for dirpath, _, files in os.walk(os.path.join(self.root, "topics")):
            for f in sorted(files):
                if not f.endswith(".md"):
                    continue
                path = os.path.join(dirpath, f)
                m = FM.match(open(path).read())
                card = Card(self, path, yaml.safe_load(m.group(1)), m.group(2))
                self.cards[card.id] = card


def clozes(text):
    """Every cloze marker as (start, end, number, answer, hint)."""
    out = []
    for m in OPEN.finditer(text):
        close = text.find("}}", m.end())
        # `{{c1::{}}}`: a run of braces closes on its last two.
        while close + 2 < len(text) and text[close + 2] == "}":
            close += 1
        inner = SPLIT.split(text[m.end():close], maxsplit=1)
        unescape = lambda s: s.replace("\\::", "::")
        out.append((m.start(), close + 2, m.group(1), unescape(inner[0]),
                    unescape(inner[1]) if len(inner) > 1 else None))
    return out


def fill(text, sub=None):
    """Replace every cloze with sub[number], or its reference answer."""
    sub = sub or {}
    out, last = [], 0
    for start, end, n, answer, _ in clozes(text):
        out += [text[last:start], sub.get(n, answer)]
        last = end
    return "".join(out + [text[last:]])


def in_topic(card, prefix):
    """True if `card` is under `prefix`: a topic prefix (any Deck), or
    `<deck-id>/<topic prefix>` to pick one Deck."""
    if not prefix:
        return True
    prefix = prefix.rstrip("/")
    deck, _, rest = prefix.partition("/")
    rest = rest.removeprefix("topics/")
    prefix = prefix.removeprefix("topics/")
    if deck == card.deck.id:
        return card.topic.startswith(rest)
    return card.topic.startswith(prefix)
