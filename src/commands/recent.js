const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('recent')
    .setDescription('Returns 3 most recent messages from content channel'),
  async execute(interaction) {
    const contentChannel = interaction.guild.channels.cache.find(channel => channel.name === "village-library");

    if (!contentChannel) {
      await interaction.reply('village-library not found. Please add in the correct name of the channel or create one if it does not exist');
      return;
    }

    const messages = await contentChannel.messages.fetch({ limit: 3 });

    if (!messages.size) {
      await interaction.reply('No messages found in village-library');
      return;
    }

    const embeds = messages.map(msg => {
      const embedData = msg.embeds[0];
      const embed = new EmbedBuilder().setColor(0x0099ff);

      if (embedData) {
        if (embedData.title) {
          embed.setTitle(embedData.title);
        }

        if (embedData.url && typeof embedData.url === 'string' && embedData.url !== 'null') {
          embed.setURL(embedData.url);
        }

        if (embedData.author) {
          embed.setAuthor({
            name: embedData.author.name || 'Unknown Author',
            iconURL: embedData.author.iconURL || null
          });
        }

        if (embedData.description) {
          embed.setDescription(`${embedData.description}\n\n[Go to embed](${msg.url})`);
        }

        if (embedData.image && embedData.image.url) {
          embed.setImage(embedData.image.url);
        }
      } else {
        embed.setDescription(`[Go to message](${msg.url})`);
      }

      return embed;
    });

    await interaction.reply({ embeds });
  },
};
