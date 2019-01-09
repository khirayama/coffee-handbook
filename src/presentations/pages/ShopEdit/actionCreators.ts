// tslint:disable:no-any export-name
import { actionTypes } from 'presentations/pages/ShopEdit/actionTypes';
import { IAction, IDispatch } from 'presentations/pages/ShopEdit/interfaces';

export function changeValue(dispatch: IDispatch, name: string, value: string): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const action: IAction = {
        actionType: actionTypes.CHANGE_VALUE,
        payload: {
          name,
          value,
        },
      };

      dispatch(action);
      resolve(action);
    },
  );
}
