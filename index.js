const Telegraf = require('telegraf');

const TOKEN = '611827418: AAFN6qfX89LlYFfGxWwQ_MQNA0Hvp4y3aFk';

const app = new Telegraf(TOKEN);

app.hears('hi', ctx => {
    return ctx.reply('Hey!');
});


const axios = require('axios'); // add axios

// handle the reaction everytime user sends a text message
app.on('text', ctx => {

    // ctx object holds the Update object from Telegram API
    // So you can use everything you see there

    // get the text message sent by user
    const subreddit = ctx.message.text;

    // GET the data from Reddit API
    axios.get(`https://reddit.com/r/${subreddit}/top.json?limit=10`)
        .then(res => {

            // data recieved from Reddit
            const data = res.data.data;

            // if subbreddit does not exist
            if (data.children.length < 1)
                return ctx.reply('The subreddit couldn\'t be found.');

            // send the first top post link to the user
            const link = `https://reddit.com/${data.children[0].data.permalink}`;
            return ctx.reply(link);
        })

        // if there's any error in request
        .catch(err => console.log(err));
});