/* utilities.js */

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function graphicsMask(source, mask) {
    // source image
    var sourceImage = createImage(source.width, source.height);
    sourceImage.copy(source, 0, 0, source.width, source.height, 0, 0, source.width, source.height);

    // mask image
    var maskImage = createImage(mask.width, mask.height);
    maskImage.copy(mask, 0, 0, mask.width, mask.height, 0, 0, mask.width, mask.height);

    // make image
    sourceImage.mask(maskImage);

    return sourceImage;
}

function quicksort(origArray) {
	if (origArray.length <= 1) {
		return origArray;
	} 
    else {
		var left = [];
		var right = [];
		var newArray = [];
		var pivot = origArray.pop();
		var length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i] <= pivot) {
				left.push(origArray[i]);
			} 
            else {
				right.push(origArray[i]);
			}
		}

		return newArray.concat(quicksort(left), pivot, quicksort(right));
	}
}

