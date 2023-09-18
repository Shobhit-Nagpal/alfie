const { Events } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const getThumbnailURLFromMessage = require('../thumbnail');

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    const { message } = reaction;
    const { guild } = message;

    if (user.bot) return; // Ignore bot reactions

    if (!reaction.emoji.id === '1103739159664926741' || !reaction.emoji.name === '⭐') return;

    if (reaction.emoji.id === '1103739159664926741') {
      const sameReactionsBookmark = message.reactions.cache.filter(r => r.emoji.id === '1103739159664926741');
      if (sameReactionsBookmark.first().count > 1) return;

      // Check if the message has a link
      if (!message.content.match(/https?:\/\/\S+/)) return;

      let thumbnail = getThumbnailURLFromMessage(message.content);
      if (thumbnail === null) {
        thumbnail = 'https://funnydogsgallery.com/wp-content/uploads/2016/02/smile-dog.jpg';
      }

      const contentChannel = guild.channels.cache.find(channel => channel.name === 'content');

      if (!contentChannel) {
        console.log('Content channel not found. Please create a channel named "content".');
        return;
      }

      const originalEmbed = message.embeds[0];

      if (!originalEmbed) {
        console.log('No embed found in the message.');
        
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            .setDescription(`${message.content}`)
            .setTimestamp()

        await contentChannel.send({ embeds: [embed] });
        return;
      }

       const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})
                .setTitle(originalEmbed.title)
                .setURL(originalEmbed.url)
                .setDescription(`${message.content}`)
                .setTimestamp()
                .setImage(originalEmbed.thumbnail.url);

      await contentChannel.send({ embeds: [embed] });
    }
    else if (reaction.emoji.name === '⭐') {
      const sameReactions = message.reactions.cache.filter(r => r.emoji.name === '⭐');



      if (sameReactions.first().count !== 3) return;

      const starboardChannel = guild.channels.cache.find(channel => channel.name === 'starboard');

      if (!starboardChannel) {
        console.log('Content channel not found. Please create a channel named "starboard".');
        return;
      }


      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Go to message!')
        .setURL(`${message.url}`)
        .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
        .setDescription(`${message.content}`)
        .setTimestamp();


      await starboardChannel.send({ embeds: [embed] });
    }
  },
};
