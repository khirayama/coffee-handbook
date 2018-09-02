export interface IOpenStatus {
  // 0 閉店, 1: まもなく開店, 2: 開店, 3: まもなく閉店
  status: 0 | 1 | 2 | 3;
  nextOpen: {
    day: number;
    time: string;
  } | null;
}

export function getOpenStatus(now: Date, hours: string[][][]): IOpenStatus {
  // 15分前の場合、まもなく開店
  // 範囲内の場合、開店
  // それ以外の場合、閉店かつ次の開く時間
  const todayOpenHours: string[][] = hours[now.getDay()];

  if (todayOpenHours.length) {
    for (const openHour of todayOpenHours) {
      const startTime: Date = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${openHour[0]}`);
      const endTime: Date = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${openHour[1]}`);
      if (startTime.getTime() <= now.getTime() && now.getTime() < endTime.getTime()) {
        if (endTime.getTime() <= now.getTime() + 1000 * 60 * 15) {
          // 'まもなく閉店';
          return {
            status: 3,
            nextOpen: null,
          };
        }

        // 開店
        return {
          status: 2,
          nextOpen: null,
        };
      }
    }
  }

  for (let i: number = 0; i < hours.length; i += 1) {
    const index: number = (i + now.getDay()) % hours.length;
    const openHours: string[][] = hours[index];
    for (const openHour of openHours) {
      const startTime: Date = new Date(
        `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + i} ${openHour[0]}`,
      );
      const endTime: Date = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + i} ${openHour[1]}`);
      if (now.getTime() < startTime.getTime()) {
        if (startTime.getTime() <= now.getTime() + 1000 * 60 * 15) {
          // まもなく開店
          return {
            status: 1,
            nextOpen: {
              day: index,
              time: openHour[0],
            },
          };
        }

        // 閉店 開店は ${index} ${openHour[0]}
        return {
          status: 0,
          nextOpen: {
            day: index,
            time: openHour[0],
          },
        };
      }
    }
  }
}
