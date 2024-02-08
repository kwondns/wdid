import MDEditor from '@uiw/react-md-editor';

import { MarkdownLib } from '@/libs';

type MarkdownProps = {
  source: string;
};
export default function Markdown(props: MarkdownProps) {
  const { source } = props;
  return (
    <MDEditor.Markdown
      className="!bg-base-200 [&_img]:mx-auto [&_img]:!flex [&_img]:max-h-[500px] [&_ul]:list-disc"
      source={source}
      rehypeRewrite={(node, _, parent) => {
        if ('tagName' in node && node.tagName && parent && 'tagName' in parent && parent.tagName) {
          if (node.tagName === 'a' && /^h([1-6])/.test(parent.tagName)) {
            parent.children = parent.children.slice(1);
          }
        }
      }}
      rehypePlugins={[MarkdownLib.imgLazyLoading]}
    />
  );
}
