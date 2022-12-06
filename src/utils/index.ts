const _notAlnumRegex = /[^a-z\d]/i;

export const isset = x => x !== null && x !== undefined,

  {log, error, warn} = console,

  peek = (...args: any[]): any => (log(...args), args.pop()),

  ucaseFirst = (xs: string) => xs[0].toUpperCase() + xs.slice(1),

  classCase = (xs: string) => xs.split(_notAlnumRegex)
    .reduce((agg, x) => agg + ucaseFirst(x), ''),

  /**
   * Gives you value at key/namespace-key within `obj`;  E.g.,
   * searchObj('all.your.base', {all: {your: {base: 99}}}) === 99 // `true`
   *
   * @note If key is unreachable (undefined) returns `undefined`.
   *  Useful in cases where we do not want to check each key along the way before getting/checking value;  E.g.,
   *
   * @example
   * ```
   * if (obj && obj.all && obj.all.your && obj.all.your.base) {
   *   // Thing we want to do
   * }
   *
   * // So with our function becomes
   * if (searchObj('all.your.base', obj)) {
   *   // Thing we want to do
   * }
   * ```
   */
  searchObj = <T>(nsString: string, obj: T): any => {
    if (!obj) {
      return obj;
    }
    if (nsString.indexOf('.') === -1) {
      return obj[nsString];
    }
    const parts = nsString.split('.'),
      limit = parts.length;
    let ind = 0,
      parent = obj;
    for (; ind < limit; ind += 1) {
      const node = parent[parts[ind]];
      if (!isset(node)) {
        return node;
      }
      parent = node;
    }
    return parent;
  }

;
