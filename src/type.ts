type SvgImageModule = typeof import('*.svg');

export type ImportModuleFunction = () => Promise<SvgImageModule>;

export type EmojiSlice = 'head' | 'eyes' | 'eyebrows' | 'mouth' | 'detail';
