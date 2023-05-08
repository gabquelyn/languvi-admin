import AWS from 'aws-sdk';
const S3 = new AWS.S3();
import sendResponse from '../../lib/sendResponse';
async function downloadfiles(event, context){
    const download_links = [];
    const filenames = JSON.parse(event.body);
    for(const filename of filenames){
        const contentDisposition = `attachment; filename=${filename}`
        const params = {
            Bucket: process.env.CLIENT_BUCKET_NAME,
            Key: `clientdocuments/${filename}`,
            ResponseContentDisposition: contentDisposition,
            Expires: 60 * 5 //expires in an 5 mins
        }

        try{
            const url = await S3.getSignedUrl(params).promise();
            download_links.push(url)
        }catch(err){
            console.error(err);
            return sendResponse(501, {message: err.message})
        }
    }

    return sendResponse(200, {message: download_links})
}

export const handler = downloadfiles