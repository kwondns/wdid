import { Header, CarouselContainer } from '@/components';

type LayoutProps = {
  children: React.ReactNode;
};
export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <Header />
      <main className="h-[calc(100vh-64px)]">
        <CarouselContainer>{children}</CarouselContainer>
      </main>
    </div>
  );
}
