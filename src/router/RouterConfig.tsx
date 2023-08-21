import { Route, Routes } from 'react-router-dom';

import { TopLayout } from '@/components/layout/TopLayout';
import { InputViewPage } from '@/components/pages/InputViewPage';

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<TopLayout />}>
        <Route index element={<InputViewPage />} />
      </Route>
    </Routes>
  );
};
