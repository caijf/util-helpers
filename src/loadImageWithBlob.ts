import { isBlob } from 'ut2';
import ajax from './ajax';

const SuccessResponseStatus = [200, 304];

/**
 * 获取图片的 blob 对象
 *
 * @param {string | Blob} img 图片地址或 blob 对象
 * @returns {Blob} blob 对象
 */
function getBlob(img: string | Blob) {
  return new Promise<Blob>((resolve, reject) => {
    if (isBlob(img)) {
      resolve(img);
    } else {
      ajax(img, { responseType: 'blob' })
        .then((ev) => {
          // @ts-ignore
          // 进入 onload 表示 readyStatus 为 4 ，但是 status 不一定是 200 。
          const responseStatus = ev.target.status;
          if (SuccessResponseStatus.indexOf(responseStatus) !== -1) {
            // @ts-ignore
            resolve(ev.target.response as Blob);
          } else {
            reject(new Error(`[loadImageWithBlob] The image does not support get requests, responseStatus ${responseStatus}, '${img}'.`));
          }
        })
        .catch(reject);
    }
  });
}

let cacheImage: string | Blob;
let cacheResult: { image: HTMLImageElement; blob: Blob };

/**
 * @typedef {Object} ImageWithBlob HTML图片元素和 blob 对象
 * @property {HTMLImageElement} image HTML图片元素
 * @property {Blob} blob blob 对象
 */

/**
 * 加载图片，返回图片元素和 blob 对象。
 *
 * @method
 * @alias module:Other.loadImageWithBlob
 * @since 4.20.0
 * @param {string | Blob} img 图片地址或 blob 对象
 * @param {boolean} [useCache=true] 缓存最近一次成功结果，当图片地址或 blob 对象一致时，直接返回该缓存。避免连续请求同一个图片资源，重复加载问题。
 * @returns {Promise<ImageWithBlob>} HTML图片元素和 blob 对象
 * @example
 *
 * loadImage(file).then(({image, blob})=>{
 *    // do something
 * });
 *
 * loadImage('https://dummyimage.com/200x300').then(({image, blob})=>{
 *   // do something
 * });
 *
 * loadImage('data:image/png;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=').then(({image, blob})=>{
 *   // do something
 * });
 *
 */
function loadImageWithBlob(img: string | Blob, useCache = true) {
  return new Promise<{ image: HTMLImageElement; blob: Blob }>((resolve, reject) => {
    if (useCache && cacheImage === img && cacheResult) {
      resolve(cacheResult);
    } else {
      getBlob(img)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const image = new Image();
          image.onload = () => {
            URL.revokeObjectURL(url);
            const result = { blob, image };
            if (useCache) {
              cacheImage = img;
              cacheResult = result;
            }
            resolve(result);
          };
          image.onerror = (err) => {
            URL.revokeObjectURL(url);
            console.error(`[loadImageWithBlob] The image load failed, '${img}'.`);
            reject(err);
          };
          image.src = url;
        })
        .catch(reject);
    }
  });
}

export default loadImageWithBlob;
