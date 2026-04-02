import { IViewPreferences, SetStateAction } from '../models/interfaces';

export type ViewPreferencesAction =
    | {
          type: 'Update';
          setting: keyof IViewPreferences;
          value: boolean | number | string | string[];
      }
    | SetStateAction<IViewPreferences>;
