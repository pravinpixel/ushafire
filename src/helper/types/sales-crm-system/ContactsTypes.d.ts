import { OptionsType } from '../GlobalTypes';
import { PaginationGetInterFace } from '../TableTypes';

type ContactsTypeForm = {
  _id?: string;
  customerName?: string;
  mobile?: string;
  alternativeMobileNumber?: string;
  contactType?: OptionsType | null;
  email?: string;
  company?: string;
  alternativeContact?: OptionsType | null;
  preferredContactMethod?: OptionsType | null;
  address?: string;
  designation?: string;
  website?: string;
  languagePreference?: OptionsType | null;
  customerPhoto?: string | object;
  gender?: OptionsType | null;
  comments?: string;
  password: string;
  status?: boolean;
};
interface ContactsResponse extends PaginationGetInterFace {
  list: ContactsTypeForm[];
}
