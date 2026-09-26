import kurk from '../content/kurk-mantolu-madonna-berlin.txt?raw';
import kutuk from '../content/kutuk.txt?raw';
import falaka from '../content/falaka.txt?raw';
import yeniBirHediye from '../content/yeni-bir-hediye.txt?raw';
import forsa from '../content/forsa.txt?raw';

export const TEXTS = [
  { id: 'kurk', title: 'Kürk Mantolu Madonna', subtitle: 'Berlin bölümünden', author: 'Sabahattin Ali', body: kurk },
  { id: 'kutuk', title: 'Kütük', author: 'Ömer Seyfettin', body: kutuk },
  { id: 'falaka', title: 'Falaka', author: 'Ömer Seyfettin', body: falaka },
  { id: 'yeni-bir-hediye', title: 'Yeni Bir Hediye', author: 'Ömer Seyfettin', body: yeniBirHediye },
  { id: 'forsa', title: 'Forsa', author: 'Ömer Seyfettin', body: forsa },
];

export const DEFAULT_TEXT_ID = 'kurk';
export const CUSTOM_TEXT_ID = 'custom';
