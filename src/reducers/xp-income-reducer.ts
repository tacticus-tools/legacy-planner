import { SetStateAction } from '@/models/interfaces';

import { XpIncomeState } from '@/fsd/1-pages/input-xp-income';

import { defaultData } from '../models/constants';

export type XpIncomeAction =
    | SetStateAction<XpIncomeState>
    | {
          type: 'SaveXpIncomeState';
          value: XpIncomeState;
      };
