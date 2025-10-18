const generate_btn = document.querySelector("button");
const select = document.getElementById("NumberType");
const input = document.querySelector(".prefix");
const output = document.querySelector("p");
const console = document.querySelector(".console_heading")

let csvData = ""; 

select.addEventListener("change", function() {
    input.value = select.value;
});

generate_btn.addEventListener("click", Generate);

function Generate() {
    const prefix = document.querySelector(".prefix").value.trim();
    const count = parseInt(document.querySelector(".numbers").value);
    const digitsToGenerate = 12 - prefix.length;
    let allNumbers = "";
    csvData = "Phone Number\n";

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
        console.innerText = "Phone Numbers";
    if (count > 40) {
        output.innerText = "📥 Numbers Generated! Downloading CSV...";
        
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
