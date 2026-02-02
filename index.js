const { Telegraf } = require('telegraf')

const bot = new Telegraf('7883293676:AAGKU8pVBxfLMo_GOYij_gOJkdY320vYtbc')

bot.start(ctx => {
  ctx.reply(
    'Benvenuto 😄\nApri subito vetrina, Instagram o scegli un canale.',
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🛍 Vetrina',
              web_app: {
                url: 'https://laselection.pages.dev'
              }
            }
          ],
          [
            { text: '📸 Instagram', url: 'https://www.instagram.com/laselectionmb/' }
          ],
          [
            { text: '📡 Telegram', url: 'https://t.me/+dvWAVpTcV6hkOTZk' }
          ]
        ]
      }
    }
  )
})

bot.launch()
