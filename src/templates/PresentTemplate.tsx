import MDEditor from '@uiw/react-md-editor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChangeEvent, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { DateLib, MarkdownLib } from '@/libs';
import { PresentStore } from '@/stores';
import { usePast, usePresent } from '@/hooks';
import { indexLoader } from '@/pages';

type FormInputType = {
  title: string;
  startTime: string;
  endTime: string;
};
export default function PresentTemplate() {
  const { Present: initialData } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof indexLoader>>>;
  const { data } = useQuery({ ...usePresent.usePresent(), initialData });

  const [content, setContent] = useRecoilState(PresentStore.MarkdownAtom);
  const [startTime, setStartTime] = useRecoilState(PresentStore.StartTimeAtom);
  const [endTime, setEndTime] = useRecoilState(PresentStore.EndTimeAtom);
  const [title, setTitle] = useRecoilState(PresentStore.TitleAtom);
  const startTimeString = useRecoilValue(PresentStore.StartTimeSelector);
  const endTimeString = useRecoilValue(PresentStore.EndTimeSelector);
  const diffTime = useRecoilValue(PresentStore.DiffTimeSelector);
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTitle(value);
  };

  useEffect(() => {
    if (data?.startTime) setStartTime(new Date(data.startTime));
    if (data?.endTime) setEndTime(new Date(data.endTime));
    if (data?.title) setTitle(data.title);
    if (data?.content) setContent(data.content);
  }, []);
  const { patchPresent, isPatching } = usePresent.usePresentPatch();
  const onClickTempSave = () => {
    patchPresent({ title, content });
  };

  const { register, handleSubmit } = useForm<FormInputType>({
    values: {
      title,
      endTime: endTimeString,
      startTime: startTimeString,
    },
  });

  const { createPast, isCreating } = usePast.usePastCreate();

  const onClickSave = (input: FormInputType) => {
    const { title, endTime, startTime } = input;
    createPast(
      { content, title, endTime, startTime },
      {
        onSuccess: () => {
          setContent('');
          setTitle('');
          setStartTime(null);
          setEndTime(null);
        },
      },
    );
  };
  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <form onSubmit={handleSubmit(onClickSave)}>
        <div className="mx-4 px-4 py-8">
          <input
            className="input input-bordered input-lg w-full text-3xl"
            id="title"
            type="text"
            placeholder="제목 입력"
            {...register('title', { required: true, onChange: onChangeTitle })}
          />
          <input type="hidden" {...register('startTime', { required: true })} />
          <input type="hidden" {...register('endTime', { required: true })} />
          <div className="flex justify-between gap-x-4 py-4">
            <span className="flex-1 rounded-lg bg-success/50 p-2 text-lg text-white">{`시작시간 ${startTime ? DateLib.DateTime(startTime) : ''}`}</span>
            <span className="flex-1 rounded-lg bg-error/50 p-2 text-lg text-white">{`종료시간 ${endTime ? DateLib.DateTime(endTime) : ''}`}</span>
            <span className="flex-1 rounded-lg bg-warning/50 p-2 text-lg text-white">{`경과시간 ${diffTime || ''}`}</span>
          </div>
        </div>
        <div className="mx-4 flex justify-end gap-x-12 px-4">
          <button
            type="button"
            className="btn btn-primary content-center p-4 text-2xl text-white"
            onClick={onClickTempSave}
            disabled={isPatching}
          >
            임시 저장
          </button>
          <button
            type="submit"
            className="btn btn-success content-center p-4 text-2xl text-white"
            disabled={isCreating}
          >
            저장
          </button>
        </div>
        <div className="max-h-[90vw] flex-1 p-4">
          <MDEditor
            value={content}
            onChange={(value) => {
              setContent(value as string);
            }}
            onPaste={async (event) => {
              await MarkdownLib.onImagePasted(event.clipboardData, setContent);
            }}
            onDrop={async (event) => {
              await MarkdownLib.onImagePasted(event.dataTransfer, setContent);
            }}
            textareaProps={{
              placeholder: '꾸준히 작성하자',
            }}
          />
        </div>
      </form>
    </div>
  );
}
