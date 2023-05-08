import {
  createBot,
  GatewayIntents,
  startBot,
} from "https://deno.land/x/discordeno@17.0.1/mod.ts";
import "https://deno.land/std@0.185.0/dotenv/load.ts";

const DISCORD_BOT_TOKEN = "DISCORD_BOT_TOKEN";

async function main(token: string | undefined): Promise<void> {
  if (!token) {
    console.log(
      `No token supplied; set the ${DISCORD_BOT_TOKEN} environment variable and run again`
    );
    return;
  }
  const bot = createBot({
    token,
    intents: GatewayIntents.GuildMessages | GatewayIntents.MessageContent,
    botId: BigInt(atob(token.split(".")[0])),
    events: {
      ready() {
        console.log("Successfully connected to gateway");
      },
    },
  });
  console.log("Starting bot ...");
  await startBot(bot);
}

if (import.meta.main) {
  await main(Deno.env.get(DISCORD_BOT_TOKEN));
}
