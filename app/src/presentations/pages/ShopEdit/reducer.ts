import { actionTypes } from 'presentations/pages/ShopEdit/actionTypes';
import { IAction, IState } from 'presentations/pages/ShopEdit/interfaces';

export function reducer(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: {} = action.payload;

  return newState;
}
