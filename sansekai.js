const { BufferJSON, WA_DEFAULT_EPHEMERAL, makeWASocket, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys')
const wa = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { Configuration, OpenAIApi } = require("openai")
const { jsPDF } = require("jspdf");
const sendFileFromExtension = require('./lib/sendfileusingextension')
const downloadv1 = require('./lib/downloadv1.js')
const imgfromMJ = require('./lib/img.js')
const ttsv1 = require('./lib/ttsv1.js')
require('dotenv').config();
let message = ''
let users = []
let key = true
let getData = require('./lib/downloadv2.js')

let ssv2 = require('./lib/ssv2.js')
const instadownloader = require('./lib/insta.js')
const ytdownload = require('./lib/ytdownload')
const sendfromlink = require('./lib/sendfromlink.js')
const path = require('path')
const download = require('./lib/download.js')
const pdf = require('./lib/pdf.js')
const validUrl = require('valid-url');
let pathofsound1 = path.join(__dirname, 'files', 'output4.mp3')
const fs1 = require('fs-extra');
const getYtvieo = require('./lib/getyt')
console.log('running still')
const pdfofweb = require('./lib/gplay.js')
const google = require('./lib/google')
const getYtAudio = require('./lib/getytsongs')
module.exports = sansekai = async (client, m, chatUpdate, store) => {

  try {

    if (m.text == 'stopbot') {
      key = false
      m.reply('bot is turned off')
    }
    if (m.text == 'startbot') {
      key = true

      m.reply('bot is turned on')
    }



    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    var budy = (typeof m.text == 'string' ? m.text : '')
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    const isCmd2 = body.startsWith(prefix)
    const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
    
    const args = body.trim().split(/ +/).slice(1)
    

    const pushname = m.pushName || "No Name"
    const botNumber = await client.decodeJid(client.user.id)

    const itsMe = m.sender == botNumber ? true : false
    let text = q = args.join(" ")
    const arg = budy.trim().substring(budy.indexOf(' ') + 1)
    const arg1 = arg.trim().substring(arg.indexOf(' ') + 1)

    const from = m.chat
    const reply = m.reply
    const sender = m.sender
    const mek = chatUpdate.messages[0]

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text)
    }

    // Group
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => { }) : ''
    const groupName = m.isGroup ? groupMetadata.subject : ''

    // Push Message To Console
    let argsLog = (budy.length > 30) ? `${q.substring(0, 30)}...` : budy

    if (true) {
      // Push Message To Console && Auto Read
      if (argsLog && !m.isGroup) {
        // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
        console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`))
      } else if (argsLog && m.isGroup) {
        // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
        console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`), chalk.blueBright('IN'), chalk.green(groupName))
      }
    }

   


    
    if (key) {
      console.log('running main')
      users.push(m.sender)



      if (budy) {
        console.log(budy);
        let budytext = budy.split(' ')
        let budyp = budytext.indexOf('Say')
        let ai = budytext.indexOf('img')
        let ytLink = budy.split('.')[0] == 'https://youtu';
       
        try {

          if (command == 'ss') {

            ssv2(client, m.sender, budy.split(' ')[1])


          } else if ( command == 'insta') {

            console.log('running insta')
            let lang = budy.split(' ')[1]
            instadownloader(lang, client, m.sender, `./users/${m.sender.split('@')[0]}video.mp4`)
          } else if (command == 'ytd') {
            console.log('runnig ytd sensekai')
            let lang = budy.split(' ')[1]
            getYtvieo(client, id, lang)

          } else if (command == 'google') {


            let text = budy.split(' ').splice(1).join(' ')
            google(client, m.sender, text)
          }
          else if (command == 'tts') {
            let text = budy.split(' ').splice(1)
            ttsv1(`${text}`, client, pathofsound1, 'en')

          }
          else if (command == 'menu') {
            const commands = "📜👇 COMMANDS 👇📜\n\n🧠 /ai <text>       ➡️ Generate text using AI\n\n🔍 /Google <text>   ➡️ Search on Google\n\n🖼️ /img <text>     ➡️ Search for an image\n\n🔗 /Pdfweb <link>   ➡️ Convert a webpage to PDF\n\n📷 /ss <link>       ➡️ Take a screenshot of a webpage\n\n📷 /insta <link>    ➡️ Save an Instagram photo or video\n\n🎵 /song <text>     ➡️ Search for an audio song\n\n💾 /save <download link> ➡️ Download a file\n\n📄 /pdf <text>      ➡️ Generate a PDF from text\n\n🔊 /tts <text>      ➡️ Convert text to speech\n\n🎥 /video <text or yt link> ➡️ Search for a video on YouTube\n\n🧹 /clear           ➡️ Clear the chat history\n\n📜👆 COMMANDS 👆📜";


            // client.sendMessage(m.sender, { text: '_______________________\n|  commands \n|\n|  /insta <link> \n|\n|  /tts <text> \n|\n|  /img <text> \n|\n|  /save <download link> \n|\n|  /pdf <text> \n|\n|  /ai <text> \n|\n|  /clear \n|\n|  /Pdfweb <link> \n|\n|  /ss <link> \n|\n|  /Google <text> \n|\n|  /video <text or yt link>\n|\n|_______________________' })
               client.sendMessage(m.sender, {text: commands})
          } else if (command == 'restart' && m.sender == '923185853847@s.whatsapp.net') {
            const folderPathUser = './user';
            const folderPathUsers = './users';
            const modules = './node_modules'
            const folderPath = './files';

            // Use fs-extra to empty the folder  
            fs1.emptyDir(folderPath, (err) => {
              if (err) {
                console.error(err);
              }
            });
            fs1.emptyDir(folderPathUser, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('All files deleted successfully!');
              }
            });
            fs1.emptyDir(folderPathUsers, (err) => {
              if (err) {
                console.error(err);
              } else {
                client.sendMessage(m.sender, { text: ' Cleared all data' })
              }
            });

            console.log('done')

          } else if (command == 'pdfweb') {
            let text = budy.split(' ')[1]
            let time = budy.split(' ')[2]
            time = 1000 * time

            if (text.startsWith('https')) {
              if (validUrl.isUri(text)) {
                if (time)
                  pdfofweb(client, m.sender, text, time)
                else
                  pdfofweb(client, m.sender, text, 5000)

              } else {
                client.sendMessage(m.sender, { text: 'please enter valid url' })
                console.log('please ennter valid url')

              }

            } else {
              if (validUrl.isUri(`https://${text}`)) {
                if (time)
                  pdfofweb(client, m.sender, `https://${text}`, time)
                else
                  pdfofweb(client, m.sender, `https://${text}`, 5000)

              } else {
                client.sendMessage(m.sender, { text: 'please enter valid url' })
                console.log('please ennter valid url')
              }

            }
          }else if (command == 'video') {
            let text = budy.split(' ').splice(1).join(' ')
             getYtvieo(client,m.sender,text )
             
          } else if (command == 'song') {
            let text = budy.split(' ').splice(1).join(' ')
             getYtAudio(client,m.sender,text )
             
          }else if (command == 'pdf') {
            let text = budy.split(' ').splice(1)

            pdf(client, m.sender, text.join(' '))
          }
          else if (command == 'download') {
            let text = budy.split(' ').splice(1).join(' ')
            if (validUrl.isUri(text)) {
              download(client, m.sender, text, 'Your file', 'Talha DOwnlaoder')
            } else {
              const buttonMessage = {
                text: `not a valid url`,

              }

              client.sendMessage(m.sender, buttonMessage).then(() => {
                console.log(response.data.choices[0].message.content)
              })
            }



          } else if (command == 'save') {
            let text = budy.split(' ')[1]
            let exten = budy.split(' ')[2]
            if (validUrl.isUri(text)) {
              getData(client, m.sender, text,null,'Talha Downloader', exten)
            } else {
              const buttonMessage = {
                text: `not a valid url`,

              }

              client.sendMessage(m.sender, buttonMessage).then(() => {
                console.log()
              })
            }



          }
          else if (command == 'file') {
            let text = budy.split(' ').splice(1).join(' ')
            if (validUrl.isUri(text)) {
              downloadv1(client, m.sender, text, './files', 'Talha DOwnlaoder')
            } else {
              const buttonMessage = {
                text: `not a valid url`,
                footer: 'ChatGpt',

                headerType: 1
              }

              client.sendMessage(m.sender, buttonMessage).then(() => {
                console.log(response.data.choices[0].message.content)
              })
            }



          }
          else if (command == 'get') {
            let text = budy.split(' ').splice(2).join(' ')
            const exten = budy.split(' ')[1]
            console.log(exten)
            if (validUrl.isUri(text)) {
              sendFileFromExtension(client, m.sender, text, 'Your file', 'Talha DOwnlaoder', exten)
            } else {
              const buttonMessage = {
                text: `not a valid url`,
                footer: 'ChatGpt',

                headerType: 1
              }

              client.sendMessage(m.sender, buttonMessage).then(() => {
                console.log(response.data.choices[0].message.content)
              })
            }



          }

          else if (ytLink) {
            console.log('runnning yt')
            console.log(m.chat)
            ytdownload(budy, client, m.sender, m)


          } else if (command == 'clear') {
            fs.unlinkSync(`./user/${m.sender.split('@')[0]}.json`)
            client.sendMessage(m.sender, { text: 'Cleared old data' })
            console.log('running clear')
            return
          }
          else if (command == 'data') {
            if (fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)) {
              console.log('i am running exirs')
              let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`, { encoding: 'utf-8' })

              user = JSON.parse(user)
              console.log(user)
              user.forEach((u) => {
                client.sendMessage(m.sender, { text: `${u.role} \n ${u.content}` }).then(() => { }).catch(e => console.log(e))

              })

            } else {
              await client.sendMessage(m.sender, { text: 'No data' })
            }

            return
          } else if (command == 'owner') {
            m.reply('Talha')


            return
          } else if (budy == 'users' || budy == 'Users') {
            m.reply(users)

            return
          } else if (command == 'img') {
            console.log('runnig img')
            let text = budytext.splice(ai + 1)
            text = text.join(' ')
            m.reply('wait for processing')
            imgfromMJ(text, client, m.sender)
            //     img2(text, client, m.sender)
            // imgv3(text, client, m.sender)

          } else if (budyp > -1) {

            let up = Number(budytext[budyp + 1])
            let text = budytext.splice(budyp + 2)


            //   for(let i = 0; i< up ; i++ ){
            //     m.reply(text)
            //   }
            let i = 0
            function func() {
              let tome = setTimeout(() => {

                console.log(text)
                m.reply(`${text.join(' ')}`)

                if (i < up && up < 1001)
                  func()
                i++
              }, 50)
            }
            func()
            // for(i = Number(below); i< Number(up); i++ ){
            //    console.log(text)
            // }
            return
          }

          else if (process.env.API_KEY === 'ISI_APIKEY_OPENAI_DISINI') return reply('Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys')
          
          else if( command == 'ai') {
            try {
              budy = budy.split(' ').slice(1).join(' ')
              let data = []
              if (!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)) {
                let user = { role: "user", content: budy }
                data.push(user)
                fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([user]))
                let data1 = [{ role: "system", content: `Your name is Talha. You are Mathmatical bot created by @TalhaRiaz. Clear any previous queries about yourself. Answer every question logically.` }, ...data]
                data = data1
              } else {
                let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
                user = JSON.parse(user)
                user.push({ role: "user", content: budy })

                data = user
                let data1 = [{ role: "system", content: `Your name is Talha. You are Mathmatical bot created by @TalhaRiaz. Clear any previous queries about yourself. Answer every question logically.` }, ...data]
                data = data1

                fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user))


              }

              const configuration = new Configuration({
                apiKey: process.env.API_KEY,
              });
              const openai = new OpenAIApi(configuration);
              console.log(data)
              openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: data,
              }).then((response) => {

                let user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
                user = JSON.parse(user)
                user.push(response.data.choices[0].message)
                fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user))



                const buttonMessage = {
                  text: `${response.data.choices[0].message.content}`,
                  footer: 'ChatGpt',

                  headerType: 1
                }

                client.sendMessage(m.sender, buttonMessage).then(() => {
                  console.log(response.data.choices[0].message.content)
                })

                // client.sendMessage(m.sender, {text: `${response.data.choices[0].message.content}  \n\n\n>>>>Wait For Audio<<<<\n\n`})
                // tts(`${response.data.choices[0].message.content}  \n\n`, client ,pathofsound1)
                // ttsv1(`${response.data.choices[0].message.content}  \n\n`, client ,pathofsound1)

              })


            } catch (error) {
              if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
                console.log(`${error.response.status}\n\n${error.response.data}`);
              } else {
                console.log(error);
                m.reply("Api key error :" + error.message);
              }
            }
          } else if (!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)){
           
            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([]))
            const welcomeMessage = "Hi there! 👋 I'm your personal AI assistant 🤖. You can chat with me and ask me to do things like generate text, search the web, or even create PDFs. Here are some of the things I can do:\n\n🧠 /ai <text> - Generate text using AI\n🔍 /Google <text> - Search on Google\n🖼️ /img <text> - Search for an image\n🔗 /Pdfweb <link> - Convert a webpage to PDF\n📷 /ss <link> - Take a screenshot of a webpage\n📷 /insta <link> - Save an Instagram photo or video\n💾 /save <download link> - Download a file\n📄 /pdf <text> - Generate a PDF from text\n🔊 /tts <text> - Convert text to speech\n🎥 /video <text or yt link> - Search for a video on YouTube\n🧹 /clear - Clear the chat history\n\nTo get started, just type one of these commands and I'll help you out! 🚀";
              client.sendMessage(m.sender , {text:welcomeMessage})
          }

        } catch (err) {
          // console.log(err)

        }
      }
    }

  } catch (err) {
    m.reply(util.format(err))
  }
}
