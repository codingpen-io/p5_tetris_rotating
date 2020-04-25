export default class Block {
  constructor(p5, type) {
    this.type = type;
    if (type === "I") {
      this.arrTiles = [[".", "*"], [".", "*"], [".", "*"], [".", "*"]];
    } else if (type === "J") {
      this.arrTiles = [["*", "*"], ["*", "."], ["*", "."], [".", "."]];
    } else if (type === "L") {
      this.arrTiles = [[".", "."], ["*", "."], ["*", "."], ["*", "*"]];
    } else if (type === "O") {
      this.arrTiles = [["*", "*"], ["*", "*"], [".", "."], [".", "."]];
    } else if (type === "S") {
      this.arrTiles = [["*", "."], ["*", "*"], [".", "*"], [".", "."]];
    } else if (type === "T") {
      this.arrTiles = [["*", "."], ["*", "*"], ["*", "."], [".", "."]];
    } else if (type === "Z") {
      this.arrTiles = [[".", "*"], ["*", "*"], ["*", "."], [".", "."]];
    }
    this.row = 1;
    this.col = Math.round(p5.random(1, 9));
    //this.col = 9;
  }
  draw(p5, cellWidth, cellHeight) {
    for (let j = 0; j < this.arrTiles.length; j++) {
      let line = this.arrTiles[j];
      for (let i = 0; i < line.length; i++) {
        if (line[i] === "*")
          p5.rect(
            (this.col + i) * cellWidth,
            (this.row + j) * cellHeight,
            cellWidth,
            cellHeight
          );
      }
    }
  }
}
