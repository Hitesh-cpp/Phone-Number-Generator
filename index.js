const generate_btn = document.querySelector(".generate-btn");
const select = document.getElementById("NumberType");
const input = document.querySelector(".prefix");
const output = document.querySelector("p");
const consoleHeading = document.querySelector(".console_heading");
const consoleBox = document.querySelector(".console");
const copy_btn = document.querySelector(".copy-btn");

let csvData = "";
let allNumbers = ""; // make this global so copy() can use it

select.addEventListener("change", function () {
  input.value = select.value;
});

generate_btn.addEventListener("click", Generate);
copy_btn.addEventListener("click", copy);

function Generate() {
  const prefix = input.value.trim();
  const count = parseInt(document.querySelector(".numbers").value);
  const digitsToGenerate = 12 - prefix.length;
  allNumbers = ""; 
  csvData = "Phone Number\n";

  consoleBox.classList.remove("hidden")

  for (let j = 0; j < count; j++) {
    let generatedSuffix = "";
    for (let i = 0; i < digitsToGenerate; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      generatedSuffix += randomDigit;
    }
    const fullNumber = prefix + generatedSuffix;
    allNumbers += fullNumber + "\n";
    csvData += fullNumber + "\n";
  }

  consoleHeading.innerText = "Phone Numbers";

  if (count > 40) {
    output.innerText = "📥 Numbers Generated! Downloading CSV...";
    DownloadCSV();
  } else {
    output.innerText = allNumbers;
  }
}

function DownloadCSV() {
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "pakistani_numbers.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  output.innerText = "✅ CSV file downloaded successfully!";
}

function copy() {
  if (!allNumbers) {
    alert("⚠️ No numbers to copy!");
    return;
  }

  navigator.clipboard.writeText(allNumbers).then(() => {
    copy_btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
    setTimeout(() => {
      copy_btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
    }, 1500);
  });
}
