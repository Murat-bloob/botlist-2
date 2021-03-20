const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
	
  let botyetkili = db.fetch(`botyetkili_${message.guild.id}`)
let sıra = db.fetch(`sıra_${message.guild.id}`)
  if (sıra == null) sıra = '0'
  let botonayredlog = db.fetch(`botonayredlog_${message.guild.id}`)
let sahiprol = db.fetch(`sahiprol_${message.guild.id}`)
let botrol = db.fetch(`botrol_${message.guild.id}`)
let botlog = db.fetch(`botlog_${message.guild.id}`)
let sahip = db.fetch(`sahip_${message.guild.id}`) || args[1];
let botid = db.fetch(`botid_${message.guild.id}`) || args[0];
if(sıra)
if(!message.member.roles.cache.has(botyetkili)) return message.channel.send("Yeterli yetkin Yok.").then(a => a.delete(20000))
if (!botyetkili) return message.channel.send("Bot Yetkili Rölü Ayarlanmamış").then(a => a.delete(20000))
if (!botonayredlog) return message.channel.send("Bot Onayla Reddet Kanalı Ayarlanmamış").then(a => a.delete(20000))
if(!sahiprol) return message.channel.send("Onaylı Üyeye Verilcek Rol Belirtirmemiş").then(a => a.delete(20000))
if(!botrol) return message.channel.send("Onaylı Bot Verilcek Rol Belirtilmemiş").then(a => a.delete(20000))
  if(message.channel.id !==  botonayredlog) return message.channel.send(`<#${botonayredlog}> sadece bu kanalda kullanabılır.`).then(a => a.delete(20000))
  if(!botid) return message.channel.send("Bir Bot İd Gir.").then(a => a.delete(20000))
if(!sahip) return message.channel.send("Sahip İd Giriniz.").then(a => a.delete(20000))
message.delete()
  
message.channel.send("<a:onays:791202090235199499>**|** Başarıyla Botu Onayladınız.").then(a => a.delete(20000))
  
  message.guild.member(botid).roles.add(botrol)
 message.guild.member(sahip).roles.add(sahiprol)
  message.guild.members.cache.get(sahip).send(` <a:onays:791202090235199499> **|** <@${botid}> Adlı Botunuz Onaylandı Onaylayan Yetkili <@${message.author.id}>`)
  let embed = new Discord.MessageEmbed()
  .setColor("GREEN")
.setDescription(`> <a:onays:791202090235199499> <@${botid}> Adlı Bot Onaylandı \n > Bot Sahip : <@${sahip}> \n > Onaylayan Yetkili <@${message.author.id}>`)
client.channels.cache.get(botlog).send(embed)
db.add(`sıra_${message.guild.id}`,-1)
  

}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases:['onay'],
	permlevel: 0
};

exports.help = {
	name: "onayla"
}


