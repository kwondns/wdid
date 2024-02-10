type FullContainerProps = {
  children: React.ReactNode;
  className: string;
};
export default function FullContainer(props: FullContainerProps) {
  const { children, className } = props;
  return <div className={`flex w-screen min-w-full flex-1 ${className}`}>{children}</div>;
}
