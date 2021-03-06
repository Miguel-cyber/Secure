import Discord, {Client, Message, TextChannel} from "discord.js";
import randomPuppy from "random-puppy";
const subreddits = require('./subreddits.json');

export let name = "meme";
export let description = "Gives a meme from reddit!";
export let aliases = ["meme"];
export let cooldown = 10;
export async function execute(client: Client, message: Message, args: string[]) {
    if (message.channel.id === '592463507124125706') return;
    const { subReddits } = subreddits;
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    // Get a random image from the subreddit page
    if (!args[0]) {
      const img = await randomPuppy(random);
      const embed = new Discord.RichEmbed()
        .setColor('#4DF8E8')
        .setImage(img)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`From /r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)
        .setColor('#4DF8E8');
      await message.channel.send(embed);
    } else if (args[0] === 'add' && args[1] && !args[2]) {
      const whoAdded = new Discord.RichEmbed();
      whoAdded
        .setColor('#4DF8E8')
        .setTitle(message.author.tag)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField('The SubReddit was suggested by:', `<@${message.author.id}>  ${message.author.tag}`)
        .addField('The SubReddit they suggeted is:', args[1]);
        (client.channels.get('665825128415887370') as TextChannel).send(whoAdded);
      const confirm = new Discord.RichEmbed();
      confirm
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(message.author.tag)
        .setColor('$4DF8E8')
        .addField('I got it!', `I got your subreddit of ${args[1]}! will be reviewed by the staff team`);
      message.channel.send(confirm);
    } else if (args[2]) {
      const wohh = new Discord.RichEmbed();
      wohh
        .setTitle(message.author.tag)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor('#4DF8E8')
        .addField('To many items, ahhhh', 'Hey buddy, either you put a extra space or your drunk. Use _ instead of spaces for SubReddit names, thanks');
    }
}
