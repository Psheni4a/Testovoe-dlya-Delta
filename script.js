let openedChartRow = null;
let currentChart = null;
let openedMetricRow = null;

document.querySelectorAll(".metric-row").forEach((row) => {
  row.addEventListener("click", function () {
    if (openedMetricRow === row) {
      openedChartRow.remove();
      currentChart.destroy();

      openedChartRow = null;
      currentChart = null;
      openedMetricRow = null;
      return;
    }

    if (openedChartRow) {
      openedChartRow.remove();
      currentChart.destroy();
    }

    const chartRow = document.createElement("tr");
    chartRow.className = "chart-row";

    const chartCell = document.createElement("td");
    chartCell.colSpan = 4;

    const canvas = document.createElement("canvas");
    chartCell.appendChild(canvas);
    chartRow.appendChild(chartCell);

    row.after(chartRow);

    const METRIC_DATA = {
      revenue: [120000, 300000, 450000, 380000, 420000, 500521],
      cash: [100000, 50000, 100000, 150000, 300000, 300000],
      noncash: [10000, 20000, 18000, 25000, 30000, 34000],
      creditcards: [100342, 85602, 125555, 95521, 100521, 100521],
      midcheck: [850, 500, 700, 1000, 900, 1300],
      midguest: [750, 300, 800, 1120, 900, 1200],
      deletafrpayment: [1500, 0, 100, 200, 1100, 1100],
      deletbfrpayment: [1000, 700, 800, 700, 1300, 1300],
      checks: [33, 20, 23, 30, 36, 34],
      guests: [33, 20, 23, 30, 36, 34],
    };

    const key = row.dataset.metric;
    const data = METRIC_DATA[key];
    if (!data) {
      console.warn("Нет данных для метрики:", key);
      return;
    }

    currentChart = new Chart(canvas, {
      type: "line",
      data: {
        labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        datasets: [
          {
            label: row.cells[0].innerText,
            data: data,
            borderWidth: 2,
          },
        ],
      },
    });

    openedChartRow = chartRow;
    openedMetricRow = row;
  });
});
