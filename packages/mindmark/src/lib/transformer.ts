import { loadJS, loadCSS } from 'markmap-common';
import { Transformer } from 'markmap-lib';
import * as markmap from 'markmap-view';

export const transformer = new Transformer();
// const { scripts, styles } = transformer.getAssets();
// styles && loadCSS(styles);
// scripts && loadJS(scripts, { getMarkmap: () => markmap });
