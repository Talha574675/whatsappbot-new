const play = require('play-dl'); // Everything
const download = require('download');
const axios = require('axios')
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
module.exports= googlesearch = async  (client, id, text) => {
try {
    console.log('runnig ytd from play')
    let yt_info = await play.video_info('https://www.youtube.com/watch?v=9ONm1od1QZo')
// console.log(await getBuffer(yt_info.format[yt_info.format.length -1].url))   
 await client.sendMessage(id,{video: {url: yt_info.format[0].url}})
} catch (err) {
    console.log(err)
}
}

