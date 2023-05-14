const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('recent')
    .setDescription('Returns 3 most recent messages from content channel'),
  async execute(interaction) {
    const contentChannel = interaction.guild.channels.cache.find(channel => channel.name === 'content');

    if (!contentChannel) {
      await interaction.reply('Content channel not found. Please create a channel named "content".');
      return;
    }

    const messages = await contentChannel.messages.fetch({ limit: 3 });

    if (!messages.size) {
      await interaction.reply('No messages found in the content channel.');
      return;
    }


    const embeds = messages.map(msg => new EmbedBuilder()
      .setTitle(`${msg.embeds[0].title}`)
      .setURL(`${msg.embeds[0].url}`)
      .setAuthor({ name: `${msg.embeds[0].author.name}`, iconURL: `${msg.embeds[0].author.iconURL}`})
      .setDescription(`${msg.embeds[0].description}\n\n[Go to embed](${msg.url})`)
      .setColor(0x0099ff)
      .setImage(msg.embeds[0].image.url)
    );

    await interaction.reply({ embeds });
  },
};