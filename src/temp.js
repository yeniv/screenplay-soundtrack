// js scraper
fetch("https://www.imsdb.com/scripts/Black-Panther.html")
.then(response => response.text())
.then(data => {
console.log(data.match(/(?:<td class="scrtext">)([\s\S]*)(?:<\/td>)/)[1])
})

//
async function fetchMovie() {
 let response = await fetch("https://www.imsdb.com/scripts/Black-Panther.html");
 let data = await response.text();
 return data.match(/(?:<td class="scrtext">)([\s\S]*)(?:<\/td>)/)[1]
}

let movie = fetchMovie()
//

async function fetchMovie() {
 let response = await fetch("https://www.imsdb.com/scripts/Black-Panther.html");
 let data = await response.text();
 console.log(data.match(/(?:<td class="scrtext">)([\s\S]*)(?:<\/td>)/)[1])
}

//

fetch("https://www.imsdb.com/scripts/Black-Panther.html")
.then(response => response.text())
.then(data => {
const hello = data.match(/(?:<td class="scrtext">)([\s\S]*)(?:<\/td>)/)[1]
})
