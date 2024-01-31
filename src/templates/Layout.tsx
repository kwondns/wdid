import { Header, CarouselContainer } from '@/components';

type LayoutProps = {
  children: React.ReactNode;
};
export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className="grid max-h-screen grid-rows-[auto_1fr] overflow-hidden">
      <Header />
      <main className="row-start-2 max-h-full">
        <CarouselContainer>{children}</CarouselContainer>
      </main>
    </div>
  );
}
