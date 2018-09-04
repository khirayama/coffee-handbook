// tslint:disable:no-any
import axios from 'axios';

export interface IStoreResponse {
  html: string;
  lat: number;
  lng: number;
}

export const storeService: {
  find(key: string): Promise<IStoreResponse>;
} = {
  find: (key: string): Promise<IStoreResponse> => {
    return new Promise(
      (resolve: any): void => {
        axios.get(`/api/v1/html/stores/${key}`).then((res: { data: IStoreResponse }) => {
          resolve(res.data);
        });
      },
    );
  },
};
