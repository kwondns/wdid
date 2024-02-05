import MDEditor from '@uiw/react-md-editor';

type MarkdownProps = {
  source: string;
};
export default function Markdown(props: MarkdownProps) {
  const { source } = props;
  return (
    <MDEditor.Markdown
      className="!bg-base-200 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ul]:list-disc"
      source={source}
    />
  );
}
