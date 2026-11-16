from pathlib import Path
from urllib.parse import urlsplit, unquote
from bs4 import BeautifulSoup
D=Path(__file__).resolve().parents[1]/'dist'; errors=[]; count=0
for page in D.rglob('*.html'):
 soup=BeautifulSoup(page.read_text(),'html.parser');count+=1
 if not soup.title or not soup.find('meta',attrs={'name':'description'}):errors.append(f'{page}: metadata missing')
 if len(soup.find_all('h1'))!=1:errors.append(f'{page}: expected one h1')
 if not soup.find('main'):errors.append(f'{page}: missing main landmark')
 for tag in soup.find_all(['a','link','script','img']):
  value=tag.get('href') or tag.get('src')
  if not value:continue
  url=urlsplit(value)
  if url.scheme or url.netloc:continue
  target=D/unquote(url.path).lstrip('/') if url.path.startswith('/') else page.parent/unquote(url.path)
  if not url.path:target=page
  if target.is_dir():target=target/'index.html'
  if not target.exists():errors.append(f'{page.relative_to(D)}: broken target {value}')
  if url.fragment and target.exists() and target.suffix=='.html':
   ts=soup if target==page else BeautifulSoup(target.read_text(),'html.parser')
   if not ts.find(id=url.fragment):errors.append(f'{page.relative_to(D)}: missing anchor {value}')
 for im in soup.find_all('img'):
  if not im.has_attr('alt'):errors.append(f'{page}: missing image alt')
 for label in soup.find_all('label'):
  if not label.find(['input','select','textarea']) and not label.has_attr('for'):errors.append(f'{page}: unassociated label')
print(f'Checked {count} HTML pages: links, local assets, anchors, titles, descriptions, h1s, main landmarks, image alternatives, form labels.')
if errors:print('\n'.join(errors));raise SystemExit(1)
print('PASS')
