import MDEditor from '@uiw/react-md-editor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChangeEvent, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { DateLib, MarkdownLib } from '@/libs';
import { PresentStore } from '@/stores';
import { usePast, usePresent } from '@/hooks';
import { presentLoader } from '@/pages';

type FormInputType = {
  title: string;
  startTime: string;
  endTime: string;
};
export default function PresentTemplate() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof presentLoader>>>;
  const { data } = useQuery({ ...usePresent.usePresent(), initialData, gcTime: 0 });
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
    if (!title && data?.title) setTitle(data.title);
    if (!content && data?.content) setContent(data.content);
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
    <div className="flex flex-1 flex-col bg-base-200">
      <form className="flex h-full flex-1 flex-col" onSubmit={handleSubmit(onClickSave)}>
        <div className="mx-4 p-4 md:py-8">
          <input
            className="input input-md input-bordered w-full text-xl md:input-lg md:text-2xl lg:text-3xl"
            id="title"
            type="text"
            placeholder="제목 입력"
            {...register('title', { required: true, onChange: onChangeTitle })}
          />
          <input type="hidden" {...register('startTime', { required: true })} />
          <input type="hidden" {...register('endTime', { required: true })} />
          <div className="flex flex-col justify-between gap-y-2 py-4 md:flex-row md:gap-x-4 md:gap-y-0">
            <span className="flex-1 rounded-lg bg-success/50 p-1 text-base text-white md:p-2 md:text-lg">{`시작시간 ${startTime ? DateLib.DateTime(startTime) : ''}`}</span>
            <span className="flex-1 rounded-lg bg-error/50 p-1 text-base text-white md:p-2 md:text-lg">{`종료시간 ${endTime ? DateLib.DateTime(endTime) : ''}`}</span>
            <span className="flex-1 rounded-lg bg-warning/50 p-1 text-base text-white md:p-2 md:text-lg">{`경과시간 ${diffTime || ''}`}</span>
          </div>
        </div>
        <div className="mx-4 flex justify-end gap-x-4 px-4 md:gap-x-12">
          <button
            type="button"
            className="btn btn-primary content-center p-2 text-white md:p-4 md:text-xl lg:text-2xl"
            onClick={onClickTempSave}
            disabled={isPatching}
          >
            임시 저장
          </button>
          <button
            type="submit"
            className="btn btn-success content-center p-2 text-white md:p-4 md:text-xl lg:text-2xl"
            disabled={isCreating}
          >
            저장
          </button>
        </div>
        <div className="flex max-h-full w-full flex-1 overflow-auto p-4">
          <MDEditor
            className="flex w-full flex-1"
            height="100%"
            value={content}
            onChange={(value) => {
              setContent(value as string);
            }}
            onPaste={async (event) => {
              await MarkdownLib.onImagePasted(event, event.clipboardData, setContent, startTimeString);
            }}
            onDrop={async (event) => {
              await MarkdownLib.onImagePasted(event, event.dataTransfer, setContent, startTimeString);
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
