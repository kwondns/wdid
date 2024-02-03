type FullContainerProps = {
  children: React.ReactNode;
};
export default function FullContainer(props: FullContainerProps) {
  const { children } = props;
  return <div className="flex w-screen min-w-full flex-1">{children}</div>;
}
