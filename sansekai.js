const { BufferJSON, WA_DEFAULT_EPHEMERAL,makeWASocket, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType ,MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys')
const wa = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { Configuration, OpenAIApi } = require("openai")
const { jsPDF } = require("jspdf");
const sendFileFromExtension = require('./sendfileusingextension') 
const downloadv1 = require('./downloadv1.js')
const imgfromMJ = require('./img.js')
const ttsv1 = require('./ttsv1.js')
require('dotenv').config();
let message = ''
let users = []
let key = true
let getData = require('./downloadv2.js')
const ss = require('./ss.js')
let ssv2 = require('./ssv2.js')
const instadownloader = require('./insta.js')
const ytdownload = require('./ytdownload')
const sendfromlink = require('./sendfromlink.js')
const path = require('path')
const download = require('./download.js')
const pdf = require('./pdf.js')
const validUrl = require('valid-url');
let pathofsound1 = path.join(__dirname , 'files', 'output4.mp3') 
const fs1 = require('fs-extra');
const removeDir = util.promisify(fs1.emptyDir)
const { exec } = require('child_process');
console.log('running still')
const pdfofweb = require('./gplay.js')
module.exports = sansekai = async (client, m, chatUpdate, store) => {
   
    try {
     
		if (m.text == 'stopbot') {
            key = false
            m.reply('bot is turned off')
        }
        if( m.text == 'startbot'){
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
        const arg = budy.trim().substring(budy.indexOf(' ') + 1 )
        const arg1 = arg.trim().substring(arg.indexOf(' ') + 1 )

        const from = m.chat
        const reply = m.reply
        const sender = m.sender
        const mek = chatUpdate.messages[0]

        const color = (text, color) => {
            return !color ? chalk.green(text) : chalk.keyword(color)(text)
        }
	
        // Group
        const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => {}) : ''
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
        } else if (!true) {
            if (isCmd2 && !m.isGroup) {
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`))
                } else if (isCmd2 && m.isGroup) {
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`), chalk.blueBright('IN'), chalk.green(groupName))
                }
        }
    if(budy == '/menu'){
        m.reply(`send "startbot to turn on bot" <br> send "stopbot" to stop bot <br> send Clear to "delete" history`)
    }
    
    
 
 console.log(m.sender)   
    if ( key ) {
	console.log('running main')
      users.push(m.sender)

    
  
        if (budy) {
        console.log(budy);
         let budytext = budy.split(' ')
         let budyp = budytext.indexOf('Say')
         let ai= budytext.indexOf('img')
         let ytLink = budy.split('.')[0] == 'https://youtu';
         let insta = budy.split('.')[1] == 'instagram'
            try {

           if(budy.startsWith('ss') || budy.startsWith('Ss') ){
             
             ssv2(client,m.sender,budy.split(' ')[1])
             
                
          }else if(budy.startsWith('insta')|| budy.startsWith('Insta')){

                console.log('running insta')
                let lang = budy.split(' ')[1]
                instadownloader(lang, client, m.sender, `./users/${m.sender.split('@')[0]}video.mp4`)
            }
               else if(budy.startsWith('tts') || budy.startsWith('Tts')){
               let text = budy.split(' ').splice(1)
                ttsv1(`${text}`, client ,pathofsound1, 'en')

            }
            else if(budy.startsWith('menu')|| budy.startsWith('Menu') ){
             client.sendMessage(m.sender, {text:'commands \n 1) send insta <link> \n\n2) tts <text> \n \n3) img <text>\n\n4) save <link> \n provide direct download link \n\n5) pdf <text> \n\n6) ai <text> \n\n7) clear \n\n8) Pdfweb <link> \n\n9) Restart \n\n10) ss <link> '  })

         } else if(budy.startsWith('restart')  || budy.startsWith('Restart') && m.sender == '923185853847@s.whatsapp.net'){
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
                      client.sendMessage(m.sender, {text: ' Cleared all data'})
                    }
                  });
                
               console.log('done')
            
         } else if(budy.startsWith('pdfweb') || budy.startsWith('Pdfweb') ){
          let text = budy.split(' ')[1]
          let time = budy.split(' ')[2]
          time = 1000*time
        
          if(text.startsWith('https')){
            if (validUrl.isUri(text)){
              if(time)
              pdfofweb(client, m.sender,text, time)
              else 
              pdfofweb(client, m.sender,text, 5000)

          } else {
              client.sendMessage(m.sender, {text:'please enter valid url'})
              console.log('please ennter valid url')
             
            }
          
          }else{
            if (validUrl.isUri(`https://${text}`)){
              if(time)
              pdfofweb(client, m.sender,`https://${text}`, time)
              else
              pdfofweb(client, m.sender,`https://${text}`, 5000)

          } else {
              client.sendMessage(m.sender, {text:'please enter valid url'})
              console.log('please ennter valid url')
            }
         
           }  
        }else if(budy.startsWith('pdf') || budy.startsWith('Pdf') ){
                let text = budy.split(' ').splice(1)
               
               pdf(client, m.sender, text.join(' '))
             } 
             else if(budy.startsWith('download') || budy.startsWith('Download') ){
                let text = budy.split(' ').splice(1).join(' ')
                      if (validUrl.isUri(text)){
                        download(client,m.sender,text, 'Your file','Talha DOwnlaoder')
                    } else {
                        const buttonMessage = {
                            text: `not a valid url`,
                           
                        }
                        
                       client.sendMessage(m.sender, buttonMessage).then(()=>{
                          console.log(response.data.choices[0].message.content)
                       })
                      }
                
                
               
             } else if(budy.startsWith('save') || budy.startsWith('Save') ){
              let text = budy.split(' ')[1]
              let exten = budy.split(' ')[2]
                    if (validUrl.isUri(text)){
                      getData(client,m.sender,text,exten)
                  } else {
                      const buttonMessage = {
                          text: `not a valid url`,
                         
                      }
                      
                     client.sendMessage(m.sender, buttonMessage).then(()=>{
                        console.log()
                     })
                    }
              
              
             
           }
             else if(budy.startsWith('file') || budy.startsWith('File') ){
                let text = budy.split(' ').splice(1).join(' ')
                      if (validUrl.isUri(text)){
                        downloadv1(client,m.sender,text, './files','Talha DOwnlaoder')
                    } else {
                        const buttonMessage = {
                            text: `not a valid url`,
                            footer: 'ChatGpt',
                            
                            headerType: 1
                        }
                        
                       client.sendMessage(m.sender, buttonMessage).then(()=>{
                          console.log(response.data.choices[0].message.content)
                       })
                      }
                
                
               
             }
             else if(budy.startsWith('get') || budy.startsWith('Get') ){
                let text = budy.split(' ').splice(2).join(' ')
                const exten = budy.split(' ')[1]
                console.log(exten)
                      if (validUrl.isUri(text)){
                        sendFileFromExtension(client,m.sender,text, 'Your file','Talha DOwnlaoder',exten)
                    } else {
                        const buttonMessage = {
                            text: `not a valid url`,
                            footer: 'ChatGpt',
                            
                            headerType: 1
                        }
                        
                       client.sendMessage(m.sender, buttonMessage).then(()=>{
                          console.log(response.data.choices[0].message.content)
                       })
                      }
                
                
               
             }

               else if(ytLink){
                 console.log('runnning yt')
                 console.log(m.chat)
                    ytdownload(budy, client, m.sender, m)
                  
                
                }else if(budy == 'Clear'|| budy == 'clear'){
                       fs.unlinkSync(`./user/${m.sender.split('@')[0]}.json`)
                        client.sendMessage(m.sender, {text: 'Cleared old data'})
                        console.log('running clear')
                      return
                }
				else if(budy == 'Data'  || budy == 'data'  || budy == 'logs'){
					if(fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)){
                        console.log('i am running exirs')   
                       let  user = fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`, {encoding:'utf-8'})
                       
                        user = JSON.parse(user)
                        console.log(user)
                          user.forEach((u)=>{
                            client.sendMessage(m.sender, {text: `${u.role} \n ${u.content}`}).then(()=>{}).catch(e=>console.log(e))

                          })                        
                 
                      }else{
                        await client.sendMessage(m.sender, {text: 'No data'})
                      }
                      
					return
				} else if(budy == 'Owner'  || budy == 'owner' ){
                      m.reply('Talha')               
                 
                    
					return
				}else if(budy == 'users'  || budy == 'Users' ){
					m.reply(users)
                   
					return
				}else if(ai > -1){
                 console.log('runnig img')
					let text = budytext.splice(ai +1)
                    text = text.join(' ')
                    m.reply('wait for processing')
                    imgfromMJ(text, client, m.sender)
                //     img2(text, client, m.sender)
                    // imgv3(text, client, m.sender)
                   
				}else if(budyp > -1){
                    
                    let up = Number(budytext[budyp+1])
                    let text = budytext.splice(budyp +2)
                  
                
                //   for(let i = 0; i< up ; i++ ){
                //     m.reply(text)
                //   }
                let i = 0
                  function func() {
                      let tome =   setTimeout(() => {
                            
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
        else if( budy.startsWith('ai') || budy.startsWith('Ai')) {   try {
            budy = budy.split(' ').slice(1).join(' ') 
            let data = []
            if(!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)){
                let user = {role: "user", content: budy}
               data.push(user)
               fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([user]))
               let data1 = [{role: "system", content:  `Your name is Talha. You are Mathmatical bot created by @TalhaRiaz. Clear any previous queries about yourself. Answer every question logically.`}, ...data]
               data = data1
            } else{
                let user =  fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
                user = JSON.parse(user)
                user.push({role: "user", content: budy})
          
             data = user
            let data1 = [{role: "system", content: `Your name is Talha. You are Mathmatical bot created by @TalhaRiaz. Clear any previous queries about yourself. Answer every question logically.`}, ...data]
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
                messages:data,
              }).then((response)=>{
             
               let user =  fs.readFileSync(`./user/${m.sender.split('@')[0]}.json`)
               user = JSON.parse(user)
            user.push(response.data.choices[0].message)
            fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify(user))

           
              
              const buttonMessage = {
                  text: `${response.data.choices[0].message.content}`,
                  footer: 'ChatGpt',
                  
                  headerType: 1
              }
              
             client.sendMessage(m.sender, buttonMessage).then(()=>{
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
        } else if(!fs.existsSync(`./user/${m.sender.split('@')[0]}.json`)){
              client.sendMessage(m.sender, {text: `Welcome to Talha's bot. \n Send *menu* to get all commands`})
              fs.writeFileSync(`./user/${m.sender.split('@')[0]}.json`, JSON.stringify([]))
            }
           
            } catch(err) {
                // console.log(err)
               
            }
        }
    }  
   
    if (!true) {
        if (isCmd2) {
            switch(command) { 
                case 'ai':
                    try {
                        if (process.env.API_KEY === 'ISI_APIKEY_OPENAI_DISINI') return reply('Api key has not been filled in\n\nPlease fill in the apikey first in the key.json file\n\nThe apikey can be created in website: https://beta.openai.com/account/api-keys')
                        if (!text) return reply(`Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`)
                        const configuration = new Configuration({
                            apiKey: process.env.API_KEY,
                        });
                        const openai = new OpenAIApi(configuration);
                    
                        const response = await openai.createCompletion({
                            model: "text-davinci-003",
                            prompt: text,
                            temperature: 0.3,
                            max_tokens: 3000,
                            top_p: 1.0,
                            frequency_penalty: 0.0,
                            presence_penalty: 0.0,
                        });
                        m.reply(`${response.data.choices[0].text}\n\n`)
                    } catch (err) {
                        console.log(err)
                        m.reply('Maaf, sepertinya ada yang error')
                    }
                    break
                    
                default:{
                
                    if (isCmd2 && budy.toLowerCase() != undefined) {
                        if (m.chat.endsWith('broadcast')) return
                        if (m.isBaileys) return
                        if (!(budy.toLowerCase())) return
                        if (argsLog || isCmd2 && !m.isGroup) {
                            // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                            console.log(chalk.black(chalk.bgRed('[ ERROR ]')), color('command', 'turquoise'), color(argsLog, 'turquoise'), color('tidak tersedia', 'turquoise'))
                            } else if (argsLog || isCmd2 && m.isGroup) {
                            // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                            console.log(chalk.black(chalk.bgRed('[ ERROR ]')), color('command', 'turquoise'), color(argsLog, 'turquoise'), color('tidak tersedia', 'turquoise'))
                            }
                    }
                }
            }
        }
    }
        
    } catch (err) {
        m.reply(util.format(err))
    }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
// const webjs = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
// const client = new webjs.Client();

// client.on('qr', (qr) => {

// });

// client.on('ready', () => {
 
//     console.log('Client is ready!');
// });
// client.on('message', message => {
// 	if(message.body === 'ping') {
// 		message.reply('pong');
// 	}
// });
 

// client.initialize();
 
