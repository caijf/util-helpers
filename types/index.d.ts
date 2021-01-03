declare namespace utilHelpers {
  // ----- 数据验证 -----
  type ValidateValueType = string | any;
  type Validator = (value: ValidateValueType) => boolean;
  type EnableLooseValidator = (value: ValidateValueType, options?: { loose?: boolean; }) => boolean;
  type PasswordOption = { level?: number; ignoreCase?: boolean; special?: string; };
  interface ValidateResult {
    validated: boolean;
    level: number;
    containes: {
      number: boolean;
      lowerCaseLetter: boolean;
      upperCaseLetter: boolean;
      specialCharacter: boolean;
      unallowableCharacter: boolean;
    }
  }
  export const isMobile: Validator;
  export const isTelephone: Validator;
  export const isPostcode: Validator;
  export const isIdCard: Validator;
  export const isEmail: Validator;
  export const isQQ: Validator;
  export const isWX: Validator;
  export const isVehicle: Validator;
  export const isBankCard: EnableLooseValidator;
  export const isSocialCreditCode: EnableLooseValidator;
  export const isPassword: (value: ValidateValueType, options?: PasswordOption) => boolean;
  export const isPassport: Validator;
  export const isChinese: EnableLooseValidator;
  export const isIPv4: Validator;
  export const isIPv6: Validator;
  export const isUrl: Validator;
  export const isBusinessLicense: EnableLooseValidator;
  export const validatePassword: (value: ValidateValueType, options?: PasswordOption) => ValidateResult;
  export const isPromiseLike: (value: any) => boolean;

  // ----- 数据处理 -----
  type NumType = number | string;
  export const formatMoney: (num: NumType, options?: {
    precision?: string | number;
    symbol?: string;
    thousand?: string;
    decimal?: string;
  }) => string;
  export const formatBankCard: (str: string, options?: {
    char?: string;
    length?: number;
  }) => string;
  export const replaceChar: (str: string, options?: {
    start?: number;
    end?: number;
    char?: string;
    repeat?: number;
    exclude?: string;
  }) => string;
  export const numberToChinese: (num: number, options?: {
    big5?: boolean;
    unit?: boolean;
    decomal?: string;
    zero?: string;
    negative?: string;
    unitConfig?: {
      w?: string;
      y?: string;
    };
  }) => string;
  export const bytesToSize: (bytes: number) => string;

  // ----- 数学计算 -----
  type Math = (num1: number, num2: number, ...others: number[]) => number;
  export const plus: Math;
  export const minus: Math;
  export const times: Math;
  export const divide: Math;
  export const round: (num: number, precision?: number) => number;

  // ----- 调试相关 -----
  export const setDisableWarning: (bool: boolean) => void;
}

export as namespace utilHelpers;

export = utilHelpers;