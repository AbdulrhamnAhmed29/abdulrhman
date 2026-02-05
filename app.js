// =============== COUNTDOWN ===============
const examDate = new Date("June 20, 2026").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const diff = examDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("countdown").innerText =
    `باقي ${days} يوم على الحلم`;
}, 1000);

// =============== TIMER ===============
let timerInterval;
let seconds = 0;

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  const hours = Math.floor(seconds / 3600);
  saveStudyTime(hours);
  Swal.fire("🔥 شغل عالي!", "ربنا يبارك في وقتك", "success");
}

function updateTimer() {
  let h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  let m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  let s = String(seconds % 60).padStart(2, "0");
  document.getElementById("timer").innerText = `${h}:${m}:${s}`;
}

function saveStudyTime(h) {
  let total = Number(localStorage.getItem("studyHours")) || 0;
  total += h;
  localStorage.setItem("studyHours", total);
  document.getElementById("studyHours").innerText = total;
}

// =============== WASTED TIME ===============
function logWaste() {
  let waste = Number(localStorage.getItem("waste")) || 0;
  waste++;
  localStorage.setItem("waste", waste);
  document.getElementById("wastedTime").innerText = waste;
  Swal.fire("⚠️ انتبه", "الوقت رأس مالك", "warning");
}

// =============== SUBJECTS ===============
function addSubject() {
  const input = document.getElementById("subjectInput");
  const li = document.createElement("li");
  li.innerText = input.value;
  document.getElementById("subjectsList").appendChild(li);
  input.value = "";
}

// =============== HABITS ===============
function saveHabit(habit) {
  localStorage.setItem(habit, true);
}

// =============== MOOD ===============
function saveMood(mood) {
  localStorage.setItem("mood", mood);
}
