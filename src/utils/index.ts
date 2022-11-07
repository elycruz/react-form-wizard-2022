export const isset = x => x !== null && x !== undefined,

  {log, error, warn} = console,

  peek = (...args: any[]): any => (log(...args), args.pop()),

  ucaseFirst = (xs: string) => xs[0].toUpperCase() + xs.slice(1)

;
