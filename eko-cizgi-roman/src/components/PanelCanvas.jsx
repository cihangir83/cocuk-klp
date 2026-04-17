import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group, Transformer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

// Custom shape for speech balloon
const SpeechBalloon = ({ element, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Group
        ref={shapeRef}
        x={element.x}
        y={element.y}
        width={element.width || 120}
        height={element.height || 60}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...element,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...element,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation()
          });
        }}
      >
        <Rect
          width={element.width || 120}
          height={element.height || 60}
          fill={element.balloonColor || '#ffffff'}
          stroke="#000000"
          strokeWidth={3}
          cornerRadius={15}
          shadowColor="#000"
          shadowBlur={0}
          shadowOffsetX={4}
          shadowOffsetY={4}
          shadowOpacity={1}
        />
        {/* Simple text rendering */}
        <Text
          text={element.text || 'Metin girin'}
          width={element.width || 120}
          height={element.height || 60}
          align="center"
          verticalAlign="middle"
          fontSize={element.fontSize || 16}
          fontFamily="Comic Neue"
          padding={10}
          fill={element.textColor || '#000'}
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 30 || newBox.height < 20) return oldBox;
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const ImageElement = ({ element, isSelected, onSelect, onChange }) => {
  const [img] = useImage(element.url, 'anonymous');
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <KonvaImage
        image={img}
        ref={shapeRef}
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...element,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...element,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation()
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 10 || newBox.height < 10) return oldBox;
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const BackgroundLayer = ({ bgId, scenario, stageWidth, stageHeight }) => {
  const bgObj = scenario?.backgrounds.find(b => b.id === bgId);
  const [bgImage] = useImage(bgObj?.url || '', 'anonymous');

  if (!bgId) {
    return <Text text="+" align="center" verticalAlign="middle" width={stageWidth} height={stageHeight} fontSize={60} fill="#ddd" opacity={0.5} />;
  }

  if (bgImage) {
    // cover fit logic
    const scale = Math.max(stageWidth / bgImage.width, stageHeight / bgImage.height);
    const x = (stageWidth / 2) - (bgImage.width / 2) * scale;
    const y = (stageHeight / 2) - (bgImage.height / 2) * scale;

    return <KonvaImage image={bgImage} x={x} y={y} width={bgImage.width * scale} height={bgImage.height * scale} />;
  }

  return <Rect width={stageWidth} height={stageHeight} fill="#ccc" />;
};

export const PanelCanvas = ({ panel, scenario, isSelected, onClick, onSelectElement, selectedElementId, updateElement, stageWidth, stageHeight }) => {
  const checkDeselect = (e) => {
    // deselect when clicked on empty area inside the panel
    const clickedOnEmpty = e.target === e.target.getStage() || e.target.attrs.image !== undefined && !e.target.attrs.draggable; // background isn't draggable
    if (clickedOnEmpty) {
      onSelectElement(null);
    }
    onClick(); // Select this panel
  };

  return (
    <div className={`relative bg-white comic-border-handdrawn overflow-hidden ${isSelected ? 'ring-4 ring-blue-500' : ''}`}
         style={{ width: stageWidth, height: stageHeight }}>
      <Stage
        width={stageWidth}
        height={stageHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {/* Background */}
          <BackgroundLayer bgId={panel.background} scenario={scenario} stageWidth={stageWidth} stageHeight={stageHeight} />

          {/* Render Elements */}
          {panel.elements.map((el) => {
            const isElSelected = el.id === selectedElementId;
            if (el.type === 'balloon') {
              return (
                <SpeechBalloon 
                  key={el.id} 
                  element={el} 
                  isSelected={isElSelected}
                  onSelect={() => onSelectElement(el.id)}
                  onChange={(newAttrs) => updateElement(el.id, newAttrs)}
                />
              );
            } else if (el.type === 'character' || el.type === 'symbol') {
              return (
                 <ImageElement 
                    key={el.id} 
                    element={el} 
                    isSelected={isElSelected} 
                    onSelect={() => onSelectElement(el.id)} 
                    onChange={(newAttrs) => updateElement(el.id, newAttrs)} 
                 />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};
