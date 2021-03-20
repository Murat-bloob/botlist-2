const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async(client, message, args) => {
  
	
let botyetkili = db.fetch(`botyetkili_${message.guild.id}`)
let botonayredlog = db.fetch(`botonayredlog_${message.guild.id}`)
let botlog = db.fetch(`botlog_${message.guild.id}`)
let sıra = db.fetch(`sıra_${message.guild.id}`)
  if (sıra == null) sıra = '0'
let botid = args[0]
let sahip = args[1]
let sebep = args.slice(2).join(' ')
if(sıra)
if(!botid) return message.channel.send("Bir Bot İd Gir.").then(a => a.delete(20000))
if(!sahip) return message.channel.send("Sahip İd Giriniz.").then(a => a.delete(20000))
  if(!sebep) return message.channel.send("Sebep Giriniz.").then(a => a.delete(20000))
  if(!message.member.roles.cache.has(botyetkili)) return message.channel.send("Yeterli yetkin Yok.")
  if(message.channel.id !== botonayredlog) return message.channel.send(` <#${botonayredlog}> sadece bu kanalda kullanabılır.`)
message.delete()
  
message.channel.send("<a:onays:791202090235199499>**|** Başarıyla Botu Reddetınız.").then(a => a.delete(20000))
  
 message.guild.members.cache.get(sahip).send(`<a:reds:791202096455221278>  **|** <@${botid}> Adlı Botunuz **${sebep}** Nedeniyle Reddildi.`)
  
  let embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
.setDescription(`> <a:reds:791202096455221278> <@${sahip}> Adlı Kullanıcın \n > <@${botid}> Adlı Botu  \n > **${sebep}** Nedeniyle Reddedildi. \n > Redden Yetkili <@${message.author.id}>`)
client.channels.cache.get(botlog).send(embed)
db.add(`sıra_${message.guild.id}`,-1)

}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases:['red'],
	permlevel: 0
};

exports.help = {
	name: "reddet"
}