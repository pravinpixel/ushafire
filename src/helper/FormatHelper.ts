import dayjs from 'dayjs';
import numeral from 'numeral';

import { checkDate, PROJECT_CONSTANTS } from './GlobalHelper';

// ----------------------------------------------------------------------

export function floatValue(number: string, toFixed?: number) {
  const toFixedValue = +parseFloat(number).toFixed(toFixed);
  const value = parseFloat(number);
  const checkValued: (value: number) => number | string = (value) => {
    return isNaN(value) ? '' : value;
  };
  return toFixed !== undefined ? checkValued(toFixedValue) : checkValued(value);
}

export function fNumber(number: number) {
  return numeral(number).format();
}

export function fCurrency(number?: number) {
  const format = number || number === 0 ? numeral(number).format(`0,0.00`) : '';
  return result(format, '.00', PROJECT_CONSTANTS.DOLLER);
}

export function fPercent(number: number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number: number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number: number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}
export function fDate(date?: string | dayjs.Dayjs) {
  const format = checkDate(date) ? dayjs(date).format(PROJECT_CONSTANTS.TableDateFormat) : '';
  return format;
}

function result(format: string, key = '.00', prefix?: string) {
  const isInteger = format.includes(key);
  const value = isInteger ? format.replace(key, '') : format || '';

  return value ? prefix + value : value || '';
}
