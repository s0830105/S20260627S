import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCY-ZuOIT0gJsqA5ep1WcMcQpw8Hk_EdpI",
  authDomain: "s20260627-ea381.firebaseapp.com",
  databaseURL: "https://s20260627-ea381-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "s20260627-ea381",
  storageBucket: "s20260627-ea381.firebasestorage.app",
  messagingSenderId: "282846563979",
  appId: "1:282846563979:web:6e461c51d133600bbd8e8e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.searchGuest = async function () {

    const keyword =
        document.getElementById("searchInput").value.trim();

    const result =
        document.getElementById("result");

    if (!keyword) {

        result.innerHTML = "請輸入姓名";

        return;
    }

    try {

        const snapshot =
            await get(ref(db, "guests"));

        const guests =
            snapshot.val();

        const guest =
            guests.find(g => g.name === keyword);

        if (!guest) {

            result.innerHTML = "查無資料";

            return;
        }

        result.innerHTML = `
            <h3>${guest.name}</h3>

            <p>桌號：${guest.table}</p>

            <p>桌名：${guest.tableName}</p>

            <p>
            ${
                guest.checkedIn
                ? "🟢 已簽到"
                : "🔴 未簽到"
            }
            </p>
        `;

    } catch(error){

        console.error(error);

        result.innerHTML =
        "讀取資料失敗";
    }
}
