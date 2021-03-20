const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
let prefix = db.fetch(`prefix_${message.guild.id}`)
  if (prefix == null) prefix = 'd!'
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`kicklog_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.send(`<a:reds:791202096455221278> **Kick Log Kanalı Zaten ayarlı değil.**`);
    db.delete(`kicklog_${message.guild.id}`)
   message.channel.send(`<a:onays:791202090235199499> **Kick Log Kanalı başarıyla sıfırlandı.**`);
    return
  }
  
if (!logk) return message.channel.send(`<a:reds:791202096455221278> **Yanlış Kullanım Doğru Kullanım: ${prefix}kick-log #kanal**`);

db.set(`kicklog_${message.guild.id}`, logk.id)

message.channel.send(`<a:onays:791202090235199499> **Kick Log Kanalı Başarıyla ${logk} olarak ayarlandı.**`);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kicklog'],
    permLevel: 3 ,//Kendi permlerinize göre ayarlayın,
  kategori:'moderasyon'
};

exports.help = {
    name: 'kick-log',
    description: 'Mod-Log kanalını belirler.',
    usage: 'mod-log <#kanal>'
};
