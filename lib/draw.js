export class Drawer {
    constructor(ctx) {
        this.ctx = ctx;
    }
    setStyle(node) {
        const style = node.style;
        const pos = node.getPositionToScene();
        const rotateAngel = node.style.rotateAngel;
        this.ctx.save();
        this.ctx.lineWidth = style.borderWidth;
        this.ctx.fillStyle = style.fillColor;
        this.ctx.strokeStyle = style.borderColor;
        const parent = node.parent;
        if (parent != null) {
            var parentPos = parent.getPositionToScene();
            var parentRotateAngle = parent.style.rotateAngel;
            this.ctx.translate(parentPos.x + parentRotateAngle.x, parentPos.y + parentRotateAngle.y);
            this.ctx.rotate(this.degrees(parent.style.rotation));
            this.ctx.translate(-(parentPos.x + parentRotateAngle.x), -(parentPos.y + parentRotateAngle.y));
            this.ctx.clip(parent.getPath());
        }
        this.ctx.translate(pos.x + rotateAngel.x, pos.y + rotateAngel.y);
        this.ctx.rotate(this.degrees(style.rotation));
        this.ctx.translate(-(pos.x + rotateAngel.x), -(pos.y + rotateAngel.y));
    }
    degrees(degrees) {
        return degrees * Math.PI / 180;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    drawImage(img) {
        var pos = img.getPositionToScene();
        var size = img.size;
        this.ctx.drawImage(img.img, pos.x, pos.y, size.width, size.height);
    }
    draw(node) {
        this.setStyle(node);
        node.draw(this);
        this.ctx.restore();
    }
}
