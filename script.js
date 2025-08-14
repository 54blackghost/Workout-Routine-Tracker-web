const tabs = document.querySelectorAll('.tab');
const form = document.getElementById('addWorkoutForm');
const display = document.getElementById('workoutDisplay');
let workouts = JSON.parse(localStorage.getItem('workouts') || '{}');
let currentDay = 'Monday';

function showDay(day) {
  currentDay = day;
  tabs.forEach(t => t.classList.toggle('active', t.dataset.day === day));
  render();
}

tabs.forEach(t => t.addEventListener('click', () => showDay(t.dataset.day)));

form.addEventListener('submit', e => {
  e.preventDefault();
  const day = form.daySelect.value;
  const w = {
    name: form.workoutName.value,
    duration: form.duration.value,
    sets: form.sets.value,
    url: form.url.value
  };
  workouts[day] = workouts[day] || [];
  workouts[day].push(w);
  localStorage.setItem('workouts', JSON.stringify(workouts));
  form.reset();
  if (day === currentDay) render();
});

function render() {
  display.innerHTML = '';
  (workouts[currentDay] || []).forEach(w => {
    const d = document.createElement('div');
    d.className = 'workout-card';
    d.innerHTML = `<strong>${w.name}</strong> – ${w.duration}min – Séries: ${w.sets} – <a href="${w.url}" target="_blank">Tutoriel</a>`;
    display.appendChild(d);
  });
}

showDay(currentDay);
