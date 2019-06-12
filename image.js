/************
 * Image.js *
 ***********/

function getAvgColor(image, xmin, ymin, xmax, ymax) {
    let rtot = 0;
    let gtot = 0;
    let btot = 0;
    let total = 0;

    for(let x = floor(xmin); x <= floor(xmax) && x < image.width; x++) {
        for(let y = floor(ymin); y <= floor(ymax) && y < image.height; y++) {
            let index = (x + y * image.width) * 4;

            rtot += img.pixels[index];
            gtot += img.pixels[index+1];
            btot += img.pixels[index+2];
            total++;
        }
    }

    return color(rtot / total, gtot / total, btot / total);
}

