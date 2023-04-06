const axios = require('axios')
const play = require('play-dl')
const { Client, MusicClient } = require("youtubei");
let download = require('./downloadv2')
const getBuffer = async (url, options) => {
    try {
      options ? options : {};
      const res = await axios({
        method: "get",
        url,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
        },
        ...options,
        responseType: "arraybuffer",
      });
      return res.data;
    } catch (err) {
      return err;
    }
  };

  module.exports =  getYtd= async (client, id,text )=>{
  
    // or for TS / ES6
   
    const run = async () => {
      
      const youtube = new Client();
      const videos = await youtube.search(text, {
        type: "video", // video | playlist | channel | all
      });
       const yt = await play.video_info(`https://www.youtube.com/watch?v=${videos.items[0].id}`)
       
       const data1 =  yt.format.filter((el)=> el.itag == 22)
      
      await download(client,id,data1[0].url,yt.video_details.title,yt.video_details.description)
        
    };
    
    run();
  }
