/* Spis Korniłowicza 1916 — 17 budowli Witkiewicza (nekrolog, Pamiętnik TT t. 36).
   `stop` = indeks przystanku TURNIE (współrzędne od Tomka). Bez przystanku = punktu na mapie
   jeszcze nie ustalono — NIE dopisywać współrzędnych bez potwierdzenia w terenie. */
(function () {
  const B = [
    ['Koliba', '1892–1893', 3, 'Pierwszy dom w stylu zakopiańskim'],
    ['Pepita (dom dra Chrostowskiego)', '1893', null, ''],
    ['Oksza', '1894–1895', 6, ''],
    ['Zofiówka', '1896', null, 'Budynek nie istnieje — zostały pocztówki'],
    ['Sanatorium dra Hawranka', '1897', 5, 'Dziś willa Rialto'],
    ['Pod Jedlami', '1897', 7, ''],
    ['Domek kustosza przy muzeum', '', null, ''],
    ['Klasztorek Braci Albertów, Kalatówki', '1898', 10, 'Pustelnia na Kalatówkach'],
    ['Konstantynówka', '1900', null, ''],
    ['Grażyna', '1900–1901', null, ''],
    ['Władysławka', '1902', 4, 'Dziś Czerwony Dwór'],
    ['Na Antołówce', '1904', null, ''],
    ['Pod Wykrotem', '1905–1906', null, ''],
    ['Dom Dłuskich, Kościeliska', '1907', null, ''],
    ['Kapliczka Korniłowiczów, Bystre', '1907', null, ''],
    ['Kaplica w Jaszczurówce', '1908', 9, ''],
    ['Gmach Muzeum im. Chałubińskiego', '1913', 0, 'Muzeum Tatrzańskie'],
  ];
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const onMap = B.filter(b => b[2] !== null).length;
  const sec = document.createElement('section');
  sec.className = 'budowle';
  sec.innerHTML =
    `<p class="eyebrow">SPIS KORNIŁOWICZA · 1916</p>
     <h2>Siedemnaście <em>budowli</em></h2>
     <p class="view-intro">Wszystko, co Witkiewicz zaprojektował w stylu zakopiańskim — bez honorarium za żaden projekt. ${onMap} z nich ma już swój przystanek na mapie.</p>
     <ol class="bud-list">${B.map(([n, y, stop, note], i) => `
       <li class="${stop === null ? 'nomap' : ''}">
         <span class="bud-n">${String(i + 1).padStart(2, '0')}</span>
         <div><strong>${esc(n)}</strong>${note ? `<small>${esc(note)}</small>` : (stop === null ? '<small>Punkt na mapie do ustalenia</small>' : '')}</div>
         <span class="bud-y">${y || '—'}</span>
         ${stop !== null ? `<button type="button" data-show-map="${stop}" aria-label="Pokaż na mapie: ${esc(n)}">⌖</button>` : '<span class="bud-x" aria-hidden="true"></span>'}
       </li>`).join('')}
     </ol>
     <p class="route-note">Źródło: nekrolog Stanisława Witkiewicza pióra Korniłowicza, „Pamiętnik Towarzystwa Tatrzańskiego” t. 36 (1916).</p>`;
  const host = document.getElementById('walk-view');
  if (host) {
    sec.id = 'budowle'; host.appendChild(sec);
    const intro = host.querySelector('.route-note');
    if (intro) intro.insertAdjacentHTML('afterend', '<a class="bud-jump" href="#budowle-spis">Siedemnaście budowli Witkiewicza ↓</a>');
    host.addEventListener('click', e => { if (e.target.closest('.bud-jump')) { e.preventDefault(); sec.scrollIntoView({behavior: 'smooth', block: 'start'}); } });
  }
})();
