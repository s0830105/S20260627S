import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCY-ZuOIT0gJsqA5ep1WcMcQpw8Hk_EdpI",
  authDomain: "s20260627-ea381.firebaseapp.com",
  databaseURL: "https://s20260627-ea381-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "s20260627-ea381",
  storageBucket: "s20260627-ea381.firebasestorage.app",
  messagingSenderId: "282846563979",
  appId: "1:282846563979:web:6e461c51d133600bbd8e8e",
  measurementId: "G-W9VQDZV37P"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
async function searchGuest() {

  const name =
    document.getElementById("searchInput").value.trim();

  const result =
    document.getElementById("result");

  const response =
    await fetch("./guests.json");

  const guests =
    await response.json();

  const guest =
    guests.find(
      g => g.name === name
    );

  if (!guest) {

    result.innerHTML =
      "查無資料";

    return;
  }

  const sameTableGuests = guests.filter(
  g => g.table === guest.table
);

const guestList = sameTableGuests
  .map(g => g.name)
  .join("<br>");

result.innerHTML = `
  <h3>${guest.name}</h3>

  <p>桌號：${guest.table}</p>

  <p>桌名：${guest.tableName}</p>

  <p>
  ${guest.checkedIn ? "🟢 已簽到" : "🔴 未簽到"}
  </p>

<button onclick="checkIn('${guest.name}')">
我要簽到
</button>
  <hr>

  <h4>同桌貴賓</h4>

  ${guestList}
`;
}

window.searchGuest = searchGuest;

const searchInput =
document.getElementById("searchInput");

const suggestions =
document.getElementById("suggestions");

searchInput.addEventListener(
  "input",
  async function () {

    const keyword =
      this.value.trim();

    if (!keyword) {

      suggestions.innerHTML = "";

      return;
    }

    const response =
      await fetch("./guests.json");

    const guests =
      await response.json();

    const matched =
      guests.filter(
        g => g.name.includes(keyword)
      );

    suggestions.innerHTML =
      matched
      .slice(0, 10)
      .map(g => `
        <div
          class="suggestion-item"
          onclick="
            document.getElementById('searchInput').value='${g.name}';
            document.getElementById('suggestions').innerHTML='';
          ">
          ${g.name}
        </div>
      `)
      .join("");

  }
);

async function checkIn(name){

  await set(
    ref(db, "checkins/" + name),
    {
      name: name,
      checkedIn: true,
      time: new Date().toLocaleString()
    }
  );

  alert(name + " 簽到成功");

}

window.checkIn = checkIn;
