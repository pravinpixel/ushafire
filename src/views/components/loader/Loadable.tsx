/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, Suspense } from 'react';
import { JSX } from 'react/jsx-runtime';

import { ComponentProps } from 'helper/types/GlobalTypes';

import PageLoader from './PageLoader';

// eslint-disable-next-line react/display-name
const Loadable = (Component: React.LazyExoticComponent<FC<any>>) => (props: JSX.IntrinsicAttributes | ComponentProps | any) => (
  <Suspense fallback={<PageLoader />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
