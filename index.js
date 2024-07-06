const rwClient = require('./twitterConfig.js');
var cron = require('node-cron');
const fs = require('fs');
const fetch = require('node-fetch');

console.log("\x1b[34m                   +++                  ");
console.log("               ++++++++++               ");
console.log("         ++++++++++++++++++++++         ");
console.log("       ++++++++++++++++++++++++++       ");
console.log("      ++++++++++++++++++++++++++++      ");
console.log("      ++++++++++++++++++++++++++++      ");
console.log("      ++++++++++++++++++++++++++++      ");
console.log("    ++++++++++++++++++++   +++++++++    ");
console.log("   ++++++++++++++++++++   +++++++++++   ");
console.log("   ++++++++++++++++++   ++++++++++++++  ");
console.log("   +++++++++    +++    +++++++++++++++  ");
console.log("   +++++++++++       ++++++++++++++++   ");
console.log("    ++++++++++++   +++++++++++++++++    ");
console.log("      +++++++++++ ++++++++++++++++      ");
console.log("      ++++++++++++++++++++++++++++      ");
console.log("      ++++++++++++++++++++++++++++      ");
console.log("       ++++++++++++++++++++++++++       ");
console.log("         ++++++++++++++++++++++         ");
console.log("               ++++++++++               ");
console.log("                   +++                  ");
console.log("                                        ");
console.log("\x1b[0m");  // Reset color

console.log("Running BluecheckGONE v1.0.0 - 07/01/24 by @IAmTh3Person")


var isVerified;
var profilePictureVar;

async function grabAndDownloadProfilePicture(profilePicture) {
    const response = await fetch(profilePicture);
    const buffer = await response.buffer();
    fs.writeFile(`./images/profile.png`, buffer, () => console.log('Profile picture downloaded!'));
    return true;
}

async function grabUserData() {
    const data = await rwClient.v2.me({
        'user.fields': 'profile_image_url,verified,verified_type'
    })
    profilePictureVar = data.data.profile_image_url.replace("_normal", "");
    isVerified = data.data.verified;
    return true;
}

async function updateProfilePicture(imagePath) {
    const data = await rwClient.v1.updateAccountProfileImage(imagePath);
    console.log(data)
    if(data.verified === false) {
        console.log('Checkmark removed successfully!')
        return true;
    } else {
        console.log('Checkmark not removed!')
        return false;
    }
}

//check if profile picture is already downloaded
async function checkProfilePicture() {
    await grabUserData();
    if(isVerified === false) {
        console.log('Account is not currently verified. Exiting...')
        return false;
    }
    if(!fs.existsSync('./images')) fs.mkdirSync('./images')
    if (!fs.existsSync('./images/profile.png')) {
        await grabAndDownloadProfilePicture(profilePictureVar);
        await updateProfilePicture('./images/profile.png')
    } else {
        console.log('Profile picture already downloaded. Skipping...')
        await updateProfilePicture('./images/profile.png')
    }
}

cron.schedule('0 * * * *', () => {
    checkProfilePicture()
});