import { useRecoilValue } from 'recoil';
import { useEffect, useRef, useState } from 'react';

import { LayoutStore } from '@/stores';

type CarouselContainerProps = {
  children: React.ReactNode;
};
export default function CarouselContainer(props: CarouselContainerProps) {
  const { children } = props;
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className={`flex h-full w-screen ${transition} transition ${loading ? 'hidden' : 'visible'}`} ref={divRef}>
      {children}
    </div>
  );
}
