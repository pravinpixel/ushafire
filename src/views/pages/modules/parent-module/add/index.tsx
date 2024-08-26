import { ChildModuleFormType } from 'helper/types/AdminSettingTypes';

import ModuleForm from '../../_utils/ModuleForm';

export default function ParentModuleAdd() {
  const defaultValues: ChildModuleFormType = {
    slug: '',
    name: '',
    show: true,
    access: false,
    path: '',
    all: false,
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
    addMore_deleted_ids: [],
    configuration: false,
  };

  return <ModuleForm defaultValues={defaultValues} title="Create New Parent Module" type="parent" />;
}
