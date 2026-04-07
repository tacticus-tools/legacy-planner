import { IPersonalData, IPersonalData2 } from '../models/interfaces';

export interface IUserDataResponse {
    id: number;
    lastModifiedDate: string;
    modifiedDateTicks: string;
    data: IPersonalData | IPersonalData2 | undefined;
}
