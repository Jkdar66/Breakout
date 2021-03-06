import { Button } from "../lib/button.js";
import { Vector2DConfig } from "../lib/config.js";
import { Grid } from "../lib/grid.js";
import { Group } from "../lib/group.js";
import { Size, Vector2D } from "../lib/math.js";
import { Scene } from "../lib/scene.js";
import { Style } from "../lib/style.js";
import { Game, GameState } from "./game.js";

export class Gui extends Group {
    game: Game;
    top: Group;
    center: Grid;
    bottom: Group;
    btnGroup: Group;
    start: Button;
    newGame: Button;
    option: Button;
    exit: Button;

    constructor(position: Vector2D | Vector2DConfig, size: Size, scene: Scene, game: Game) {
        super(position, size, scene);
        this.scene = scene;
        this.game = game;
        const WIDTH = this.size.width;
        const HEIGHT = this.size.height;

        const BUTTON_NUMS = 4;
        const COLUMN_SPACE = 10;
        const COLUMN_WIDTH = WIDTH/2 - COLUMN_SPACE*2;
        const COLUMN_HEIGHT = (HEIGHT/2 - (BUTTON_NUMS*COLUMN_SPACE)*2) /BUTTON_NUMS;

        this.top = new Group(new Vector2D(0, 0), new Size(WIDTH, HEIGHT/4), this.scene);
        this.bottom = new Group(new Vector2D(0, HEIGHT/4 + HEIGHT/2), new Size(WIDTH, HEIGHT/4), this.scene);

        this.add(this.top);
        this.add(this.bottom);

        // this.top.style.borderColor = "rgb(255, 255, 255)";
        // this.top.style.borderWidth = 2;
        // this.bottom.style.borderColor = "rgb(255, 255, 255)";
        // this.bottom.style.borderWidth = 2;
        
        var centerPos = new Vector2D((WIDTH - (COLUMN_WIDTH + COLUMN_SPACE*2))/2, HEIGHT/4);
        var centerSize = new Size(COLUMN_WIDTH + COLUMN_SPACE*2, HEIGHT/2);
        this.center = new Grid(centerPos, centerSize, this.scene, COLUMN_WIDTH, COLUMN_HEIGHT);
        this.center.innerSpace = COLUMN_SPACE;
        this.add(this.center);

        this.start = new Button(new Vector2D(0, 0), new Size(COLUMN_WIDTH, COLUMN_HEIGHT), "Start");
        this.newGame = new Button(new Vector2D(0, 0), new Size(COLUMN_WIDTH, COLUMN_HEIGHT), "New Game");
        this.option = new Button(new Vector2D(0, 0), new Size(COLUMN_WIDTH, COLUMN_HEIGHT), "Option");
        this.exit = new Button(new Vector2D(0, 0), new Size(COLUMN_WIDTH, COLUMN_HEIGHT), "Exit");

        this.center.add(this.start, 0, 0);
        this.center.add(this.newGame, 0, 1);
        this.center.add(this.option, 0, 2);
        this.center.add(this.exit, 0, 3);

        this.onAction(this.start);
        this.onAction(this.newGame);
        this.onAction(this.option);
        this.onAction(this.exit);

        this.start.event.onClick(() =>{
            this.game.visibility = true;
            this.visibility = false;
        });

    }

    private onAction(btn: Button) {
        btn.event.onEnter(() => {
            btn.style.borderColor = "rgb(0, 255, 255)";
            btn.style.fillColor = "rgba(150, 150, 150, 1)";
            btn.text.style.fillColor = "rgb(0, 255, 255)";
        });
        btn.event.onOut(() => {
            btn.style.fillColor = "rgba(100, 100, 100, 1)";
            btn.style.borderColor = "rgb(255, 255, 255)";
            btn.text.style.fillColor = "rgb(255, 255, 255)";
        });
    }

}
