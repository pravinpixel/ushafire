import { ChildModuleFormType } from 'helper/types/AdminSettingTypes';

import ChildModuleForm from '../../_utils/ModuleForm';

export default function ChildModuleAdd() {
  const defaultValues: ChildModuleFormType = {
    slug: '',
    name: '',
    show: true,
    access: false,
    addMore_deleted_ids: [],
    path: '',
    view: {
      show: true,
      access: false,
      path: '',
    },
    edit: {
      show: true,
      access: false,
      path: '',
    },
    add: {
      show: true,
      access: false,
      path: '',
    },
    list: {
      show: true,
      access: false,
      path: '',
    },
    export: {
      show: true,
      access: false,
    },
    delete: {
      show: true,
      access: false,
    },
    import: {
      show: false,
      access: false,
    },
    configuration: false,
  };

  return <ChildModuleForm defaultValues={defaultValues} title="Create New Child Module" type="child" />;
}
