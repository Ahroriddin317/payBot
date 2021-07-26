const express = require("express");
const TelegramApi = require("node-telegram-bot-api");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
const token = process.env.TOKEN;

const bot = new TelegramApi(token, { polling: true });

const payOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "visa", callback_data: "visa" },
        { text: "yandex деньги", callback_data: "yandex" },
      ],
    ],
  }),
};

bot.setMyCommands([
  { command: "/start", description: "Начальное приветствие" },
  { command: "/pay", description: "Выбрать способ оплати" },
]);

bot.on("message", async (msg) => {
  const {
    text,
    from: { first_name },
  } = msg;
  const { id } = msg.chat;

  if (text === "/start") {
    await bot.sendSticker(
      id,
      "https://cdn.tlgrm.ru/stickers/a93/3bb/a933bb07-c608-4603-8765-ee62fb481afc/192/1.webp"
    );
    await bot.sendMessage(
      id,
      `Добро пожаловать! в наш телеграм бот ${first_name}`
    );
  }

  if (text === "/pay") {
    await bot.sendMessage(id, `Выберите способ оплаты`, payOptions);
  }
});

bot.on("callback_query", async (msg) => {
  const { data } = msg;
  const { id } = msg.message.chat;

  bot.sendMessage(id, ` Вы выбрали оплату через ${data}`);
});

app.listen(port, () => {
  console.log(`server starting on port http://localhost:${port}`);
});
