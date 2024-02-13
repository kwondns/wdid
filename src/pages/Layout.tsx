import { useSetRecoilState } from 'recoil';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { LayoutTemplate } from '@/templates';
import { LayoutStore } from '@/stores';
import { LayoutTransition } from '@/constants';
import { usePresent } from '@/hooks';

export default function Layout() {
  const location = useLocation().pathname.slice(1) as 'past' | 'present' | 'future';
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
