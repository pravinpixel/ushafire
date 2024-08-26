import { UseMutateAsyncFunction } from '@tanstack/react-query';

import { Stack } from '@mui/material';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import StaticViewButton from './StaticViewButton';

type Props = {
  enabled?: { view?: boolean; edit?: boolean; deleted?: boolean };
  url?: string;
  viewUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteApi?: UseMutateAsyncFunction<any, any, string, unknown> | null;
  isPending?: boolean;
  label?: string;
  deleteId?: string;
  id: string;
  path?: string;
};

const ViewEditDeleteButton = ({
  enabled = { view: false, edit: false, deleted: false },
  url = '',
  path = '',
  deleteApi,
  isPending = false,
  label = '',
  deleteId = '',
  id = '',
}: Props) => {
  return (
    <Stack direction={'row'} gap={0.5}>
      {enabled.view && <StaticViewButton url={path} id={id} />}
      {enabled.edit && <EditButton url={path} id={id} />}
      {enabled.deleted && deleteApi && <DeleteButton id={deleteId} deleteApi={deleteApi} refetchUrl={url} label={label} isPending={isPending} />}
    </Stack>
  );
};

export default ViewEditDeleteButton;
