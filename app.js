import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

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

console.log("Firebase連線成功");
