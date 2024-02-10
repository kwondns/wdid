import { useSetRecoilState } from 'recoil';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { LayoutTemplate } from '@/templates';
import { LayoutStore } from '@/stores';
import { LayoutTransition } from '@/constants';

export default function Layout() {
  const location = useLocation().pathname.slice(1) as 'past' | 'present' | 'future';
  const setLayout = useSetRecoilState(LayoutStore.LayoutAtom);
  useEffect(() => {
    setLayout(LayoutTransition[location]);
  }, [location]);

  return (
    <LayoutTemplate>
      <Outlet />
    </LayoutTemplate>
  );
}
