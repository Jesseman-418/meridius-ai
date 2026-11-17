from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.elements = []
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


root = Path(__file__).resolve().parents[1] / "dist"
pages = {path: Page(path).elements for path in root.rglob("*.html")}
errors = []
for path, elements in pages.items():
    for required in ("h1", "main", "title"):
        if sum(tag == required for tag, _ in elements) != 1:
            errors.append(f"{path}: expected one {required}")
    if not any(tag == "meta" and attrs.get("name") == "description"
               for tag, attrs in elements):
        errors.append(f"{path}: missing description")
    for tag, attrs in elements:
        if tag == "img" and "alt" not in attrs:
            errors.append(f"{path}: missing image alternative")
        value = attrs.get("href") or attrs.get("src")
        if not value:
            continue
        url = urlsplit(value)
        if url.scheme or url.netloc:
            continue
        target = path
        if url.path.startswith("/"):
            target = root / unquote(url.path).lstrip("/")
        elif url.path:
            target = path.parent / unquote(url.path)
        if target.is_dir():
            target /= "index.html"
        if not target.exists():
            errors.append(f"{path}: missing target {value}")
        elif url.fragment and target.resolve() in pages:
            if not any(a.get("id") == unquote(url.fragment)
                       for _, a in pages[target.resolve()]):
                errors.append(f"{path}: missing anchor {value}")

if errors:
    raise SystemExit("\n".join(errors))
print(f"Passed structural and local link checks on {len(pages)} pages.")
