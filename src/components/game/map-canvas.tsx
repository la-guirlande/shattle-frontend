import { FC, HTMLProps, useEffect, useMemo, useRef } from 'react';
import { GameData } from '../../util/types/data-types';

export interface MapCanvasProps extends HTMLProps<HTMLCanvasElement> {
  game: GameData;
}

export const MapCanvas: FC<MapCanvasProps> = ({ game, ...rest }) => {
  const { map } = game;
  const canvasRef = useRef<HTMLCanvasElement>();
  let animationFrameId: number;

  const imageTiles = useMemo(() => {
    const tileset = map.config.tilesets[0];
    const tiles = [];
    for (let y = 0; y < tileset.imageheight; y += tileset.tileheight) {
      for (let x = 0; x < tileset.imagewidth; x += tileset.tilewidth) {
        tiles.push([x, y]);
      }
    }
    return tiles;
  }, []);

  const mapTiles = useMemo(() => {
    const tiles = [];
    for (let y = 0; y < map.config.height * map.config.tileheight; y += map.config.tileheight) {
      for (let x = 0; x < map.config.width * map.config.tilewidth; x += map.config.tilewidth) {
        tiles.push([x, y]);
      }
    }
    return tiles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const tileset = map.tilesets[0];
    const image = new Image();
    image.src = tileset.data;
    let tile = 0;
    let currentLayer = 0;
    const tileLayers = map.config.layers.filter(layer => layer.type === 'tilelayer');
    const render = () => {
      if (currentLayer !== tileLayers.length) {
        const mapTile = mapTiles[tile];
        const imageTile = tileLayers[currentLayer].data[tile] - 1;
        if (imageTile !== -1) {
          ctx.drawImage(image, imageTiles[imageTile][0], imageTiles[imageTile][1], 16, 16, mapTile[0], mapTile[1], 16, 16);
        }
        tile++;
        if (tile === mapTiles.length) {
          currentLayer++;
          tile = 0;
        }
      } else {
        for (let i = 0; i < game.players.length; i++) {
          const player = game.players[i];
          const characterImg = new Image();
          characterImg.src = player.character.img;
          const tile = game.history[i].actions[0].to;
          ctx.drawImage(characterImg, 0, 0, 16, 16, tile.x, tile.y, tile.width, tile.height);
        }
      }
      animationFrameId = window.requestAnimationFrame(render);
    }
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, []);

  return (
    <canvas ref={canvasRef} {...rest} />
  );
}
