const Discord = require('discord.js')
const client = require('../../index.js')

module.exports = {
    name: 'poll',
    description: 'Sends a yes or no poll',
    usage: 'poll <question>',
    category: 'Utility',
    guildOnly: true,
    async execute(message, args){
        if(!args.join(" ")) return message.reply("Please enter a question for the poll!")

        let firstPollEmbed = new Discord.MessageEmbed() 
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true}))
            .setDescription("```\n⌛ Preparing a poll...\n```")
        let secondPollEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setDescription(`**📥 POLL:** \n \`\`\`\n${args.join(" ")}\n\`\`\``)
        message.channel.send(firstPollEmbed).then((message) => {
            setTimeout(function(){
                message.edit(secondPollEmbed).then((msg) =>{

                   msg.react('👍');
                   msg.react('👎');
                }).catch(error => {
                    message.channel.send(`:x: **| There was an error executing your command:**\n\`${error}\``)
                })
            }, 2000)
        }).catch(error => {
            message.channel.send(`:x: **| There was an error executing your command:**\n\`${error}\``)
        })
    }
}
