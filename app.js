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

 <h1 style="color:red">
測試成功
</h1>

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
