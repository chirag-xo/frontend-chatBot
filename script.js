// ✅ FINAL UPDATED script.js
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("input");
const send = document.getElementById("send");
const typing = document.getElementById("typing");
const toggle = document.getElementById("darkToggle");
const sidebarToggle = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

const botReplies = [
  "Sure! Let me check that.",
  "Interesting. Go on...",
  "Thanks for the message!",
  "I'll get back to you shortly.",
  "Could you please elaborate?"
];

let lastIndex = -1;
function getBotReply() {
  let index;
  do {
    index = Math.floor(Math.random() * botReplies.length);
  } while (index === lastIndex);
  lastIndex = index;
  return botReplies[index];
}

toggle.onclick = () => {
  document.body.classList.toggle("dark");
};

sidebarToggle.onclick = () => {
  sidebar.classList.toggle("closed");
};

function addMessage(text, isBot = false) {
  const msgWrapper = document.createElement("div");
  msgWrapper.className = `chat-bubble ${isBot ? "bot-msg" : "user-msg"}`;

  const msg = document.createElement("div");
  msg.textContent = text;

  const time = document.createElement("div");
  time.className = "timestamp";
  time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  msgWrapper.appendChild(msg);
  msgWrapper.appendChild(time);

  chatBox.appendChild(msgWrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text);
  input.value = "";
  typing.style.display = "block";

  setTimeout(() => {
    const reply = getBotReply();
    typing.style.display = "none";
    addMessage(reply, true);
  }, 1200);
}

send.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
