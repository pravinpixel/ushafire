import React, { useEffect } from 'react';

import { decrypt, ModuleType, tokenIsValid, SESSIONANDLOCAL } from 'helper/GlobalHelper';

import AuthRouter from 'routes/authRoute';

import ThemeProvider from 'configs/ThemeConfig';
import { getLocalStorage } from 'configs/StorageConfigs';

import useMyProfieStore from 'zustand-config/MyProfileZustand';

import { useAuthGetMe } from 'store/hooks/AuthHooks';

import ContentLoader from 'views/components/loader/ContentLoader';

import Router from './routes';

const ContionalCompound = React.memo(({ permission, loading }: { permission?: ModuleType[]; loading: boolean }) => {
  const token = getLocalStorage(SESSIONANDLOCAL.PROJECT_ACCESS_TOKEN);
  if (tokenIsValid() && permission) {
    return <Router permission={permission} />;
  } else if (loading) {
    return <ContentLoader loading={loading} />;
  } else if (!token) {
    return <AuthRouter />;
  } else {
    return <ContentLoader />;
  }
});

function App() {
  const { data, isPending } = useAuthGetMe();
  const { user, setUser, theme } = useMyProfieStore((state) => state);

  useEffect(() => {
    data && setUser(JSON.parse(decrypt(data)));
  }, [data, setUser]);

  return (
    <ThemeProvider customTheme={theme}>
      <ContionalCompound permission={user?.role_id?.access_manage} loading={isPending} />
    </ThemeProvider>
  );
}

export default App;
