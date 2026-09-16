import React from 'react';
import { ContentImage } from '../constants';

type ImagePanel = NonNullable<ContentImage['composition']>['panels'][number];

const panelTransform = ({ width, height, rotation = 0 }: ImagePanel) => {
  switch (rotation) {
    case 90:
      return `translate(${height} 0) rotate(90)`;
    case 180:
      return `translate(${width} ${height}) rotate(180)`;
    case 270:
      return `translate(0 ${width}) rotate(-90)`;
    default:
      return undefined;
  }
};

const ArticleImage: React.FC<{ image: ContentImage }> = ({ image }) => {
  if (image.composition) {
    const { width, height, panels, columns = panels.length } = image.composition;

    // Rearrange existing pixels through SVG viewports; do not redraw medical illustrations.
    return (
      <div
        role="img"
        aria-label={image.alt}
        className="grid items-center gap-2 bg-white p-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {panels.map((panel, index) => {
          const quarterTurn = panel.rotation === 90 || panel.rotation === 270;
          const panelWidth = quarterTurn ? panel.height : panel.width;
          const panelHeight = quarterTurn ? panel.width : panel.height;

          return (
            <svg
              key={index}
              aria-hidden="true"
              className="block w-full"
              viewBox={`0 0 ${panelWidth} ${panelHeight}`}
              style={{ aspectRatio: `${panelWidth} / ${panelHeight}` }}
            >
              <g transform={panelTransform(panel)}>
                <svg
                  width={panel.width}
                  height={panel.height}
                  viewBox={`${panel.x} ${panel.y} ${panel.width} ${panel.height}`}
                  overflow="hidden"
                >
                  <image href={image.src} width={width} height={height} />
                </svg>
              </g>
            </svg>
          );
        })}
      </div>
    );
  }

  const aspectClass =
    image.orientation === 'portrait'
      ? 'aspect-[4/5]'
      : image.orientation === 'square'
        ? 'aspect-square'
        : 'aspect-[4/3]';

  return (
    <div className={`overflow-hidden ${aspectClass}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full ${image.fit === 'cover' ? 'object-cover' : 'object-contain'}`}
        style={{ objectPosition: image.objectPosition }}
      />
    </div>
  );
};

export default ArticleImage;
