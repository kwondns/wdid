import { useRecoilValue } from 'recoil';

import { Header, CarouselContainer } from '@/components';
import { LayoutStore } from '@/stores';

type LayoutProps = {
  children: React.ReactNode;
};
export default function Layout(props: LayoutProps) {
  const { children } = props;
  const isMobile = useRecoilValue(LayoutStore.MobileSelector);
  let mainHeight: string;
  if (isMobile === 'mobile') mainHeight = 'h-[calc(100vh-128px)]';
  else mainHeight = 'h-[calc(100vh-64px)]';
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <Header />
      <main className={mainHeight}>
        <CarouselContainer>{children}</CarouselContainer>
      </main>
    </div>
  );
}
