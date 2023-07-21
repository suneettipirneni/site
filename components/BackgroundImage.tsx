import Image, { type ImageProps } from 'next/image';
import { PropsWithChildren } from 'react';

export function BackgroundImage({ className = "", children, ...props }: PropsWithChildren<ImageProps>) {
  return (
    <div className={`relative ${className}`}>
     {/* eslint-disable-next-line jsx-a11y/alt-text */}
     <Image {...props} className='absolute inset-0 overflow-clip -z-10' />
     {children}
    </div>
  );
}