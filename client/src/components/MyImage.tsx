import React from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  width: number;
}

function MyImage({ src, width }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        height: width,
      }}
    >
      <Image src={src} layout="fill" objectFit="contain"></Image>
    </div>
  );
}

export default MyImage;
