

const play = require('play-dl')
const { Client, MusicClient } = require("youtubei");
let download = require('./downloadv2')


  module.exports =  getYtd= async (client, id,text )=>{
  
    // or for TS / ES6
 try {
    
     
       
       const youtube = new Client();
       const videos = await youtube.search(text, {
         type: "video", // video | playlist | channel | all
       });
        const yt = await play.video_info(`https://www.youtube.com/watch?v=${videos.items[0].id}`)
        
        const data1 =  yt.format.filter((el)=> el.itag == 22)
        const audio = yt.format.filter((el=> el.mimeType == 'audio/webm; codecs="opus"'))
        
        client.sendMessage(id, {text: audio[0].url})
        
 } catch (error) {
  console.log(error)
 }
    
    
   
  }
