const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

let sıra = db.fetch(`sıra_${message.guild.id}`)
  if (sıra == null) sıra = '1'
let botbaşvuru = db.fetch(`botbaşvuru_${message.guild.id}`)
let kicklog = db.fetch(`kicklog_${message.guild.id}`)
let botlog = db.fetch(`botlog_${message.guild.id}`)
let botyetkili = db.fetch(`botyetkili_${message.guild.id}`)
let sahip = db.fetch(`sahip_${message.guild.id}`)
let botonayredlog = db.fetch(`botonayredlog_${message.guild.id}`)
let prefix = args[1]
let botid = db.fetch(`botid_${message.guild.id}`) || args[0];
if(sahip)
if (!botlog) return message.channel.send("Bot Log Kanalı Ayarlanmamış").then(a => a.delete(20000))
if (!botyetkili) return message.channel.send("Bot Yetkili Rölü Ayarlanmamış").then(msg => msg.delete({ timeout: 8000, reason: 'mesaj silme' }))
if (!botonayredlog) return message.channel.send("Bot Onayla Reddet Kanalı Ayarlanmamış").then(msg => msg.delete({ timeout: 8000, reason: 'mesaj silme' }))
if (!botbaşvuru) return message.channel.send("Bot Başvuru Kanalı Ayarlanmamış").then(msg => msg.delete({ timeout: 8000, reason: 'mesaj silme' }))
if (!kicklog) return message.channel.send("Kick Log Ayarlanmamış").then(msg => msg.delete({ timeout: 8000, reason: 'mesaj silme' }))
if(message.channel.id !== botbaşvuru) return message.channel.send(`<#${botbaşvuru}> sadece bu kanalda kullanabılır.`).then(msg => msg.delete({ timeout: 8000, reason: 'mesaj silme' }))
if(!botid) return message.channel.send("Bir Bot İd Gir.").then(msg => msg.delete({ timeout: 8000, reason: 'mesaj silme' }))
if(!prefix) return message.channel.send("Prefix Giriniz.").then(msg => msg.delete({ timeout: 8000, reason: 'mesaj silme' }))

message.delete()

db.add(`sıra_${message.guild.id}`,1)
message.channel.send("<a:onays:791202090235199499>**|** Botunuz Sisteme Eklendi Lütfen Onay Almasını Bekleyınız.").then(a => a.delete(20000))
  client.channels.cache.get(botlog).send(`<@&${botyetkili}>`)
  message.guild.members.cache.get(message.author.id).send(` <a:onays:791202090235199499> **|** <@${botid}> Adlı Botunuz Sıraya Eklendi Onay Almasını Bekleyiniz`)
  db.set(`BOT_${message.author.id}`,botid)
  
  let embed = new Discord.MessageEmbed()
  .setDescription(`> <@${message.author.id}> **Adlı Kullanıcı** \n > <@${botid}> **Adlı Botunu Ekledi** \n > **Botun Prefixi** ${prefix} \n > **Şuanki Sıra** ${sıra} `)
  .addField(`Ekle`,`[0 Perm](https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=0&scope=bot) **|** [8 Perm](https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=8&scope=bot)`)
client.channels.cache.get(botlog).send(embed)
  

}//db.delete(`sıra_${message.guild.id}`-1)
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases:[],
	permlevel: 0
};

exports.help = {
	name: "bot-ekle"
}


