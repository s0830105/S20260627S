import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  set,
  remove
}from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

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
async function loadStats(){

  const response =
    await fetch("./guests.json");

  const guests =
    await response.json();

  const snapshot =
    await get(
      ref(db, "checkins")
    );
console.log(snapshot.val());
console.log(snapshot.exists());
  const checkedCount =
    snapshot.exists()
      ? Object.keys(snapshot.val()).length
      : 0;

  const totalCount =
    guests.length;

  const unCheckedCount =
    totalCount - checkedCount;

  const rate =
    Math.round(
      checkedCount / totalCount * 100
    );

  document.getElementById("stats").innerHTML = `
    🟢 已簽到：${checkedCount} 人<br>
    🔴 未簽到：${unCheckedCount} 人<br>
    📊 簽到率：${rate}%
  `;
}
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
const checkinSnapshot =
  await get(
    ref(db, `checkins/${name}`)
  );

const isCheckedIn =
  checkinSnapshot.exists() &&
  checkinSnapshot.val().checkedIn === true;

console.log(checkinSnapshot.val());
console.log(isCheckedIn);
  
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
${isCheckedIn ? "🟢 已簽到" : "🔴 未簽到"}
</p>

${
  isCheckedIn
  ? `
    <p>簽到時間：${checkinSnapshot.val().time}</p>

    <button
      onclick="cancelCheckIn('${guest.name}')"
      style="
        background:#ff4d4f;
        color:white;
        border:none;
        padding:10px 20px;
        border-radius:8px;
        cursor:pointer;
      "
    >
      ❌取消簽到
    </button>
    `
  : `
    <button onclick="checkIn('${guest.name}')">
      我要簽到
    </button>
    `
}
  <hr>

  <h4>同桌貴賓</h4>

  ${guestList}
  `;

showMap(guest.table);

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

document.getElementById("searchInput").value = name;

await searchGuest();

await loadStats();
}
window.checkIn = checkIn;
async function cancelCheckIn(name){

  const ok = confirm(
    `確定取消 ${name} 的簽到嗎？`
  );

  if(!ok) return;

  await remove(
    ref(db,"checkins/" + name)
  );

  alert(`${name} 已取消簽到`);

  await searchGuest();
  await loadStats();

}

window.cancelCheckIn = cancelCheckIn;
loadStats();

function showMap(table){

  table = Number(table);
const positions = {

  1:{ top:"27%", left:"50%" },

  2:{ top:"43%", left:"82%" },

  3:{ top:"43%", left:"18%" },

  4:{ top:"66%", left:"18%" },

  5:{ top:"66%", left:"82%" },

  6:{ top:"89%", left:"18%" },

  7:{ top:"89%", left:"50%" },

  8:{ top:"89%", left:"82%" }

};
const sizes = {
  1: 130,
  2: 95,
  3: 95,
  4: 95,
  5: 95,
  6: 95,
  7: 105,
  8: 95
};
  const pos = positions[table];
console.log("桌號=",table);
console.log("位置=",pos);
  document.getElementById("mapContainer").innerHTML=`
    <div class="map-wrapper">

      <img
        src="floorplan.png"
        class="floor-map"
      >

    <div
  class="highlight"
  style="
    top:calc(${pos.top} - 8px);
    left:calc(${pos.left} - 8px);
  ">
</div>
    </div>
  `;
}
