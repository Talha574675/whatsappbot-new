
const { youtube } = require("ytdownloader-fts");
  const fs= require('fs')
 
  const util = require('util')
  const unlink = util.promisify(fs.unlink)
 const https = require('https')
module.exports = ytdownloader=  async(link,client, id, m)=>{
  console.log('in file')
          youtube(link).then((response)=>{
            
            console.log(response)
            if(response.description == ''){
              client.sendMessage(id, {text: `\n Title:  ${response.title} \n  Gender: ${response.gender}\n Views: ${response.vid.views}\n`})

            }else{
              client.sendMessage(id, {text: `\n Title:  ${response.title} \n Description: ${response.description} \n Gender: ${response.gender}\n Views: ${response.vid.views}\n `})

            }
            

            
            response.download.forEach(url => {
          if(url.type == 'video/mp4'){
            if(url.ul == null) return
            const path = './files/video.mp4'
            const file = fs.createWriteStream(path);
            https.get(url.ul, (response) => {
             
            response.pipe(file);
            file.on('finish', () => {
            file.close()
            client.sendMessage(id,
              { video: { url:path}, mimetype: url.type } ,
               { url: path }  )
               .then(()=>{})
           })
            ;})
         
            file.on('error', (res)=>{
             console.log(res)
            })
 
          }
          if(url.type =='audio/mp3'){
            const path = './files/audio.mp3'
            const file = fs.createWriteStream(path);
            https.get(url.ul, (response) => {
            response.pipe(file);
            file.on('finish', () => {
            file.close()

            client.sendMessage(
              m.sender, 
              { audio: { url:path}, mimetype: 'audio/mp4' } ,
              { url: path} 
               // can send mp3, mp4, & ogg
           
          ).then((res)=>{
              
          })
 
           })
            ;})
         
            file.on('error', (res)=>{
             console.log(res)
            })
 
          }
         
       });
       })
       }
       
