import { IOpenStatus } from 'presentations/utils/getOpenStatus';
import { Dictionary } from 'utils/Dictionary';

export function getNextStatusMessage(openStatus: IOpenStatus, dic: Dictionary): string {
  const now: Date = new Date();
  const currentDay: number = now.getDay();
  if (openStatus.openAt) {
    if (currentDay === openStatus.openAt.day) {
      return dic.t(`Pages.Maps.openAt`, openStatus.openAt.time);
    } else {
      return `${dic.t(`Pages.Maps.openAt`, openStatus.openAt.time)} ${dic.t(
        `Pages.Maps.day.${openStatus.openAt.day}`,
      )}`;
    }
  } else if (openStatus.closeAt) {
    return dic.t(`Pages.Maps.closeAt`, openStatus.closeAt.time);
  }
}
