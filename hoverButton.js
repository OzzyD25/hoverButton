import TweenMax, { Power2, Elastic } from 'gsap';

class HoverButton {
  constructor(el) {
    this.el = el;
    this.hover = false;
    this.mouseDown = false;
    this.calculatePosition();
    this.attachEventsListener();
  }

  attachEventsListener() {
    window.addEventListener('mousemove', e => this.onMouseMove(e));
    window.addEventListener('resize', e => this.calculatePosition(e));
    // this.el.addEventListener("mousedown", this.onMouseDown, false)
    // this.el.addEventListener("mouseup", this.onMouseUp, false)
  }

  calculatePosition() {
    TweenMax.set(this.el, {
      x: 0,
      y: 0,
      scale: 1,
    });
    const box = this.el.getBoundingClientRect();
    this.x = box.left + box.width * 0.5;
    this.y = box.top + box.height * 0.5;
    this.width = box.width;
    this.height = box.height;
  }

  onMouseMove(e) {
    if (this.mouseDown) return;
    let hover = false;
    const hoverArea = this.hover ? 0.7 : 0.5;
    const x = e.clientX - this.x;
    const y = e.clientY - this.y;
    const distance = Math.sqrt(x * x + y * y);
    if (distance < this.width * hoverArea) {
      hover = true;
      if (!this.hover) {
        this.hover = true;
      }
      this.onHover(e.clientX, e.clientY);
    }

    if (!hover && this.hover) {
      this.onLeave();
      this.hover = false;
    }
  }

  onHover(x, y) {
    if (this.mouseDown) return;
    TweenMax.to(this.el, 0.4, {
      x: (x - this.x) * 0.2,
      y: (y - this.y) * 0.2,
      scale: 1,
      ease: Power2.easeOut,
    });
  }

  onLeave() {
    if (this.mouseDown) return;
    TweenMax.to(this.el, 0.7, {
      x: 0,
      y: 0,
      scale: 1,
      ease: Elastic.easeOut.config(1.2, 0.4),
    });
  }

  onMouseDown() {
    this.mouseDown = true;
  }

  onMouseUp() {
    this.mouseDown = false;
  }
}

export default HoverButton;
