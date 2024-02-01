import { useRecoilValue } from 'recoil';
import { useEffect, useRef } from 'react';

import { LayoutStore } from '@/stores';

type CarouselContainerProps = {
  children: React.ReactNode;
};
export default function CarouselContainer(props: CarouselContainerProps) {
  const { children } = props;
  const divRef = useRef<HTMLDivElement | null>(null);
  const transition = useRecoilValue(LayoutStore.LayoutAtom);
  useEffect(() => {
    const preventTransitionWhileResize = () => {
      if (divRef.current) {
        divRef.current?.classList.remove('transition');
        const resizeTimer = setTimeout(() => {
          divRef.current?.classList.add('transition');
        }, 250);
        clearTimeout(resizeTimer);
      }
    };
    window.addEventListener('resize', preventTransitionWhileResize);
    return () => window.removeEventListener('resize', preventTransitionWhileResize);
  }, [divRef]);
  return (
    <div className={`flex h-full w-screen ${transition} transition`} ref={divRef}>
      {children}
    </div>
  );
}
