const weeks = [
  { title: 'Ankommen', rounds: 1, reps: 6, walk: 8, minutes: '12–15', note: 'Lerne die Bewegungen kennen: eine Runde mit je 6 ruhigen Wiederholungen. Lieber leicht als erschöpft.' },
  { title: 'Routine finden', rounds: 1, reps: 8, walk: 10, minutes: '12–17', note: 'Die gleichen Übungen, zwei Wiederholungen mehr. Die Zahl der Runden bleibt gleich.' },
  { title: 'Etwas aufbauen', rounds: 2, reps: 6, walk: 12, minutes: '18–22', note: 'Eine zweite Runde kommt dazu. Dafür gehst du pro Übung wieder auf 6 Wiederholungen zurück.' },
  { title: 'Dranbleiben', rounds: 2, reps: 8, walk: 15, minutes: '20–25', note: 'Wenn du dich gut erholt hast: zwei Runden mit je 8 Wiederholungen. Das Tempo bleibt ruhig.' }
];
const days = [
  { name: 'Montag', kind: 'strength', label: 'Sanftes Ganzkörpertraining', symbol: '01' },
  { name: 'Dienstag', kind: 'walk', label: 'Locker in Bewegung', symbol: '02' },
  { name: 'Mittwoch', kind: 'recovery', label: 'Erholung & sanfte Mobilität', symbol: '03' },
  { name: 'Donnerstag', kind: 'strength', label: 'Sanftes Ganzkörpertraining', symbol: '04' },
  { name: 'Freitag', kind: 'walk', label: 'Locker in Bewegung', symbol: '05' },
  { name: 'Samstag', kind: 'optional', label: 'Freie Bewegung, wenn du magst', symbol: '06' },
  { name: 'Sonntag', kind: 'rest', label: 'Ruhetag', symbol: '07' }
];
const exercises = [
  { name: 'Vom Stuhl aufstehen', area: 'BEINE & ALLTAGSKRAFT', steps: ['Setze dich auf die vordere Hälfte eines stabilen Stuhls. Füße hüftbreit und flach unter den Knien aufstellen.', 'Beuge den Oberkörper leicht vor und stehe langsam auf. Knie zeigen in Richtung der Zehen.', 'Setze dich kontrolliert wieder hin. Atme beim Aufstehen aus; halte die Luft nicht an.'], easy: 'Mit den Händen an stabilen Armlehnen unterstützen oder einen etwas höheren, sicheren Stuhl verwenden.' },
  { name: 'Liegestütz an der Wand', area: 'BRUST, ARME & RUMPF', steps: ['Stelle dich etwa eine Armlänge vor eine freie Wand. Hände auf Brusthöhe etwas breiter als schulterbreit auflegen.', 'Füße bleiben rutschfest stehen, Körper in einer Linie. Beuge die Ellenbogen und nähere dich langsam der Wand.', 'Drücke dich ruhig zurück, ohne die Schultern hochzuziehen. Beim Wegdrücken ausatmen.'], easy: 'Gehe näher an die Wand und beuge die Arme nur wenig.' },
  { name: 'Fersenheben mit Halt', area: 'WADEN & STABILITÄT', steps: ['Stelle dich hüftbreit hinter den gesicherten Stuhl und halte die Lehne mit beiden Händen fest.', 'Hebe beide Fersen langsam an. Bleibe aufrecht und verteile dein Gewicht gleichmäßig.', 'Senke die Fersen kontrolliert zum Boden. Nicht wippen und den Halt beibehalten.'], easy: 'Im Sitzen: Füße flach aufstellen und beide Fersen langsam heben und senken.' },
  { name: 'Bein seitlich anheben', area: 'HÜFTE & STABILITÄT', side: true, steps: ['Halte dich am gesicherten Stuhl fest. Stehe aufrecht, die Knie bleiben locker.', 'Hebe ein Bein nur ein kleines Stück zur Seite. Fußspitze zeigt nach vorn, Becken bleibt gerade.', 'Senke den Fuß langsam ab. Erst eine Seite beenden, dann wechseln. Nicht ins Hohlkreuz oder zur Seite kippen.'], easy: 'Statt das Bein anzuheben, den Fuß am Boden langsam zur Seite und wieder zurück schieben.' }
];
let selectedWeek = 0;
let selectedDay = 0;
const summary = document.getElementById('week-summary');
const dayList = document.getElementById('movement-days');
const session = document.getElementById('movement-session');
function duration(day, week) {
  if (day.kind === 'strength') return `${week.minutes} Min.`;
  if (day.kind === 'walk' || day.kind === 'optional') return `${week.walk} Min.${day.kind === 'optional' ? ' optional' : ''}`;
  return day.kind === 'recovery' ? '0–5 Min. optional' : 'Pause';
}
function exerciseCards(week) {
  return exercises.map((exercise, i) => `<details class="exercise-card"><summary><span class="exercise-number">${i + 1}</span><span><small>${exercise.area}</small><strong>${exercise.name}</strong><span>${week.reps} Wiederholungen${exercise.side ? ' pro Seite' : ''} pro Runde</span></span><span class="exercise-expand" aria-hidden="true">+</span></summary><div class="exercise-instructions"><ol>${exercise.steps.map(s => `<li>${s}</li>`).join('')}</ol><p><b>Leichter geht’s so:</b> ${exercise.easy}</p></div></details>`).join('');
}
function renderSession() {
  const week = weeks[selectedWeek], day = days[selectedDay];
  let body;
  if (day.kind === 'strength') {
    body = `<p>Stabiler Stuhl, eine Wand und etwas Platz – mehr brauchst du heute nicht. Öffne eine Übung für die genaue Anleitung.</p><div class="session-phases"><div><b>01 · Ankommen</b><p>3–5 Minuten: langsam auf der Stelle gehen, Schultern locker kreisen und Fußgelenke sanft bewegen. Ein stabiler Halt darf immer dabei sein.</p></div><div><b>02 · Dein Übungskreis</b><p>${week.rounds === 1 ? 'Eine Runde' : 'Zwei Runden'} mit allen vier Übungen. Je ${week.reps} Wiederholungen, bei Beinheben je Seite. Zwischen den Übungen 45–90 Sekunden pausieren, bei Bedarf länger.${week.rounds > 1 ? ' Zwischen den Runden 1–2 Minuten erholen.' : ''}</p></div></div>${exerciseCards(week)}<div class="session-cooldown"><b>03 · Ruhig ausklingen</b><p>2–3 Minuten locker gehen oder sitzen, Schultern entspannen und ruhig weiteratmen. Du solltest dich angenehm bewegt fühlen.</p></div>`;
  } else if (day.kind === 'walk' || day.kind === 'optional') {
    body = `<p>${day.kind === 'optional' ? 'Heute entscheidest du: entspannen oder eine kleine Runde Bewegung, die dir Freude macht.' : 'Bewege dich heute locker und ohne Leistungsdruck. Wähle eine dieser Möglichkeiten:'}</p><ul class="session-options"><li><b>Zu Hause:</b> ${week.walk} Minuten langsam auf der Stelle gehen oder durch die Wohnung laufen – ohne Sprünge.</li><li><b>Mit Musik:</b> ${week.walk} Minuten lockere Seitwärtsschritte, mit sicherem Halt bei Bedarf.</li><li><b>Draußen, wenn du magst:</b> ein entspannter Spaziergang auf ebenem Untergrund.</li></ul><div class="session-cooldown"><b>Du darfst aufteilen</b><p>Zum Beispiel ${Math.floor(week.walk / 2)} und ${Math.ceil(week.walk / 2)} Minuten mit einer längeren Pause dazwischen. Starte und ende langsamer. Du solltest jederzeit in ganzen Sätzen sprechen können.</p></div>`;
  } else if (day.kind === 'recovery') {
    body = '<p>Heute ist kein Training geplant. Wenn es angenehm ist, kannst du bis zu fünf Minuten sanfte Bewegung einbauen – oder einfach pausieren.</p><ul class="session-options"><li>Im stabilen Sitz die Schultern langsam vor- und zurückkreisen.</li><li>Fußspitzen und Fersen im Sitzen abwechselnd anheben.</li><li>Arme locker ausschütteln und ruhig atmen.</li></ul><div class="session-cooldown"><b>Keine Dehnung erzwingen</b><p>Bleibe im angenehmen Bewegungsbereich. Bei Muskelkater darfst du vollständig pausieren.</p></div>';
  } else {
    body = '<p>Heute darf dein Körper sich erholen. Kein Übungskreis, keine Mindestzeit, nichts nachzuholen.</p><div class="rest-visual" aria-hidden="true">☁</div><div class="session-cooldown"><b>Erholung gehört zum Plan</b><p>Schau vor der nächsten Woche: Fühlen sich die Übungen kontrolliert an? Bist du bis zur nächsten Einheit erholt? Dann probiere den nächsten Schritt. Sonst wiederhole die Woche oder reduziere den Umfang.</p></div>';
  }
  session.innerHTML = `<div class="session-kicker">WOCHE ${selectedWeek + 1} · ${day.name.toUpperCase()}</div><div class="session-heading"><h2 id="session-heading">${day.label}</h2><span class="session-duration">${duration(day, week)}</span></div>${body}<p class="session-reminder">Lieber weniger und kontrolliert als mehr und erschöpft. Du kannst jederzeit pausieren.</p>`;
  dayList.querySelectorAll('[data-day]').forEach(button => {
    const active = Number(button.dataset.day) === selectedDay;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function renderWeek() {
  const week = weeks[selectedWeek];
  summary.innerHTML = `<b>Woche ${selectedWeek + 1}: ${week.title}</b><p>${week.note} Geplant sind ${week.walk} Minuten lockere Bewegung pro Bewegungstag.</p>`;
  dayList.innerHTML = days.map((day, index) => `<button type="button" class="day-button" data-day="${index}" aria-pressed="false"><span class="day-number">${day.symbol}</span><span><strong>${day.name}</strong><small>${day.label}</small></span><span class="day-duration">${duration(day, week)}</span></button>`).join('');
  document.querySelectorAll('[data-week]').forEach(button => {
    const active = Number(button.dataset.week) === selectedWeek;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  renderSession();
}
document.querySelectorAll('[data-week]').forEach(button => button.addEventListener('click', () => {
  selectedWeek = Number(button.dataset.week);
  renderWeek();
}));
dayList.addEventListener('click', event => {
  const button = event.target.closest('[data-day]');
  if (!button) return;
  selectedDay = Number(button.dataset.day);
  renderSession();
});
renderWeek();
