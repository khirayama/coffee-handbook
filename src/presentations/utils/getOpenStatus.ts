export interface IOpenStatus {
  // 0 閉店, 1: まもなく開店, 2: 開店, 3: まもなく閉店
  status: 0 | 1 | 2 | 3;
  openAt: {
    day: number;
    time: string;
  } | null;
  closeAt: {
    day: number;
    time: string;
  } | null;
}

function getDateTime24HoursAgo(datetime: string): string {
  const hour: number = Number(datetime.split(':')[0]);
  const min: number = Number(datetime.split(':')[1]);
  if (hour >= 24) {
    return `${hour - 24}:${min}`;
  } else {
    return `${hour}:${min}`;
  }
}

export function getOpenStatus(now: Date, hours: string[][][]): IOpenStatus {
  // 15分前の場合、まもなく開店
  // 範囲内の場合、開店
  // それ以外の場合、閉店かつ次の開く時間
  const todayOpenHours: string[][] = hours[now.getDay()];

  if (todayOpenHours.length) {
    for (const openHour of todayOpenHours) {
      const hour: number = Number(openHour[openHour.length - 1].split(':')[0]);

      const startTime: Date = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`);
      startTime.setHours(Number(openHour[0].split(':')[0]));
      startTime.setMinutes(Number(openHour[0].split(':')[1]));
      const endTime: Date = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`);
      endTime.setHours(Number(openHour[1].split(':')[0]));
      endTime.setMinutes(Number(openHour[1].split(':')[1]));

      if (hour >= 24) {
        const dateTime: string = getDateTime24HoursAgo(openHour[1]);
        const dateTimeArray: string[] = dateTime.split(':');
        endTime.setDate(endTime.getDate() + 1);
        endTime.setHours(Number(dateTimeArray[0]));
        endTime.setMinutes(Number(dateTimeArray[1]));
      }

      if (startTime.getTime() <= now.getTime() && now.getTime() < endTime.getTime()) {
        if (endTime.getTime() <= now.getTime() + 1000 * 60 * 15) {
          // 'まもなく閉店';
          return {
            status: 3,
            openAt: null,
            closeAt: {
              day: endTime.getDay(),
              time: openHour[1],
            },
          };
        }

        // 開店
        return {
          status: 2,
          openAt: null,
          closeAt: {
            day: hour >= 24 ? endTime.getDay() - 1 : endTime.getDay(),
            time: openHour[1],
          },
        };
      }
    }
  }

  for (let i: number = 0; i < hours.length; i += 1) {
    const index: number = (i + now.getDay()) % hours.length;
    const openHours: string[][] = hours[index];
    for (const openHour of openHours) {
      const hour: number = Number(openHour[openHour.length - 1].split(':')[0]);

      const startTime: Date = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`);
      startTime.setDate(startTime.getDate() + i);
      startTime.setHours(Number(openHour[0].split(':')[0]));
      startTime.setMinutes(Number(openHour[0].split(':')[1]));
      const endTime: Date = new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`);
      endTime.setDate(endTime.getDate() + i);
      endTime.setHours(Number(openHour[1].split(':')[0]));
      endTime.setMinutes(Number(openHour[1].split(':')[1]));

      if (hour >= 24) {
        const dateTime: string = getDateTime24HoursAgo(openHour[1]);
        const dateTimeArray: string[] = dateTime.split(':');
        endTime.setDate(endTime.getDate() + 1);
        endTime.setHours(Number(dateTimeArray[0]));
        endTime.setMinutes(Number(dateTimeArray[1]));
      }

      if (now.getTime() < startTime.getTime()) {
        if (startTime.getTime() <= now.getTime() + 1000 * 60 * 15) {
          // まもなく開店
          return {
            status: 1,
            openAt: {
              day: index,
              time: openHour[0],
            },
            closeAt: null,
          };
        }

        // 閉店 開店は ${index} ${openHour[0]}
        return {
          status: 0,
          openAt: {
            day: index,
            time: openHour[0],
          },
          closeAt: null,
        };
      }
    }
  }
}
