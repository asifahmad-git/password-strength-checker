const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const suggestionsBox = document.getElementById("suggestions");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "Show";
  }
});

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const result = zxcvbn(password);

  const strength = result.score;
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["#ef4444","#f97316","#facc15","#22c55e","#16a34a"];

  strengthBar.style.width = `${(strength+1)*20}%`;
  strengthBar.style.background = colors[strength];
  strengthText.textContent = password.length > 0 
    ? `Strength: ${strengthLabels[strength]}` 
    : "Start typing a password...";

  if(result.feedback.suggestions.length > 0){
    suggestionsBox.innerHTML = `<strong>Suggestions:</strong><br>` + 
      result.feedback.suggestions.map(s => `• ${s}`).join("<br>");
  } else {
    suggestionsBox.innerHTML = password.length === 0 ? "" : "<em>Your password looks strong!</em>";
  }
});