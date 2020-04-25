/* eslint-disable */
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
    this.downInterval = 1 * 100;

    for (let i = 0; i < this.row; i++) {
      let column = [];
      for (let j = 0; j < this.column; j++) {
        if (i === 0 || j === 0 || j === this.column - 1 || i === this.row - 1)
          column.push("#");
        else column.push(" ");
      }
      this.arrRow.push(column);
    }
    this.generateBlock(p5);
  }
  draw(p5) {
    p5.stroke(255, 0, 0);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let type = this.arrRow[i][j];
        if (type == " ") continue;
        this.setBlockColor(p5, type);
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
    let firstBlock = this.arrBlocks[0];
    this.checkBlock(p5, firstBlock);
    if (p5.millis() - this.lastDownTime > this.downInterval) {
      this.lastDownTime = p5.millis();
      if (firstBlock.stop == null) firstBlock.row += 1;
    }
    this.setBlockColor(p5, firstBlock.type);
    firstBlock.draw(p5, this.cellWidth, this.cellHeight);
    p5.text("New Block" + this.newBlockType, this.width + 100, 100);
  }
  generateBlock(p5) {
    while (this.arrBlocks.length < 5) {
      let newBlock = new Block(
        p5,
        p5.random(["I", "J", "L", "O", "S", "T", "Z"])
      );
      this.arrBlocks.push(newBlock);
    }
    console.log("gen", JSON.stringify(this.arrBlocks));
  }
  checkBlock(p5, block) {
    let found = false;
    // 아래부터 체크하는 게 계산횟수를 줄임.
    // for (let j = block.arrTiles.length - 1; j >= 0; j--) {
    for (let j = block.arrTiles.length - 1; j >= 0; j--) {
      let line = block.arrTiles[j];
      for (let i = 0; i < line.length; i++) {
        if (line[i] != ".") {
          if (this.arrRow[block.row + j + 1][block.col + i] != " ") {
            found = true;
            // 하나라도 닿으면 더 이상 계산이 필요 없음.
            break;
          }
          // 아래 처럼 하면 버그가 생김. 오른쪽이나, 상단만 걸쳐서 닿는 경우는
          // 표시가 안됨
          // if (found) {
          //   this.arrRow[block.row + j][block.col + i] = block.type
          // }
        }
      }
    }
    if (found) {
      // 첫번째 원소 제거
      for (let j = block.arrTiles.length - 1; j >= 0; j--) {
        let line = block.arrTiles[j];
        for (let i = 0; i < line.length; i++) {
          if (line[i] != ".") {
            this.arrRow[block.row + j][block.col + i] = block.type;
          }
        }
      }
      this.arrBlocks.shift();
      this.generateBlock(p5);
    }
  }
  setBlockColor(p5, type) {
    if (type === "#") {
      p5.stroke(0);
      p5.fill(102);
    } else if (type === "I") {
      p5.stroke(0);
      p5.fill(0, 255, 255);
    } else if (type === "J") {
      p5.stroke(0, 0, 128);
      p5.fill(0, 0, 255);
    } else if (type === "L") {
      p5.stroke(128, 64, 0);
      p5.fill(255, 128, 0);
    } else if (type === "O") {
      p5.stroke(128, 128, 0);
      p5.fill(255, 255, 0);
    } else if (type === "S") {
      p5.stroke(0, 128, 0);
      p5.fill(0, 255, 0);
    } else if (type === "T") {
      p5.stroke(64, 0, 64);
      p5.fill(128, 0, 128);
    } else if (type === "Z") {
      p5.stroke(128, 0, 0);
      p5.fill(255, 0, 0);
    } else {
      p5.noFill();
      p5.noStroke();
    }
  }
}
