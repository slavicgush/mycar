class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    // top of the road goes infinity
    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

  getLaneCenter(laneIndex) {
    //define the center of each lane
    const laneWidth = this.width / this.laneCount;

    //the car always goes to the right most possible lane
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth
    );
  }

  // draw a road
  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for (let i = 1; i <= this.laneCount - 1; i++) {
      //lerp - linear interpolation - utils.js
      const x = lerp(this.left, this.right, i / this.laneCount);
      ctx.setLineDash([20, 20]);
      ctx.beginPath(); //starts a new path by emptying the list of sub-paths
      ctx.moveTo(x, this.top); //moves the current window to the specified coordinates.
      ctx.lineTo(x, this.bottom); //adds a straight line to the current sub-path by
      ctx.stroke(); //outlines the current or given path with the current stroke style
    }

    ctx.setLineDash([]);
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    });
  }
}
