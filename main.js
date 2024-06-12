import "./style.css";
import dayjs from "dayjs";

let formInput = document.getElementById("formInput");
let parent = document.getElementById("parent");

function createData(event) {
  // agar halaman tidak me reload setelah submit
  event.preventDefault();

  let catatan = event.target.catatan.value;

  console.log(catatan);

  let dataStorage = localStorage.getItem("dataStorage");

  if (dataStorage == null) {
    localStorage.setItem("dataStorage", "[]");
  }

  dataStorage = localStorage.getItem("dataStorage");

  let dataStorageJSON = JSON.parse(dataStorage);

  dataStorageJSON.push({
    id: dayjs().format(),
    catatan: catatan,
    data: dayjs().format(),
  });
  localStorage.setItem("dataStorage", JSON.stringify(dataStorageJSON));

  event.target.catatan.value = " ";
  alert("Data berhasil ditambahkan");

  window.location.reload();
}

// component contecard
function noteCard(id, content, date) {
  // kita buat elmen div
  let div = document.createElement("div");
  div.setAttribute("id", id);
  div.setAttribute(
    "class",
    "w-full min-h-[120px] p-2 flex flex-col bg-white shadow-md rounded-md relative mt-4"
  );

  let p = document.createElement("p");
  p.setAttribute("class", "font-light");
  p.textContent = content;

  // buat elment small
  let small = document.createElement("small");
  small.setAttribute("class", "italic text slate-500 text-xs mt-auto");
  small.textContent = date;

  // buat element button close
  let buttonClose = document.createElement("button");
  buttonClose.setAttribute(
    "class",
    "w-10 h-10 bg-red-500 flex justify-center items-center rounded-md absolute right-2 text-white"
  );
  buttonClose.textContent = "X";
  buttonClose.addEventListener("click", () => {
    deleteCard(id);
  });

  // kita masukan element p, small, dan button ke dalam elment div
  div.appendChild(p);
  div.appendChild(small);
  div.appendChild(buttonClose);

  return div;
}

// dunvtion ununk merender data dari localStorage ke html
function renderToHtml() {
  // kita ambil data dari localstorage
  let dataStorage = localStorage.getItem("dataStorage");

  // jika tidak ada data di localstorage maka abaikan
  if (dataStorage == null) {
    return;
  }

  // ubah data string dari storage data menjadi object
  let dataStorageJSON = JSON.parse(dataStorage);

  // maping data dari storageDataJson ke html
  dataStorageJSON.reverse().map((e) => {
    parent.appendChild(noteCard(e.id, e.catatan, e.date));
  });
}

function deleteCard(id) {
  window.confirm("apakah anda akan delete data");
  if (!confirm) {
    return;
  }

  let dataStorage = localStorage.getItem("dataStorage");
  let dataStorageJson = JSON.parse(dataStorage);

  let newArray = dataStorageJson.filter((e) => {
    return e.id != id;
  });

  localStorage.setItem("dataStorage", JSON.stringify(newArray));
  window.location.reload();
}
renderToHtml();
formInput.addEventListener("submit", createData);
