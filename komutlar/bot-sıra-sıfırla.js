const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async(client, message, args) => {
 db.delete(`sıra_${message.guild.id}`)

  let embed = new Discord.MessageEmbed()
.setThumbnail(client.user.avatarURL())
.setDescription(`Sırada Olan Tüm Botları Sıradan Kaldırdım `)
.setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL({dynamic: true,format: "gif",format: "png",format: "jpg"}))
message.channel.send(embed).then(msg => msg.delete({ timeout: 8000, reason: 'mesaj silme' }))
 message.delete() 

}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases:[],
	permlevel: 0
};

exports.help = {
	name: "sıra-sıfırla"
}


