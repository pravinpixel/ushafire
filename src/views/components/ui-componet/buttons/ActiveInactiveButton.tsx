import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { ActiveInactiveSwitch } from 'theme/styled-compounet';

type Props = {
  row: {
    status?: boolean;
    _id?: string;
  };
  isPending: boolean;
  onChange: () => void;
  refetchUrl: string;
  edit_access?: boolean;
};

const ActiveInactiveButton = ({ row, isPending, onChange, refetchUrl, edit_access = false }: Props) => {
  const [status, setStatus] = useState<{ id: string | null; loading: boolean }>({ id: null, loading: false });
  const refetch = useQueryClient();
  const handleOnChange = useCallback(
    async (id?: string) => {
      try {
        setStatus({ id: id ?? '', loading: true });
        await onChange();
        await refetch.refetchQueries({
          queryKey: [refetchUrl],
        });
        setStatus({ id: null, loading: false });
      } catch {
        setStatus({ id: null, loading: false });
      }
    },
    [onChange, refetch, refetchUrl]
  );

  return (
    <ActiveInactiveSwitch
      key={row._id}
      disabled={!edit_access}
      checked={row?.status}
      loading={!!(status.id === row._id && status.loading) && isPending}
      onChange={() => handleOnChange(row?._id)}
    />
  );
};

export default ActiveInactiveButton;
