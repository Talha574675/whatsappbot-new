const puppeteer = require('puppeteer');
const url = require('url');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const getData = require('./downloadv2')
let ss = require('./ss.js')

function isDownloadable(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol
      .request(url, { method: 'HEAD' }, (res) => {
        const contentType = res.headers['content-type'];
        resolve(contentType && contentType.startsWith('application'));
      })
      .on('error', reject)
      .end();
  });
}

const isDownloadLink = href => {
  const parsed = url.parse(href);
  const ext = path.extname(parsed.pathname);
  return ext && (ext.toLowerCase() !== '.html' && ext.toLowerCase() !== '.htm');
};
module.exports= ss = async (client, id ,url) => {

  console.log('running ssv1')
  try {
    await client.presenceSubscribe(id)


		await client.sendPresenceUpdate('composing', id)
	

		await client.sendPresenceUpdate('paused', id)

    const browser = await puppeteer.launch({ headless: true , args: ['--no-sandbox']  });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();
    });
    const links = await page.$$eval('a', links => links.map(link => ({ href: link.href || 'NULL', textContent: link.textContent || 'NULL' })));
    const downloadLinks = links.filter(link => isDownloadLink(link.href));
    const dLinks = []
    downloadLinks.forEach(async(er)=>{
        if(await isDownloadable(er)) dLinks.push(` ${er} \n\n `)
    })
    
    const data = []
    links.forEach((el)=>{
        data.push(`Content:${el.textContent}\n ${el.href} \n\n`)
    })
   
    const screenshot = await page.screenshot({ fullPage: true });
    const buttonMessage = {
        image: screenshot,
        caption:data.join(' '),
    }
    
     await client.sendMessage(id, buttonMessage)
     if(downloadLinks.length != 0){
    await client.sendMessage(id, dLinks.join(' ') )        
     };
  
    await browser.close();
  } catch (error) {
   
    ss(client,id,url)
    getData(client, id,url)
    console.error(error);
   
  }
}


