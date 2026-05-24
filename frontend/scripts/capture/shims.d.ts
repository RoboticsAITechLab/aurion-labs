declare module 'pixelmatch' {
  const pixelmatch: any;
  export default pixelmatch;
}

declare module 'pngjs' {
  export class PNG {
    width: number;
    height: number;
    data: Buffer;
    constructor(options?: { width?: number; height?: number });
    pack(): NodeJS.ReadWriteStream;
  }
}