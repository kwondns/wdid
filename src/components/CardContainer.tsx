type CardContainerProps = {
  children: React.ReactNode;
};
export default function CardContainer(props: CardContainerProps) {
  const { children } = props;
  return (
    <div className="flex max-h-[500px] min-h-[500px] max-w-fit flex-1 overflow-x-auto overflow-y-clip p-20">
      {children}
      <button type="button" className="btn btn-circle btn-lg my-auto bg-blue-400/50 transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="4.0"
          stroke="currentColor"
          className="size-16 stroke-primary"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  );
}
