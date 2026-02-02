const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

// 🔹 LINK
const LINKS = {
  vetrina: 'https://laselection.pages.dev',
  instagram: 'https://www.instagram.com/laselectionmb/',
  telegramContact: 'https://t.me/LaSelection1',
  signal: 'https://signal.me/#eu/wR_E8bmO4PiGf_jumabFfMQJd1Un_gqS9Jg5caGjnaP5fTHxOmZCWZPA89ZQIGiM',
  potato: 'https://dympt.org/joinchat/QfEYQgoEycxDeTlcXcZKkA'
}

// =======================
// INTRO SCREEN
// =======================
const introScreen = {
  caption:
    `🔞 *Accesso Riservato*\n\n` +
    `Questo servizio è destinato esclusivamente a utenti maggiorenni.\n\n` +
    `Proseguendo confermi di avere almeno 18 anni e di accettare le regole.`,
  reply_markup: {
    inline_keyboard: [
      [{ text: '🔓 ENTRA', callback_data: 'ENTER' }]
    ]
  }
}

// =======================
// MENU PRINCIPALE
// =======================
const mainMenu = (username) => ({
  caption:
    `✅ Benvenuto ${username}\n` +
    `📍 𝘓𝘢𝘚𝘦𝘭𝘦𝘤𝘵𝘪𝘰𝘯 𝘗𝘖𝘐𝘕𝘛\n\n` +
    `Apri la vetrina, consulta il menu oppure trova contatti e info.`,
  reply_markup: {
    inline_keyboard: [
      [{ text: '🛍 Vetrina', web_app: { url: LINKS.vetrina } }],
      [{ text: 'ℹ️ INFO & REGOLE MEETUP', callback_data: 'INFO' }],
      [{ text: '📸 Instagram', url: LINKS.instagram }],
      [{ text: '📡 Telegram Contact', url: LINKS.telegramContact }],
      [{ text: '📲 Signal', url: LINKS.signal }],
      [{ text: '🥔 Potato', url: LINKS.potato }]
    ]
  }
})

// =======================
// START → INTRO
// =======================
bot.start(async (ctx) => {
  await ctx.replyWithPhoto(
    { source: './logo.png' },
    introScreen
  )
})

// =======================
// ENTER → MENU
// =======================
bot.action('ENTER', async (ctx) => {
  await ctx.answerCbQuery()

  const username = ctx.from.username
    ? `@${ctx.from.username}`
    : ctx.from.first_name

  await ctx.editMessageCaption(
    mainMenu(username).caption,
    { reply_markup: mainMenu(username).reply_markup }
  )
})

// =======================
// INFO & REGOLE
// =======================
bot.action('INFO', async (ctx) => {
  await ctx.answerCbQuery()

  await ctx.editMessageCaption(
    `ℹ️ *INFO & REGOLE MEETUP*\n\n` +
      `🤝 *Meet Up*\n` +
      `▪️ Solo una persona all'incontro\n` +
      `▪️ Prenotarsi un giorno prima\n` +
      `▪️ Soddisfatti o rimborsati\n\n` +
      `🚚 *Delivery*\n` +
      `▪️ Nei dintorni di Milano\n` +
      `▪️ Minimo ordine dal menù\n` +
      `▪️ Ordini superiori a 1kg da concordare`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '⬅️ Indietro', callback_data: 'BACK' }]
        ]
      }
    }
  )
})

// =======================
// BACK → MENU
// =======================
bot.action('BACK', async (ctx) => {
  await ctx.answerCbQuery()

  const username = ctx.from.username
    ? `@${ctx.from.username}`
    : ctx.from.first_name

  await ctx.editMessageCaption(
    mainMenu(username).caption,
    { reply_markup: mainMenu(username).reply_markup }
  )
})

// =======================
bot.catch(err => console.error('BOT ERROR:', err))
bot.launch()
console.log('🤖 Bot avviato')
