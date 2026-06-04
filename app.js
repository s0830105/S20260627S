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

  <hr>

  <h4>同桌貴賓</h4>

  ${guestList}
`;
}

window.searchGuest = searchGuest;
