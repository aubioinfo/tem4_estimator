function checkAuth() {
  const code = localStorage.getItem("authCode");
  const used = parseInt(localStorage.getItem("usedCount") || "0");
  if (code !== "tem4-2024") {
    document.getElementById("pay-overlay").style.display = "flex";
    return false;
  }
  if (used >= 3) {
    alert("已使用 3 次，请重新支付以继续使用。");
    document.getElementById("pay-overlay").style.display = "flex";
    return false;
  }
  return true;
}
function validateCode() {
  const input = document.getElementById("codeInput").value.trim();
  if (input === "tem4-2024") {
    localStorage.setItem("authCode", input);
    localStorage.setItem("usedCount", "0");
    document.getElementById("pay-overlay").style.display = "none";
    document.getElementById("estimator").style.display = "block";
    alert("验证成功，可开始使用。");
  } else {
    alert("授权码错误，请重新确认。");
  }
}
function estimateScore() {
  if (!checkAuth()) return;
  const total = parseFloat(document.getElementById("totalEstimate").value);
  if (isNaN(total) || total < 0 || total > 100) {
    alert("请输入有效分数（0-100）");
    return;
  }
  const final = Math.round(0.7 * (140 - (100 - total)) * 10) / 10;
  const used = parseInt(localStorage.getItem("usedCount") || "0") + 1;
  localStorage.setItem("usedCount", used);
  document.getElementById("resultBox").innerText = `🎯 预测成绩为：${final}`;
}
window.onload = () => {
  if (localStorage.getItem("authCode") === "tem4-2024") {
    document.getElementById("pay-overlay").style.display = "none";
    document.getElementById("estimator").style.display = "block";
  }
};