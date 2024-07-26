import { forEach, isBlob } from 'ut2';
import checkFileType from './checkFileType';

// 内置文件类型和文件名后缀配置
const config = {
  image: 'image/*,.jpeg,.jpg,.gif,.bmp,.png,.webp',
  audio: 'audio/*,.mp3,.wav',
  video: 'video/*,.mp4,.webm,.ogg,.ogv,.ogm',
  pdf: 'application/pdf,.pdf',
  word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,.doc,.docx',
  excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.xls,.xlsx'
};

type FileType = keyof typeof config;

/**
 * 获取文件类型
 *
 * @static
 * @alias module:Other.getFileType
 * @since 5.1.0
 * @param {File} file 文件对象。
 * @returns {"image" | "audio" | "video" | "pdf" | "word" | "excel" | undefined} 如果是 `image` `audio` `video` `pdf` `word` `excel` 这些类型的文件，返回对应的类型值，否则返回 `undefined`。
 */
function getFileType(file: File) {
  let type: undefined | FileType;

  if (isBlob(file)) {
    forEach(config, (accept, fileType) => {
      if (checkFileType(file, accept)) {
        type = fileType;
        return false;
      }
    });
  }
  return type;
}

export default getFileType;
