import { OptionsType, DynamicFormComponentType } from 'helper/types/GlobalTypes';

import CustomPopupDrawer from 'views/components/popups/CustomPopupDrawer';

import { ModelLayout } from './ModelComponets';

type Props = {
  open: boolean;
  onClose: (res?: OptionsType) => void;
  modelName: DynamicFormComponentType['name'];
};

const CustomDrawerWithDynamic = ({ open, onClose, modelName }: Props) => {
  return (
    <CustomPopupDrawer open={open} onClose={() => onClose()}>
      {open && <ModelLayout modelName={modelName} onClose={(res) => onClose(res)} />}
    </CustomPopupDrawer>
  );
};

export default CustomDrawerWithDynamic;
