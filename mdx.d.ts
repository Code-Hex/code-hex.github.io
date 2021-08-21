/// <reference types="@mdx-js/loader" />

// https://github.com/mdx-js/mdx/issues/1552
declare module '@mdx-js/mdx' {
  import { Pluggable } from 'unified';

  declare namespace mdx {
    interface Options {
      /**
       * Path on disk to processed file
       * @default undefined
       */
      filepath?: string;

      /**
       * Skip the addition of 'export default' statement when serializing
       * to JSX
       * @default false
       */
      skipExport?: boolean;

      /**
       * Wrap 'export default' statement with provided string when serializing
       * to JSX
       */
      wrapExport?: string;

      /**
       * Remark plugins to transform markdown content
       *
       * @default []
       */
      remarkPlugins?: Pluggable[];

      /**
       * Rehype plugins html content
       *
       * @default []
       */
      rehypePlugins?: Pluggable[];
    }
  }
  
  /**
   * Compile mdx text to jsx text asynchronously
   *
   * @param mdx content as a text
   * @param options transform and compiler options
   * @returns jsx text
   */
  declare function mdx(mdx: string, options?: mdx.Options): Promise<string>;

  export = mdx
}
