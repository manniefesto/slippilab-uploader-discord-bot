import { Events } from 'discord.js';
import fetch from 'node-fetch';

async function downloadAndUploadFile(downloadUrl, uploadUrl) {
    // Download the file into memory as a buffer
    const downloadResp = await fetch(downloadUrl);
    if (!downloadResp.ok) throw new Error(`Failed to download: ${downloadResp.statusText}`);
    const fileBuffer = await downloadResp.arrayBuffer();

    // Upload the buffer to the target API
    const uploadResp = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'User-Agent': 'slippilab-uploader-bot'
        },
        body: fileBuffer
    });

    if (!uploadResp.ok) throw new Error(`Failed to upload: ${uploadResp.statusText}`);
    const responseJson = await uploadResp.json();
    console.log('Upload server response:', responseJson);
    return responseJson;
}

export const name = Events.MessageCreate;
export function execute(message) {
    if (message.attachments != undefined && message.attachments.size > 0) {
        message.attachments.forEach(async attachment => {
            var attachamentNameSplit = attachment.name.split('.');
            var fileExtension = attachamentNameSplit[attachamentNameSplit.length - 1];
            if (fileExtension.toLowerCase() == 'slp') {
                var uploadResponse = await downloadAndUploadFile(attachment.url, 'https://slippilab.com/api/replay');
                if (uploadResponse != undefined && uploadResponse.id != undefined) {
                    message.reply(`Replay uploaded successfully! https://slippilab.com/${uploadResponse.id}`);
                    console.log(`Replay uploaded successfully! ID: ${uploadResponse.id}, ${message.author.username}:${message.guild.name}`);
                }
            }
        });
    }
}
