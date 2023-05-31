document.addEventListener("DOMContentLoaded", () => {
  const playersContainer = document.getElementById("players-container");
  const teamForm = document.getElementById("team-form");

  for (let i = 0; i < 10; i++) {
    const playerDiv = document.createElement("div");
    playerDiv.innerHTML = `
          <label class="heading-4">Jugador ${i + 1}</label>
          <label class="heading-6" for="player-name-${i}">Nombre:</label>
          <input class="form-control heading-6" type="text" id="player-name-${i}" required>
          <label class="heading-6" for="player-height-${i}">Altura (m):</label>
          <input class="form-control heading-6" type="number" step="0.01" id="player-height-${i}" required>
          <label class="heading-6" for="player-weight-${i}">Peso (kg):</label>
          <input class="form-control heading-6" type="number" step="0.1" id="player-weight-${i}" required>
          <label class="heading-6" for="player-bmi-${i}">IMC:</label>
          <input class="form-control heading-6" type="number" step="0.1" id="player-bmi-${i}" readonly>
      `;
    playersContainer.appendChild(playerDiv);

    const playerNameInput = document.getElementById(`player-name-${i}`);
    const playerHeightInput = document.getElementById(`player-height-${i}`);
    const playerWeightInput = document.getElementById(`player-weight-${i}`);
    const playerBmiInput = document.getElementById(`player-bmi-${i}`);

    const updateBmi = () => {
      const height = parseFloat(playerHeightInput.value);
      const weight = parseFloat(playerWeightInput.value);

      if (!isNaN(height) && !isNaN(weight) && height > 0) {
        const bmi = weight / (height * height);
        playerBmiInput.value = bmi.toFixed(1);
      } else {
        playerBmiInput.value = "";
      }
    };

    playerHeightInput.addEventListener("input", updateBmi);
    playerWeightInput.addEventListener("input", updateBmi);
  }

  teamForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const teamName = document.getElementById("team-name").value;
    const playersData = [];

    for (let i = 0; i < 10; i++) {
      const playerName = document.getElementById(`player-name-${i}`).value;
      const playerHeight = document.getElementById(`player-height-${i}`).value;
      const playerWeight = document.getElementById(`player-weight-${i}`).value;
      const playerBmi = document.getElementById(`player-bmi-${i}`).value;

      playersData.push({
        name: playerName,
        height: playerHeight,
        weight: playerWeight,
        bmi: playerBmi,
      });
    }

    generatePDF(teamName, playersData);
    generateExcel(teamName, playersData);
  });
});

// function generatePDF(teamName, playersData) {
//   const doc = new jsPDF();

//   doc.setFontSize(18);
//   doc.text(`Equipo de Fútbol: ${teamName}`, 10, 20);

//   const columns = 3;
//   const columnSpacing = 65;
//   const lineHeight = 6;
//   const labelFontSize = 12;
//   const valueFontSize = 10;
//   let currentColumn = 0;
//   let currentY = 30;

//   playersData.forEach((player, index) => {
//       const x = 10 + currentColumn * columnSpacing;

//       // Labels
//       doc.setFontSize(labelFontSize);
//       doc.text(`Jugador ${index + 1}:`, x, currentY);
//       doc.text("Altura:", x, currentY + lineHeight);
//       doc.text("Peso:", x, currentY + lineHeight * 2);
//       doc.text("IMC:", x, currentY + lineHeight * 3);

//       // Valores
//       doc.setFontSize(valueFontSize);
//       doc.text(`${player.name}`, x + columnSpacing / 2, currentY, { align: "center" });
//       doc.text(`${player.height}m`, x + columnSpacing / 2, currentY + lineHeight, { align: "center" });
//       doc.text(`${player.weight}kg`, x + columnSpacing / 2, currentY + lineHeight * 2, { align: "center" });
//       doc.text(`${player.bmi}`, x + columnSpacing / 2, currentY + lineHeight * 3, { align: "center" });

//       currentColumn++;
//       if (currentColumn === columns) {
//           currentColumn = 0;
//           currentY += lineHeight * 6;
//       }
//   });

//   doc.save(`${teamName}.pdf`);
// }
function generatePDF(teamName, playersData) {
  // Crear un contenedor div para los datos del PDF
  const pdfContainer = document.createElement('div');
  pdfContainer.style.fontFamily = 'Arial, sans-serif';
  pdfContainer.innerHTML = `
      <h1 style="text-align: center;" class="heading-1">Equipo de Fútbol: ${teamName}</h1>
  `;
  
  playersData.forEach((player, index) => {
      const playerInfo = `
          <div style="display: inline-block; width: 30%; text-align: center; margin: 20px 0;">
          <label class="heading-5">Jugador ${index + 1}:<br> ${player.name}</label>
              <p class="heading-6"><strong>Altura:</strong> ${player.height}m</p>
              <p class="heading-6"><strong>Peso:</strong> ${player.weight}kg</p>
              <p class="heading-6"><strong>IMC:</strong> ${player.bmi}</p>
          </div>
      `;
      pdfContainer.innerHTML += playerInfo;
  });

  // Crear una ventana emergente
  const popupWindow = window.open('', '_blank');
  popupWindow.document.write('<html><head><title>PDF</title></head><body>');
  popupWindow.document.write('</body></html>');
  popupWindow.document.body.appendChild(pdfContainer);

  // Generar el PDF usando html2pdf
  html2pdf().set({
      margin: 10,
      filename: `${teamName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(pdfContainer).save().then(() => {
      popupWindow.close();
  });
}

function generateExcel(teamName, playersData) {
  const wb = XLSX.utils.book_new();
  wb.Props = {
      Title: `${teamName}`,
      Author: "Formulario de Equipo de Fútbol"
  };
  wb.SheetNames.push("Jugadores");

  // Agrega el nombre del equipo al comienzo de la hoja de cálculo
  const ws_data = [["Equipo de Fútbol", teamName], ["", ""], ["Nombre", "Altura (m)", "Peso (kg)", "IMC"]];
  playersData.forEach(player => {
      ws_data.push([player.name, player.height, player.weight, player.bmi]);
  });

  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  wb.Sheets["Jugadores"] = ws;

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
  }

  saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `${teamName}.xlsx`);
}

