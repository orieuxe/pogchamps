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
        width: width,
        height: width,
      }}
    >
      <Image src={src} layout="fill" objectFit="contain" objectPosition="bottom"></Image>
    </div>
  );
}

export default MyImage;
