import { visit } from 'unist-util-visit';
import { Element } from 'hast';
import { Plugin } from 'unified';

import { Supabase } from '@/libs';

async function fileUpload(startTime: string, file: File) {
  const filePath = `${startTime}/${new Date().toISOString()}_${file.name}`;
  const { data, error } = await Supabase.supabase.storage
    .from(import.meta.env.VITE_SUPABASE_BUCKET_URL)
    .upload(filePath, file);
  Supabase.errorCheck(error);
  return data?.path;
}
const insertToTextArea = (intsertString: string) => {
  const textarea = document.querySelector('textarea');
  if (!textarea) {
    return null;
  }

  let sentence = textarea.value;
  const len = sentence.length;
  const pos = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const front = sentence.slice(0, pos);
  const back = sentence.slice(pos, len);

  sentence = front + intsertString + back;

  textarea.value = sentence;
  textarea.selectionEnd = end + intsertString.length;

  return sentence;
};

export const onImagePasted = async (
  dataTransfer: DataTransfer,
  setMarkdown: (value: string) => void,
  startTime: string,
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      files.push(file);
    }
  }
  await Promise.all(
    files.map(async (file) => {
      const url = await fileUpload(startTime, file);
      const insertedMarkdown = insertToTextArea(
        `![](${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${import.meta.env.VITE_SUPABASE_BUCKET_URL}/${url})`,
      );
      if (!insertedMarkdown) {
        return;
      }
      setMarkdown(insertedMarkdown);
    }),
  );
};

export const imgLazyLoading: Plugin = () => (tree) => {
  visit(tree, 'element', (node: Element) => {
    if (node.tagName === 'img' && node.properties) {
      node.properties.loading = 'lazy';
    }
  });
};
