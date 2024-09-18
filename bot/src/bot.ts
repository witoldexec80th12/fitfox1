import { Bot, InlineKeyboard } from "grammy";
import dotenv from "dotenv";

dotenv.config();

// Replace with your bot token from BotFather
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

const mainMessage = `
🌟 Welcome to Fitfox - Your Ultimate Wellness Companion on Telegram!

🎯 Embrace the journey to better health with Fitfox 💚. We're here to guide you on a path to a healthier lifestyle by encouraging you to eat well and stay active, improving day by day.

🔥 Start earning points for a future airdrop as you make healthier choices and stay engaged. Our mission is to support you in reducing the risk of metabolic diseases and fostering a well-balanced life.

🔥 Begin your wellness adventure with Fitfox now and take the first step towards a healthier you 💪
`;

const openWebAppInlineKeyboard = new InlineKeyboard()
	.webApp("Start App", "https://2086-83-234-227-22.ngrok-free.app")
	// .webApp("Start App", "https://fitfox-ujvr.onrender.com")
	.row()
	.url("Join Community", "https://t.me/joinchat/XXXXXX");

// Handle the "/start" command
bot.command('start', async (ctx) => {
	const user = ctx.from;
	if (!user) return ctx.reply("Failed to get user data.");

	try {
		await ctx.api.sendChatAction(ctx.chat.id, "typing");
	} catch (error) {
		console.error("Error send chat action :", error);
	}

	// try {
	// const ref_id = ctx.match?.split("ref_")[1] || null;
	// await initializePlayer(user, ref_id);
	// } catch (error) {
	// console.error("Error initializing player:", error);
	// }


	await ctx.replyWithPhoto("https://www.imghost.net/ib/g8lIhKfHVwea3H4_1726301662.png", {
		caption: mainMessage,
		reply_markup: openWebAppInlineKeyboard,
		parse_mode: "HTML",
	});
});

bot.catch((err) => {
	console.error("Error in bot:", err);
});

// Start the bot
bot.start();
