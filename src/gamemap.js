import Block from "./block";

export default class GameMap {
  constructor(p5, width, height) {
    this.row = 22;
    this.column = 12;
    this.width = width;
    this.height = height;
    this.cellWidth = this.width / this.column;
    this.cellHeight = this.height / this.row;
    this.arrRow = [];
    this.lastBlockTime = 0;
    this.lastDownTime = 0;
    this.arrBlocks = [];
    this.newBlockType = "";
    this.blockInterval = 5 * 1000;
    this.downInterval = 1 * 1000;
    for (let i = 0; i < this.row; i++) {
      let column = [];
      for (let j = 0; j < this.column; j++) {
        if (i === 0 || j === 0 || j === this.column - 1 || i === this.row - 1)
          column.push("#");
        else column.push(" ");
      }
      this.arrRow.push(column);
    }
  }
  draw(p5) {
    p5.stroke(255, 0, 0);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let cell = this.arrRow[i][j];
        if (cell === "#") {
          p5.fill(102);
        } else if (cell === "I") {
          p5.fill(0, 255, 255);
        } else {
          p5.noFill();
        }
        p5.rect(
          j * this.cellWidth,
          i * this.cellHeight,
          this.cellWidth,
          this.cellHeight
        );
        //p5.rect(i * this.cellWidth, 0, this.cellWidth, this.cellHeight);
      }
    }
    p5.fill("yellow");
    console.log("p5.millis():", p5.millis());
    //debugger;
    if (
      this.lastBlockTime == 0 ||
      p5.millis() - this.lastBlockTime > this.blockInterval
    ) {
      //p5.text("time" + elapsed, 100, 100);
      //console.log("generate block")
      this.lastBlockTime = p5.millis();
      this.generateBlock(p5);
    }
    if (
      this.lastDownTime == 0 ||
      p5.millis() - this.lastDownTime > this.downInterval
    ) {
      //p5.text("time" + elapsed, 100, 100);
      //console.log("generate block")
      this.lastDownTime = p5.millis();
      for (let block of this.arrBlocks) {
        block.row += 1;
      }
    }
    //console.log(this.arrBlocks.length);
    for (let block of this.arrBlocks) {
      //p5.rect(block.column * this.cellWidth, block.row * this.cellHeight, this.cellWidth, this.cellHeight)
      block.draw(p5, this.cellWidth, this.cellHeight);
    }
    p5.text("New Block" + this.newBlockType, this.width + 100, 100);
  }
  generateBlock(p5) {
    if (this.arrBlocks.length < 30) {
      let newBlock = new Block(
        p5,
        p5.random(["I", "J", "L", "O", "S", "T", "Z"])
      );
      //debugger
      console.log(newBlock.row, newBlock.col);
      this.arrBlocks.push(newBlock);
    }
  }
}
