import inquirer from "inquirer";
import qr from "qr-image";
import fs from 'fs';

const messageObject = {
    type: 'input',
    name: 'URL',
    message: 'Type the URL.'
};

inquirer
    .prompt([messageObject]).then((answers) => {
        let qr_svg = qr.image(answers.URL, { type: 'png' });
        qr_svg.pipe(fs.createWriteStream('QRcode.png'));
        // let svg_string = qr.imageSync(answers.URL, { type: 'png' });

        fs.writeFile('saved-url.txt', answers.URL, (err) => {
            if (err) throw err;
        });
    }).catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered");
        } else {
            console.log('Unknown error');
        }
    });