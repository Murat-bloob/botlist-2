const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
let prefix = db.fetch(`prefix_${message.guild.id}`)
  if (prefix == null) prefix = 'd!'
let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`botbaşvuru_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.send(`<a:reds:791202096455221278> **Başvuru Kanalı Zaten ayarlı değil.**`);
    db.delete(`botbaşvuru_${message.guild.id}`)
   message.channel.send(`<a:onays:791202090235199499> **Başvuru Kanalı başarıyla sıfırlandı.**`);
    return
  }
  
if (!logk) return message.channel.send(`<a:reds:791202096455221278> **Yanlış Kullanım Doğru Kullanım: ${prefix}başvuru-kanal #kanal**`);

db.set(`botbaşvuru_${message.guild.id}`, logk.id)

message.channel.send(`<a:onays:791202090235199499> **Başvuru Kanalı Başarıyla ${logk} olarak ayarlandı.**`);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['başvurukanal'],
    permLevel: 3 ,//Kendi permlerinize göre ayarlayın,
  kategori:'moderasyon'
};

exports.help = {
    name: 'başvuru-kanal',
    description: 'Mod-Log kanalını belirler.',
    usage: 'mod-log <#kanal>'
};
