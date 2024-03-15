import { useRecoilState, useSetRecoilState } from 'recoil';
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { LayoutTemplate } from '@/templates';
import { LayoutStore, PresentStore } from '@/stores';
import { presentLoader } from '@/pages';
import { LayoutTransition } from '@/constants';
import { usePresent } from '@/hooks';

export default function Layout() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof presentLoader>>>;
  const { data } = useQuery({ ...usePresent.usePresent(), initialData, gcTime: 0 });
  const location = useLocation().pathname.slice(1) as 'past' | 'present' | 'future';
  const setStartTime = useSetRecoilState(PresentStore.StartTimeAtom);
  const setEndTime = useSetRecoilState(PresentStore.EndTimeAtom);
  const [title, setTitle] = useRecoilState(PresentStore.TitleAtom);
  const [content, setContent] = useRecoilState(PresentStore.MarkdownAtom);

  useEffect(() => {
    if (data?.startTime) setStartTime(new Date(data.startTime));
    if (data?.endTime) setEndTime(new Date(data.endTime));
    if (!title && data?.title) setTitle(data.title);
    if (!content && data?.content) setContent(data.content);
  }, [data]);
  const setLayout = useSetRecoilState(LayoutStore.LayoutAtom);
  useEffect(() => {
    setLayout(LayoutTransition[location]);
  }, [location]);
  usePresent.useCreateChannel();
  return (
    <LayoutTemplate>
      <Outlet />
    </LayoutTemplate>
  );
}
