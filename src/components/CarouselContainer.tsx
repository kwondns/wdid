import { useRecoilValue } from 'recoil';

import { LayoutStore } from '@/stores';

type CarouselContainerProps = {
  children: React.ReactNode;
};
export default function CarouselContainer(props: CarouselContainerProps) {
  const { children } = props;
  const transition = useRecoilValue(LayoutStore.LayoutAtom);
  return <div className={`flex h-full w-screen ${transition} transition`}>{children}</div>;
}
