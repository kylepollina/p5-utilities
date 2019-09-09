/*************
 ** Grid.js **
 ************/

class Grid {
    constructor(x, y, width, height, nCols, nRows) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.nCols = nCols;
        this.nRows = nRows;
        this.tileWidth = this.width / this.nCols;
        this.tileHeight = this.height / this.nRows;
        this.tiles = [];
        this.mouseHighlight = false;
        this.singleSelect = false;
        this.selectedTiles = [];

        let tileNum = 0;
        for(let y = 0; y < this.nRows; y++) {
            for(let x = 0; x < this.nCols; x++) {
                let tileX = x * this.tileWidth + this.x;
                let tileY = y * this.tileHeight + this.y;
                let tile = new Tile(tileX, tileY, this.tileWidth, this.tileHeight, tileNum);
                this.tiles.push(tile);
                tileNum++;
            }
        }
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
        this.tileWidth = this.width / this.nCols;
        this.tileHeight = this.height / this.nRows;

        for(let x = 0; x < this.nCols; x++) {
            for(let y = 0; y < this.nRows; y++) {
                let tileX = x * this.tileWidth + this.x;
                let tileY = y * this.tileHeight + this.y;

                let tileIndex = x + y * this.nCols;
                this.tiles[tileIndex].resize(tileX, tileY, this.tileWidth, this.tileHeight);
            }
        }
    }

    show() {
        for(let y = 0; y < this.nRows; y++) {
            for(let x = 0; x < this.nCols; x++) {
                let tile = this.getTile(x, y);
                noFill();

                if(this.mouseHighlight && tile.isMouseOver() || tile.isSelected == true) {
                    stroke(255);
                }
                else {
                    stroke(0);
                }
               
                rect(tile.x, tile.y, tile.width, tile.height);
            }
        }
    }

    getTile(x, y) {
        let index = y * this.nCols + x;
        return this.tiles[index];
    }

    getItem(x, y) {
        let index = y * this.nCols + x;
        return this.tiles[index].item;
    }
    
    setItem(x, y, item) {
        let index = y * this.nCols + x;
        this.tiles.item = item;
    }

    select() {
        for(let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];

            if(tile.isMouseInside()) {
                tile.toggleSelect();
                if(this.singleSelect) this.clearSelected();
                if(tile.isSelected) this.selectedTiles.push(tile);
                else {
                    let tileIndex = this.selectedTiles.indexOf(tile);
                    this.selectedTiles.splice(tileIndex, 1);
                }

                return this.tiles[i];
            }
        }

        return null;
    }

    hasSelectedTiles() {
        return this.selectedTiles.length > 0;
    }

    clearSelected() {
        for(let i = 0; i < this.selectedTiles.length; i++) {
            let tile = this.selectedTiles[i];
            tile.isSelected = false;
        }
        this.selectedTiles = [];
    }

    isMouseOver() {
        return (this.x <= mouseX && mouseX < this.x + this.width 
                && this.y <= mouseY && mouseY < this.y + this.height);
    }

    tileUnderMouse() {
        let relativeX = mouseX - this.x;
        let relativeY = mouseY - this.y;
        let col = floor(relativeX / this.tileWidth);
        let row = floor(relativeY / this.tileHeight);

        return this.getTile(col, row);
    }
}

class Tile {
    constructor(x, y, width, height, tileNum) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;
        this.isSelected = false;
        this.tileNum = tileNum;
        this.item = null;
    }

    resize(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.centerX = this.x + this.width / 2;
        this.centerY = this.y + this.height / 2;
    }

    setItem(item) {
        this.item = item;
    }

    isMouseInside() {
        return (this.x <= mouseX && mouseX < this.x + this.width 
                && this.y <= mouseY && mouseY < this.y + this.height);
    }

    toggleSelect() {
        if(this.isSelected) this.isSelected = false;
        else this.isSelected = true;
    }
}
