const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
let prefix = db.fetch(`prefix_${message.guild.id}`)
  if (prefix == null) prefix = 'd!'
let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`botonayredlog_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.send(`<a:reds:791202096455221278> **Bot Onay Reddet Kanalı Zaten ayarlı değil.**`);
    db.delete(`botonayredlog_${message.guild.id}`)
   message.channel.send(`<a:onays:791202090235199499> **Bot Onay Reddet Kanalı başarıyla sıfırlandı.**`);
    return
  }
  
if (!logk) return message.channel.send(`<a:reds:791202096455221278> **Yanlış Kullanım Doğru Kullanım: ${prefix}bot-onay-reddet-kanal #kanal**`);

db.set(`botonayredlog_${message.guild.id}`, logk.id)

message.channel.send(`<a:onays:791202090235199499> **Bot Onay Reddet Kanalı Başarıyla ${logk} olarak ayarlandı.**`);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bot-onay-reddet-kanal'],
    permLevel: 3 ,//Kendi permlerinize göre ayarlayın,
  kategori:'moderasyon'
};

exports.help = {
    name: 'bot-onay-reddet-kanall',
    description: 'Mod-Log kanalını belirler.',
    usage: 'mod-log <#kanal>'
};
