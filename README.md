# SpaceBot-discord-bot
A Discord bot with several features, displaying astronauts currently in space, upcoming space launches, the NASA "APOD", an ISS tracker and the Texas space operations TFR (NOTAM).
 
 # Commands preview :
 <img src="https://cdn.discordapp.com/attachments/393067783979532290/870794822561198100/helpembed.png" alt="help embed" />
 
 # Setup Bot

- Run `npm i` to install packages.

- Set your [Bot token](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token) in `config.json` :
 ```json
  "token": "PUT_TOKEN_HERE"
  ```
  **open** `index.js` at the end :
 ```javascript
  bot.login(process.env.TOKEN);
  ```
  and **replace by** :
   ```javascript
  bot.login(token);
  ```
  
 **note:** you can also let by default and set your token in `.env` as `TOKEN` [environmennt variable](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs).
