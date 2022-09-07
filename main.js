let p = document.getElementById("nama");
const yourNameKey = "YOUR_NAME";
const wadahBuku = "BOOK_CONTAINER";

let wadah = [];
let cariBtn = document.getElementById("cari");
let editBtn = document.getElementById("editBtn");
let btlEditBtn = document.getElementById("btlEdit");
let idEdit;


function checkWS() {
    return typeof(Storage) !== "undefined";
}

function getResult() {
    if (checkWS()) {
        if (localStorage.getItem(wadahBuku) !== null) {
            return JSON.parse(localStorage.getItem(wadahBuku));
        } else {
            return [];
        }

    } else {
        return [];
    }

}

function addBook(data) {
    if (checkWS) {
        if (localStorage.getItem(wadahBuku) !== null) {
            wadah = JSON.parse(localStorage.getItem(wadahBuku));
        }
        wadah.push(data);
        localStorage.setItem(wadahBuku, JSON.stringify(wadah));
    }
}

function deleteBook(id) {
    wadah = getResult();
    for (let i of wadah) {
        // console.log(i);
        for (let j in i) {
            if (i['id'] === id) {
                if (window.confirm("APAKAH ANDA INGIN MENGHAPUS BUKU INI?") == true) {
                    wadah.splice(i, 1);
                    alert("Buku Ini Telah Terhapus");
                    localStorage.setItem(wadahBuku, JSON.stringify(wadah));
                    break;
                } else {
                    alert("Anda Telah Membatalkan Proses Ini");
                    break;
                }
            }
        }
    }
    document.location.reload();
    // renderBook();
    // document.location.reload();
}

function completeBook(id) {
    wadah = getResult();
    let tmp;
    for (let i of wadah) {
        // console.log(i);
        for (let j in i) {
            if (i['id'] === id) {
                i['isComplete'] = true;
                // result.indexOf(i)[j.isComplete] = i[j].isComplete;
                localStorage.setItem(wadahBuku, JSON.stringify(wadah));
                document.location.reload();
            }
        }
    }
}

function nCompleteBook(id) {
    wadah = getResult();
    for (let i of wadah) {
        // console.log(i);
        for (let j in i) {
            if (i['id'] === id) {
                i['isComplete'] = false;
                localStorage.setItem(wadahBuku, JSON.stringify(wadah));

            }
        }
    }
    document.location.reload();
    // renderBook();
}

function setEditBook(id, nama, author, year) {
    wadah = getResult();
    for (let i of wadah) {
        for (let j in i) {
            if (i['id'] === id) {
                i['judul'] = nama;
                i['author'] = author;
                i['year'] = year;
                localStorage.setItem(wadahBuku, JSON.stringify(wadah));
            }
        }
    }
    alert("Buku telah berhasil diperbaharui");
    document.location.reload();
}

function editBook(id) {
    let modal = document.getElementById("modal-box");

    let jdl = document.getElementById("editJdl");
    let atr = document.getElementById("editAtr");
    let yr = document.getElementById("editYr");


    let jdlTxt, atrTxt, yrTxt, iscV;
    wadah = getResult();
    for (let i of wadah) {
        // console.log(i);
        for (let j in i) {
            if (i['id'] === id) {
                modal.style.display = "flex";
                document.body.style.backgroundColor = "rgba(238, 232, 235, 0.76)";

                idEdit = i['id'];
                jdlTxt = i['judul'];
                atrTxt = i['author'];
                yrTxt = i['year'];

            }
        }
    }
    jdl.value = jdlTxt;
    atr.value = atrTxt;
    yr.value = yrTxt;
}

function searchBook(nama) {
    let form_sudah = document.getElementById("form_telah_dibaca");
    let form_belum = document.getElementById("form_belum_dibaca");
    form_sudah.innerHTML = "";
    form_belum.innerHTML = "";
    let c;
    let con = document.createElement("div");
    let one = document.createElement("div");
    // let checker = [];
    if (nama !== "") {
        for (let i of wadah) {
            // checker.push(i['judul']);
            if (i.judul.toLowerCase().indexOf(nama.toLowerCase()) > -1) {
                one.classList.add("one");

                con.innerHTML = "<h3>" + i.judul + "</h3>";
                con.innerHTML += "<p>Pengarang: " + i.author + "</p>";
                con.innerHTML += "<p>Tahun Terbit: " + i.year + "</p>";

                if (i.isComplete == true) {
                    one.innerHTML = "<button class='ulang' type='button' onclick='nCompleteBook(" + i.id + ")'>ULANGI</button><button type='button' class='edit' onclick='editBook(" + i.id + ")'  class='edit' >EDIT</button><button type='button' onclick='deleteBook(" + i.id + ")'class='hapus'>HAPUS</button>";
                    con.appendChild(one);
                    form_sudah.innerHTML = "<h1>Buku yang telah dibaca</h1>" + "<div class='container-buku'>" + con.innerHTML + "</div>";
                } else {
                    one.innerHTML = "<button class='selesai' type='button' onclick='completeBook(" + i.id + ")'>SUDAH SELESAI</button><button type='button'onclick='editBook(" + i.id + ")'  class='edit' >EDIT</button><button type='button' onclick='deleteBook(" + i.id + ")'class='hapus'>HAPUS</button>";
                    con.appendChild(one);
                    form_belum.innerHTML = "<h1>Buku yang belum dibaca</h1>" + "<div class='container-buku'>" + con.innerHTML + "</div>";
                }
            }
            // console.log(i['judul'].toLowerCase());
            // console.log(i['judul'].toLowerCase().indexOf(nama.toLowerCase()));
            // console.log(nama.toLowerCase());
        }
        // console.log(checker);
    } else {
        renderBook();
    }
}


function renderBook() {
    let form_sudah = document.getElementById("form_telah_dibaca");
    let form_belum = document.getElementById("form_belum_dibaca");

    wadah = getResult();

    if (wadah !== []) {
        for (let s of wadah) {
            let con = document.createElement("div");
            let one = document.createElement("div");
            con.classList.add("container-buku");
            one.classList.add("one");
            con.innerHTML = "<h3>" + s.judul + "</h3>";
            con.innerHTML += "<p>Pengarang: " + s.author + "</p>";
            con.innerHTML += "<p>Tahun Terbit: " + s.year + "</p>";
            // con.innerHTML += "<p> Selesai dibaca: " + s.isComplete + "</p>";

            if (s.isComplete == true) {
                // form_sudah.appendChild(con);
                one.innerHTML = "<button class='ulang' type='button' onclick='nCompleteBook(" + s.id + ")'>Ulangi</button><button type='button' class='edit' onclick='editBook(" + s.id + ")'  class='edit' >Edit</button><button type='button' onclick='deleteBook(" + s.id + ")'class='hapus'>Hapus</button>";
                con.appendChild(one);
                form_sudah.appendChild(con);
                // form_sudah.appendChild(one);
            } else {

                one.innerHTML = "<button class='selesai' type='button' onclick='completeBook(" + s.id + ")'>Sudah Selesai</button><button type='button'onclick='editBook(" + s.id + ")'  class='edit' >Edit</button><button type='button' onclick='deleteBook(" + s.id + ")'class='hapus'>Hapus</button>";
                con.appendChild(one);
                form_belum.appendChild(con);
            }
        }
    }
}


window.addEventListener("load", function() {
    hasilCari = document.getElementById("pencarian");
    if (checkWS()) {
        if (localStorage.getItem(yourNameKey) === null) {
            let name = prompt("Silahkan masukkan nama Anda");
            localStorage.setItem(yourNameKey, name);
            p.innerText = localStorage.getItem(yourNameKey) + " Bookshelf";
        } else {
            p.innerText = localStorage.getItem(yourNameKey) + " Bookshelf";
        }
        if (localStorage.getItem(wadahBuku) !== null)
            renderBook();
    } else {
        alert("Browser anda belum mendukung Web Storage.")
    }
});

const submitButton = document.getElementById("form_input_action");
submitButton.addEventListener("submit", function(event) {
    const jdl = document.getElementById("title").value;
    const atr = document.getElementById("author").value;
    const yr = document.getElementById("year").value;
    const isC = document.getElementById("isComplete").checked;
    const newBook = {
        id: +new Date(),
        judul: jdl,
        author: atr,
        year: yr,
        isComplete: isC
    };

    addBook(newBook);
    alert("Buku Berhasil Ditambahkan");
    renderBook();
});

cariBtn.addEventListener("keyup", function() { searchBook(document.getElementById("cari").value); });
editBtn.addEventListener("click", function() { setEditBook(idEdit, document.getElementById("editJdl").value, document.getElementById("editAtr").value, document.getElementById("editYr").value) });
btlEditBtn.addEventListener("click", function() {
    let modal = document.getElementById("modal-box");
    modal.style.display = "none";
    document.body.style.backgroundColor = "white";
})