import { useRecoilState, useSetRecoilState } from 'recoil';
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useGetPresent, useSocketPresent } from '@/hooks/usePresent';
import { presentLoader } from '@/pages/Present';
import { EndTimeAtom, MarkdownAtom, StartTimeAtom, TitleAtom } from '@/stores/Present.store';
import { LayoutAtom } from '@/stores/Layout.store';
import LayoutTransition from '@/constants/LayoutTransition';
import LayoutTemplate from '@/templates/Layout.template';

export default function Layout() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof presentLoader>>>;
  const { data } = useQuery({ ...useGetPresent(), initialData, gcTime: 0 });
  const location = useLocation().pathname.slice(1) as 'past' | 'present' | 'future';
  const setStartTime = useSetRecoilState(StartTimeAtom);
  const setEndTime = useSetRecoilState(EndTimeAtom);
  const [title, setTitle] = useRecoilState(TitleAtom);
  const [content, setContent] = useRecoilState(MarkdownAtom);

  useEffect(() => {
    if (data?.startTime) setStartTime(new Date(data.startTime));
    if (data?.endTime) setEndTime(new Date(data.endTime));
    if (!title && data?.title) setTitle(data.title);
    if (!content && data?.content) setContent(data.content);
  }, [data]);
  const setLayout = useSetRecoilState(LayoutAtom);
  useEffect(() => {
    setLayout(LayoutTransition[location]);
  }, [location]);
  useSocketPresent();
  return (
    <LayoutTemplate>
      <Outlet />
    </LayoutTemplate>
  );
}
