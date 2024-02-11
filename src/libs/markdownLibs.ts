import { visit } from 'unist-util-visit';
import { Element } from 'hast';
import { Plugin } from 'unified';
import { toast } from 'react-toastify';
import { ClipboardEvent, DragEvent } from 'react';

import { Supabase } from '@/libs';

async function fileUpload(startTime: string, file: File) {
  const filePath = `${startTime}/${new Date().toISOString()}_${file.name.replace(/[^a-zA-Z0-9_.]/g, '')}`;
  toast('이미지 업로드 중...', { toastId: 'uploadImage' });
  try {
    const { data, error } = await Supabase.supabase.storage
      .from(import.meta.env.VITE_SUPABASE_BUCKET_URL)
      .upload(filePath, file);
    await Supabase.errorCheck(error);
    toast.update('uploadImage', { type: 'success', render: '업로드 완료!', autoClose: 1500 });
    return data?.path;
  } catch (error) {
    toast.update('uploadImage', { type: 'error', render: '업로드 실패!', autoClose: 3000 });
    return '';
  }
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
  event: ClipboardEvent<HTMLDivElement> | DragEvent<HTMLDivElement>,
  dataTransfer: DataTransfer,
  setMarkdown: (value: string) => void,
  startTime: string,
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      event.preventDefault();
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
