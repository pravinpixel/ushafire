import { useMemo, useCallback } from 'react';
import { useLocation, useNavigate, generatePath, useSearchParams } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, Breakpoint } from '@mui/material/styles';

import useMyProfieStore from 'zustand-config/MyProfileZustand';

import { ModuleType } from './GlobalHelper';
import { InputsType } from './types/MasterType';
import { FrontEndName } from './types/GlobalTypes';

// ----------------------------------------------------------------------

export function useResponsive(query: 'up' | 'down' | 'between', start: Breakpoint, end?: Breakpoint | null) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end || 'md'));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

export function useWidth() {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: unknown, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

// -----------------------------------------------------------------------------
export function usePathname() {
  const { pathname } = useLocation();
  return useMemo(() => pathname, [pathname]);
}
// ------------------------------------------------------------------------
type QueryType = {
  [key: string]: string;
};

// ------------------------------------------------------------------------
export function useRouter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  // const [];
  const router = useMemo(
    () => ({
      getPath: () => location,
      getParams: (name: string) => searchParams.get(name),
      navigateById: ({ path, access, query }: { path: string; access?: boolean; query: QueryType }) => {
        // const url = new URL('',  location);
        const urlQuery = new URLSearchParams(query).toString();
        location.pathname = path;
        location.search = urlQuery;
        access && navigate(location);
      },
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string) => navigate(href),
      getPathById: ({ path, id }: { path?: string; id?: string }) => generatePath(path ?? '/', { id: id }),
      pushById: ({ path, id, access = true }: { path?: string; id?: string; access?: boolean }) =>
        access && navigate(generatePath(path ?? '/', { id: id })),
      replace: (href: string) => navigate(href, { replace: true }),
    }),
    [location, navigate, searchParams]
  );
  return router;
}

// ------------------------------------------------------------------------
export interface MasterInputsType {
  label?: string;
  options?: EssentialDataType;
  isLoading?: boolean;
  includeArray?: string[];
  defaultValues?: object;
  sx?: {
    md: number;
    xs: number;
    sm: number;
  };
}

// ------------------------------------------------------------------------

export const useMasterInputs = ({ label, options, isLoading, includeArray = [], sx, defaultValues = {} }: MasterInputsType) => {
  const allInputsArray = ['code', 'name', 'status'];

  const keysofObjects = Object.entries(defaultValues).map(([key]) => key);
  const allInputs = useMemo(() => {
    return [
      {
        name: 'code',
        label: label + ' Code',
        type: 'text',
        ...sx,
      },
      {
        name: 'name',
        label: label + ' Name',
        type: 'text',
        ...sx,
      },
      {
        name: 'address',
        label: label + ' Address',
        type: 'text',
        ...sx,
      },
      {
        name: 'date',
        label: label + ' Date',
        type: 'date',
        md: 6,
        sm: 8,
        xs: 12,
      },
      {
        name: 'quantity',
        label: 'Quantity',
        type: 'number',
        ...sx,
      },
      {
        name: 'product_id',
        label: 'Product Name',
        type: 'text',
        ...sx,
      },
      {
        name: 'symbol',
        label: label + ' Symbol',
        type: 'text',
        ...sx,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        ...sx,
      },
      {
        name: 'shelfId',
        label: 'Shelf Name',
        type: 'autocomplete',
        options: options?.Shelf || [],
        addName: 'Shelf',
        loading: isLoading,
        ...sx,
      },
      {
        name: 'categoryId',
        label: 'Category Name',
        type: 'autocomplete',
        options: options?.Category || [],
        addName: 'Category',
        loading: isLoading,
        ...sx,
      },
      {
        name: 'location_id',
        label: label + ' Location',
        type: 'autocomplete',
        options: options?.Location || [],
        addName: 'Location',
        loading: isLoading,
        ...sx,
      },
      {
        name: 'bay_id',
        label: 'Bay Name',
        type: 'autocomplete',
        options: options?.Bay || [],
        addName: 'Bay',
        loading: isLoading,
        ...sx,
      },
      {
        name: 'rack_id',
        label: 'Rack Name',
        type: 'autocomplete',
        options: options?.Rack || [],
        addName: 'Rack',
        loading: isLoading,
        ...sx,
      },
      {
        name: 'country_id',
        label: 'Country Name',
        type: 'autocomplete',
        options: options?.Country || [],
        addName: 'Country',
        loading: isLoading,
        ...sx,
      },
      {
        name: 'state_id',
        label: 'State Name',
        type: 'autocomplete',
        options: options?.State || [],
        addName: 'State',
        loading: isLoading,
        ...sx,
      },
      {
        name: 'vertical_id',
        label: 'Vertical Name',
        type: 'autocomplete',
        options: options?.BusinessVertical || [],
        addName: 'BusinessVertical',
        loading: isLoading,
        ...sx,
      },
      {
        name: 'status',
        label: 'Status',
        type: 'checkbox',
        xs: 12,
        sm: 12,
        md: 12,
      },
    ];
  }, [label, options, isLoading, sx]);
  const array = [...allInputsArray, ...includeArray];
  return allInputs.filter((a) => array.includes(a.name)).map((i) => ({ ...i, readOnly: keysofObjects.includes(i.name) })) as InputsType[];
};

// ------------------------------------------------------------------------

/** Get other module permission */
export const useModuleFinder = () => {
  const Module = useMyProfieStore()?.user?.role_id?.access_manage;
  const handleLoopFunction = useCallback((fendName: FrontEndName, module?: ModuleType[]): ModuleType | null => {
    if (module)
      for (const modules of module) {
        if (modules.fend_component === fendName) {
          return modules;
        }
        if (modules.child) {
          const found = handleLoopFunction(fendName, modules.child);
          if (found) return found;
        }
      }
    return null;
  }, []);
  const value = useMemo(
    () => ({
      /** Help to find the front end component details */ find: (fendName: FrontEndName) => handleLoopFunction(fendName, Module),
    }),
    [Module, handleLoopFunction]
  );
  return value;
};
