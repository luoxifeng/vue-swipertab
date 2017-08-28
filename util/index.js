
const is = {};
export const str  = is.str = str => typeof str === "string";
export const bool  = is.bool = bool => typeof bool === "boolean";
export const arr  = is.arr = arr => Array.isArray(arr);
export default is;