// Canvas data set
const context = document.getElementById("data-set").getContext("2d");
const line = new Chart(context, {});

// Values from the form
const initialAmount = document.getElementById("initialamount");
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const compound = document.getElementById("compound");

// Message
const message = document.getElementById("message");

//The calculate button
const button = document.querySelector(".input-group button");
// Attach event listener
button.addEventListener("click", calculateGrowth);

const data = [];
const labels = [];

function calculateGrowth(e) {
  e.preventDefault();
  data.length = 0;
  labels.length = 0;
  let growth = 0;

  try {
    const initial = parseInt(initialAmount.value);
    const period = parseInt(years.value);
    const interest = parseInt(rates.value);
    const comp = parseInt(compound.value);

    for (let i = 1; i <= period; i++) {
      const final = initial * Math.pow(1 + interest / 100 / comp, comp * i);
      data.push(toDecimal(final, 2));
      labels.push("Year" + i);
      growth = toDecimal(final, 2);
    }
    //
    message.innerText = `You will have $${growth} after ${period} years from the power of compounding!`;
    drawGraph();
  } catch (error) {
    console.error(error);
  }
}

function drawGraph() {
  line.destroy();
  line = new Chart(context, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Compounded Value",
          data,
          fill: true,
          backgroundColor: "rgba(255, 255, 255, 255)",
          borderWidth: 3,
        },
      ],
    },
  });
}

function toDecimal(value, decimals) {
  return +value.toFixed(decimals);
}

// const formattedNumber = value.toLargeString();
