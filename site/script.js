function toggleMode() {
  const mode = document.getElementById("modeSelect").value;
  document.getElementById("moduleMode").style.display = mode === "byModule" ? "block" : "none";
  document.getElementById("totalMode").style.display = mode === "byTotal" ? "block" : "none";
  document.getElementById("resultBox").innerText = "";
}

function predictByTotal() {
  const raw = parseFloat(document.getElementById("totalEstimate").value);
  if (isNaN(raw) || raw < 0 || raw > 100) {
    alert("请输入有效的总分（0-100）");
    return;
  }
  const finalScore = calculateStandardScore(raw);
  displayResult(raw, finalScore);
}

function predictByModule() {
  const fields = ["dictation", "listeningLecture", "listeningChoice", "languageKnowledge", "cloze", "reading", "writing"];
  let raw = 0;
  for (let id of fields) {
    const val = parseFloat(document.getElementById(id).value);
    if (isNaN(val) || val < 0 || val > parseInt(document.getElementById(id).max)) {
      alert("请输入有效分数");
      return;
    }
    raw += val;
  }
  const finalScore = calculateStandardScore(raw);
  displayResult(raw, finalScore);
}

function calculateStandardScore(raw) {
  const X = 100 - raw;
  return Math.round(0.7 * (140 - X) * 10) / 10;
}

function displayResult(raw, final) {
  document.getElementById("resultBox").innerHTML = `📝 原始总分: ${raw}/100<br>🎯 预测标准分: ${final}`;
}

window.onload = toggleMode;
