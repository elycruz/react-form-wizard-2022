const _notAlnumRegex = /[^a-z\d]/i;

export const isset = x => x !== null && x !== undefined,

  {log, error, warn} = console,

  peek = (...args: any[]): any => (log(...args), args.pop()),

  ucaseFirst = (xs: string) => xs[0].toUpperCase() + xs.slice(1),

  classCase = (xs: string) => xs.split(_notAlnumRegex)
    .reduce((agg, x) => agg + ucaseFirst(x), '')

;
