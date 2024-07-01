const rwClient = require('./twitterConfig.js');
var cron = require('node-cron');

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

// every hour
cron.schedule('0 * * * *', () => {
    updateProfilePicture('./images/profile.png')
});