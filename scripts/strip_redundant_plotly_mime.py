"""Remove redundant HTML copies from Plotly outputs in Jupyter notebooks."""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path


PLOTLY_MIME = "application/vnd.plotly.v1+json"


def clean_notebook(path: Path) -> int:
    notebook = json.loads(path.read_text(encoding="utf-8"))
    removed = 0

    for cell in notebook.get("cells", []):
        for output in cell.get("outputs", []):
            data = output.get("data")
            if not isinstance(data, dict) or PLOTLY_MIME not in data:
                continue
            for redundant_mime in ("text/html", "text/plain"):
                if redundant_mime in data:
                    del data[redundant_mime]
                    removed += 1

    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(
        json.dumps(notebook, ensure_ascii=False, indent=1) + "\n",
        encoding="utf-8",
    )
    os.replace(temporary, path)
    return removed


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("Usage: strip_redundant_plotly_mime.py NOTEBOOK [NOTEBOOK ...]")

    for filename in sys.argv[1:]:
        path = Path(filename)
        removed = clean_notebook(path)
        print(f"{path}: removed {removed} redundant Plotly MIME entries")


if __name__ == "__main__":
    main()
