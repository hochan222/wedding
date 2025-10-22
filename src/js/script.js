// https://github.com/jhammann/sakura/tree/master
var sakura = new Sakura("body", {
  blow: 0.8,
  lifeTime: 5500,
});

// count down
const targetDate = new Date("2025-06-15T00:00:00").setHours(0, 0, 0, 0);
const currentDate = new Date().setHours(0, 0, 0, 0);

const timeRemaining = targetDate - currentDate;
const days = timeRemaining / (1000 * 60 * 60 * 24);

let message;
if (days > 0) {
  message = `호찬 ♥️ 현주의 결혼식이 ${days}일 남았습니다.`;
} else if (days === 0) {
  message = "오늘은 호찬 ♥️ 현주의 결혼식입니다!";
} else {
  message = `호찬 ♥️ 현주의 결혼식이 ${Math.abs(days)}일 지났습니다.`;
}

document.getElementById("countdown").innerHTML = message;

// timeline count down
function updateTime() {
  const firstDate = document
    .querySelector(".our_date")
    .getAttribute("firstdate");
  const firstDateTime = new Date(firstDate);
  const currentTime = new Date();

  const diff = currentTime - firstDateTime; // 경과 시간 (밀리초 단위)

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.4167); // 평균 월 길이 (30.4167일)
  const years = Math.floor(months / 12);

  const remainingDays = days % 30.4167;
  const remainingMonths = months % 12;

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  const timeString = `${years}년 ${remainingMonths}개월 ${Math.floor(
    remainingDays
  )}일 ${remainingHours}시간 ${remainingMinutes}분 ${remainingSeconds}초`;

  document.querySelector(".our_date").textContent = `"${timeString}"`;
}
setInterval(updateTime, 1000);
updateTime();

// gallery
new Swiper("#we-swiper-container", {
  slidesPerView: 1,
  spaceBetween: 10,
  effect: "cards",
  grabCursor: true,
  pagination: {
    el: "#we-swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#we-swiper-button-next",
    prevEl: "#we-swiper-button-prev",
  },
});

new Swiper("#food-swiper-container", {
  slidesPerView: 1,
  spaceBetween: 10,
  effect: "cards",
  grabCursor: true,
  pagination: {
    el: "#food-swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#food-swiper-button-next",
    prevEl: "#food-swiper-button-prev",
  },
});

// form
function openForm() {
  document.getElementById("rsvpPopup").style.display = "block";
}

function closeForm() {
  document.getElementById("rsvpPopup").style.display = "none";
}

document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();
  closeForm();

  const formData = {
    name: this.name.value,
    type: this.type.value,
    attendance: this.attendance.value,
  };

  const gscriptUrl = `https://script.google.com/macros/s/AKfycbwbPc8zt_gKDrSqiTdeXzKNknGXc49AIikMOZexuQc-Wyazu_NHdRFHNhrbu5_CizwsXQ/exec`;
  const body = {
    name: this.name.value,
    type: this.type.value,
    attendance: this.attendance.value,
    count: this.guests.value,
    // meta: {
    //   objects: 'turn',
    //   out: 'pretty',
    //   weird: 'too'
    // }
  };
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify(body),
  };

  fetch(gscriptUrl, fetchOptions)
    .then((res) => res.json())
    .then((data) => {
      alert("응답이 저장되었습니다!");
    })
    .then(console.log)
    .catch((err) => {
      console.error("Error:", err);
      alert("오류 발생했어요! 다시 시도해주세요.");
    });
});

function openGuestbook() {
  document.getElementById("guestbookPopup").style.display = "block";
}

function closeGuestbook() {
  document.getElementById("guestbookPopup").style.display = "none";
}

document
  .getElementById("guestbookForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    closeGuestbook();

    const name = this.guestName.value;
    const message = this.guestMessage.value;

    const gscriptUrl = `https://script.google.com/macros/s/AKfycbxG_2066v4oF59miftkFkYj7I4HR9tTt7Y5wmTw2jAMnqNkRCtb4vJ6zHQ_rg7k0vn5/exec`;
    const body = { name, message };
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(body),
    };

    fetch(gscriptUrl, fetchOptions)
      .then((res) => res.json())
      .then(() => {
        alert("메시지가 저장되었습니다! 감사합니다 💕");
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("오류가 발생했어요. 다시 시도해주세요!");
      });
  });

// account
function toggleAccounts(side) {
  var accountsId = side === "groom" ? "groomAccounts" : "brideAccounts";
  var accounts = document.getElementById(accountsId);
  var btn = document.querySelector(
    `.toggle-btn[onclick="toggleAccounts('${side}')"]`
  );
  if (accounts.style.display === "none") {
    accounts.style.display = "block";
    btn.classList.add("active");
  } else {
    accounts.style.display = "none";
    btn.classList.remove("active");
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      alert("계좌 정보가 복사되었습니다: " + text);
    },
    function (err) {
      console.error("복사 실패: ", err);
    }
  );
}

// image load
let imagesLoaded = false;

function loadAllImages() {
  if (imagesLoaded) return;
  imagesLoaded = true;

  console.log("loadAllImages");
  document.querySelectorAll("img[data-src]").forEach((img) => {
    img.setAttribute("src", img.getAttribute("data-src"));
    img.classList.add("loaded");
  });
}

if (document.readyState === "complete") {
  loadAllImages();
} else {
  window.addEventListener("load", loadAllImages);
  document.addEventListener("DOMContentLoaded", loadAllImages);
}
