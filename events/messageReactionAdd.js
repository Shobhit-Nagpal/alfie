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
        thumbnail = 'https://blogger.googleusercontent.com/img/a/AVvXsEiRVcJR53FYKvT45piDehmWJr_FMX-RnPalZ4DfU_dLpE1Ajcda75etoQpxj61g7n_S-9WSaX8mHI9fuodNQWcn5vEo7OYEOr0Mdha7rZgRdyfvZWEqbwxSZrOVP2X4gV01CQBpucAHLPkRxOcdOlQQHRmnNjo-A-J2wzi7zZ8jMFF7BP97jTxd4ZCKUw=w640-h360';
      }

      const contentChannel = guild.channels.cache.find(channel => channel.name === 'village-library');

      if (!contentChannel) {
        console.log('Village-library channel not found. Please create a channel named "village-library".');
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

      const finalThumbnail = originalEmbed.thumbnail ? originalEmbed.thumbnail.url : thumbnail;

      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
        .setTitle(originalEmbed.data.title)
        .setURL(originalEmbed.data.url)
        .setDescription(`${message.content}`)
        .setTimestamp()
        .setImage(`${finalThumbnail}`);

      await contentChannel.send({ embeds: [embed] });
    }
    else if (reaction.emoji.name === '⭐') {
      const sameReactions = message.reactions.cache.filter(r => r.emoji.name === '⭐');



      if (sameReactions.first().count !== 3) return;

      const starboardChannel = guild.channels.cache.find(channel => channel.name === 'village-notice-board');

      if (!starboardChannel) {
        console.log('Village-notice-board channel not found. Please create a channel named "village-notice-board".');
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

