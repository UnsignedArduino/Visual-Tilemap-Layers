//% block="Visual TileMap Layers"
//% color="#4B6584"
//% icon="\uf279"
//% group="['Visual TileMap Layer class', 'Easy functions']"
namespace VisualTileMapLayers {
    export class VisualTileMapLayer {
        protected _renderable: scene.Renderable = null;
        protected _visible: boolean;

        constructor(public tilemap: tiles.TileMapData, zIndex: number, public visible: boolean = true) {
            this._renderable = scene.createRenderable(
                zIndex,
                (screen: Image, camera: scene.Camera) => {
                    const tileSize = this.tilemap.getTileImage(0).width;

                    const topRow = Math.floor(camera.drawOffsetY / tileSize);
                    const bottomRow = topRow + Math.ceil(scene.screenHeight() / tileSize) + 1;
                    const leftCol = Math.floor(camera.drawOffsetX / tileSize);
                    const rightCol = leftCol + Math.ceil(scene.screenWidth() / tileSize) + 1;

                    const topOffset = camera.drawOffsetY % tileSize;
                    const leftOffset = camera.drawOffsetX % tileSize;

                    for (let row = topRow; row < bottomRow; row++) {
                        for (let col = leftCol; col < rightCol; col++) {
                            const img = this.tilemap.getTileImage(this.tilemap.getTile(col, row));
                            screen.drawTransparentImage(
                                img,
                                (col - leftCol) * tileSize - leftOffset,
                                (row - topRow) * tileSize - topOffset
                            );
                        }
                    }
                },
                () => {
                    return this.visible;
                }
            );
        }

        public get zIndex(): number {
            return this._renderable.z;
        }

        public set zIndex(z: number) {
            this._renderable.z = z;
        }

        /**
         * Destroy the visual tilemap layer.
         */
        //% block="destroy visual tilemap layer $this"
        //% group="Visual TileMap Layer class"
        //% this.defl=layer
        //% this.shadow=variables_get
        //% weight=30
        public destroy() {
            this._renderable.destroy();
        }
    }

    let _visualTileMapLayers: VisualTileMapLayer[] = [];

    /**
     * Easy method to add a visual tilemap layer. 
     * 
     * Remember the main tilemap is at Z index -1, and higher Z index is rendered later on the screen!
     */
    //% block="add visual tilemap layer $tilemap on z index $zIndex"
    //% group="Easy functions"
    //% tilemap.shadow=tiles_tilemap_editor
    //% weight=100
    export function addVisualTileMapLayer(tilemap: tiles.TileMapData, zIndex: number) {
        _visualTileMapLayers.push(new VisualTileMapLayer(tilemap, zIndex));
    }

    /**
     * Easy method to remove ALL visual tilemap layers on a certain Z index.
     */
    //% block="remove all visual tilemap layers on z index $zIndex"
    //% group="Easy functions"
    //% weight=90
    export function deleteVisualTileMapLayers(zIndex: number) {
        _visualTileMapLayers = _visualTileMapLayers.filter((vtml) => {
            if (vtml.zIndex == zIndex) {
                vtml.destroy();
                return false;
            } else {
                return true;
            }
        })
    }

    /**
     * Creates a visual tilemap layer object and returns to you directly to manage.
     * 
     * Remember the main tilemap is at Z index -1, and higher Z index is rendered later on the screen!
     */
    //% block="create visual tilemap layer $tilemap on z index $zIndex"
    //% blockSetVariable=layer
    //% group="Visual TileMap Layer class"
    //% tilemap.shadow=tiles_tilemap_editor
    //% weight=80
    //% hidden
    export function createVisualTileMapLayer(tilemap: tiles.TileMapData, zIndex: number): VisualTileMapLayer {
        return new VisualTileMapLayer(tilemap, zIndex);
    }

    /**
     * Get the visual tilemap layer's tilemap.
     */
    //% block="get visual tilemap layer $vtml tilemap"
    //% group="Visual TileMap Layer class"
    //% vtml.defl=layer
    //% vtml.shadow=variables_get
    //% weight=75
    //% hidden
    export function getVisualTileMapLayerTileMap(vtml: VisualTileMapLayer): tiles.TileMapData {
        return vtml.tilemap;
    }

    /**
     * Set the visual tilemap layer's tilemap.
     */
    //% block="set visual tilemap layer $vtml tilemap to $tilemap"
    //% group="Visual TileMap Layer class"
    //% vtml.defl=layer
    //% vtml.shadow=variables_get
    //% tilemap.shadow=tiles_tilemap_editor
    //% weight=70
    //% hidden
    export function setVisualTileMapLayerTileMap(vtml: VisualTileMapLayer, tilemap: tiles.TileMapData) {
        vtml.tilemap = tilemap;
    }

    /**
     * Get the visual tilemap layer's Z index.
     */
    //% block="get visual tilemap layer $vtml z index"
    //% group="Visual TileMap Layer class"
    //% vtml.defl=layer
    //% vtml.shadow=variables_get
    //% weight=65
    //% hidden
    export function getVisualTileMapLayerZIndex(vtml: VisualTileMapLayer): number {
        return vtml.zIndex;
    }

    /** 
     * Set the visual tilemap layer's Z index. 
     * 
     * Remember the main tilemap is at Z index -1, and higher Z index is rendered later on the screen!
     */
    //% block="set visual tilemap layer $vtml z index to $z"
    //% group="Visual TileMap Layer class"
    //% vtml.defl=layer
    //% vtml.shadow=variables_get
    //% weight=60
    //% hidden
    export function setVisualTileMapLayerTileMapZIndex(vtml: VisualTileMapLayer, z: number) {
        vtml.zIndex = z;
    }

    /**
     * Get the visual tilemap layer's visibility.
     */
    //% block="get visual tilemap layer $vtml visibility"
    //% group="Visual TileMap Layer class"
    //% vtml.defl=layer
    //% vtml.shadow=variables_get
    //% weight=55
    //% hidden
    export function getVisualTileMapLayerVisibility(vtml: VisualTileMapLayer): boolean {
        return vtml.visible;
    }

    /**
     * Set the visual tilemap layer's visibility. 
     */
    //% block="set visual tilemap layer $vtml visibility to $v"
    //% group="Visual TileMap Layer class"
    //% vtml.defl=layer
    //% vtml.shadow=variables_get
    //% weight=50
    //% hidden
    export function setVisualTileMapLayerTileMapVisibility(vtml: VisualTileMapLayer, v: boolean) {
        vtml.visible = v;
    }
}
