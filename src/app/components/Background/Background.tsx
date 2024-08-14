import React from 'react';
import Image from 'next/image';
import "./background.css";

interface BackgroundProps {
  className: string;
  imageUrl?: string;
  alt?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  width?: number;
  height?: number;
}

function Background(props: BackgroundProps) {
  return (
    <div className={props.className} style={props.style}>
      {props.children}
      {props.imageUrl && props.alt && (
        <Image src={props.imageUrl} alt={props.alt} width={props.width} height={props.height} />
      )}
    </div>
  );
};

export default Background;
