import { isNaN } from 'ut2';
import { digitLength, transformEffectiveNumber } from './utils/math.util';
import times from './times';

/**
 * 精确加法，支持多个数相加，加数默认为 0 。
 *
 * @alias module:Math.plus
 * @since 3.1.0
 * @param {...(number|string)} nums 相加的数
 * @returns {number} 总和
 * @example
 *
 * plus(0.1); // 0.1
 * plus(0.1, 0.2); // 0.3
 * plus(0.1, 0.2, 0.3); // 0.6
 * plus(0.1, 0.2, 0.3, 0.4); // 1
 *
 */
function plus(...nums: (string | number)[]): number {
  // eslint-disable-next-line prefer-const
  // let [num1, num2 = 0, ...rest] = nums;

  let num1 = nums[0];
  let num2 = nums[1] === void 0 ? 0 : nums[1];
  const rest = nums.slice(2);

  if (rest.length > 0) {
    // return plus(plus(num1, num2), ...rest);

    // eslint-disable-next-line prefer-spread
    return plus.apply(void 0, [plus(num1, num2)].concat(rest as number[]));
  }

  num1 = transformEffectiveNumber(num1);
  num2 = transformEffectiveNumber(num2);

  // 兼容处理，如果参数包含无效数值时，返回 NaN
  if (isNaN(num1) || isNaN(num2)) {
    return Number.NaN;
  }

  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

export default plus;
