type FullContainerProps = {
  children: React.ReactNode;
};
export default function FullContainer(props: FullContainerProps) {
  const { children } = props;
  return <div className="h-full w-screen min-w-full">{children}</div>;
}
