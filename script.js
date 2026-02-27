// ===== Utils =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// ===== Year in footer =====
$("#year").textContent = String(new Date().getFullYear());

// ===== Button interaction =====
const ctaBtn = $("#ctaBtn");
const ctaResult = $("#ctaResult");

const messages = [
  "Кнопка работает ✅ Это JavaScript.",
  "Хорошо! Дальше можно делать интерактивные дашборды.",
  "Ты уже на пути к настоящему веб-приложению 💪",
  "Следующий шаг: хранить данные и строить страницы динамически."
];

ctaBtn.addEventListener("click", () => {
  const i = Math.floor(Math.random() * messages.length);
  ctaResult.textContent = messages[i];

  // маленькая “анимация подтверждения”
  ctaBtn.animate(
    [{ transform: "translateY(0)" }, { transform: "translateY(-2px)" }, { transform: "translateY(0)" }],
    { duration: 220, iterations: 1 }
  );
});

// ===== Reveal on scroll =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);

$$(".reveal").forEach((el) => observer.observe(el));

// ===== Portfolio filters =====
const chips = $$(".chip");
const projects = $$(".proj");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("chip--active"));
    chip.classList.add("chip--active");

    const filter = chip.dataset.filter;
    projects.forEach((p) => {
      const tags = (p.dataset.tags || "").split(",").map((t) => t.trim());
      const show = filter === "all" ? true : tags.includes(filter);
      p.style.display = show ? "" : "none";
    });
  });
});

// ===== Contact form (client-side validation) =====
const form = $("#contactForm");
const status = $("#formStatus");
const clearBtn = $("#clearBtn");

function setStatus(text, ok = true) {
  status.textContent = text;
  status.style.color = ok ? "rgba(255,255,255,0.75)" : "rgba(255,170,170,0.9)";
}

function validateEmail(email) {
  // простая, но практичная проверка
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $("#name").value.trim();
  const email = $("#email").value.trim();
  const message = $("#message").value.trim();

  if (name.length < 2) return setStatus("Имя должно быть минимум 2 символа.", false);
  if (!validateEmail(email)) return setStatus("Проверь email — формат выглядит неверно.", false);
  if (message.length < 10) return setStatus("Сообщение должно быть минимум 10 символов.", false);

  // Здесь обычно отправляют на сервер (fetch/AJAX).
  // Мы имитируем успех локально:
  setStatus("Готово! Форма заполнена корректно ✅ (Локальная версия — без реальной отправки)");

  form.reset();
});

clearBtn.addEventListener("click", () => {
  form.reset();
  setStatus("");
});