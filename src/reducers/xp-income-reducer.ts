import { SetStateAction } from '@/models/interfaces';

import { XpIncomeState } from '@/fsd/1-pages/input-xp-income';

export type XpIncomeAction =
    | SetStateAction<XpIncomeState>
    | {
          type: 'SaveXpIncomeState';
          value: XpIncomeState;
      };
