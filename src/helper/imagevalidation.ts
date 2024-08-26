import { PROJECT_CONSTANTS } from './GlobalHelper';

export function validationValidteImage(value: string | object): boolean {
  if (typeof value === 'string') return value === '' ? false : true;
  else {
    if (value instanceof File && PROJECT_CONSTANTS.imageTypes.image.includes(value.type.split('/')[1])) {
      return true;
    } else return false;
  }
}
export function validateSizeImage(value: string | object): boolean {
  if (typeof value === 'string') return value === '' ? false : true;
  else {
    if (value instanceof File && value.size <= PROJECT_CONSTANTS.maxSizeInBytes) {
      return true;
    } else return false;
  }
}
export function validateImageDimensions(value: Blob | MediaSource): boolean {
  if (typeof value === 'string') return value === '' ? false : true;
  else {
    const img = new Image();
    img.src = window.URL.createObjectURL(value);
    img.onload = () => {
      const { height } = img;
      const { width } = img;
      if (height === PROJECT_CONSTANTS.maxWidthHeightBytes.height && width === PROJECT_CONSTANTS.maxWidthHeightBytes.width) {
        return true;
      } else {
        return false;
      }
    };
    return false;
  }
}
