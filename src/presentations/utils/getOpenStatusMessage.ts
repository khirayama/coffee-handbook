export function getOpenStatusMessage(now: Date, hours: string[][][]): string {
  // 30分前の場合、まもなく開店
  // 範囲内の場合、開店
  // それ以外の場合、閉店かつ次の開く時間
  const todayOpenHours: any = hours[now.getDay()];

  if (todayOpenHours.length) {
    for (const openHour of todayOpenHours) {
      const startTime: Date = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${openHour[0]}`);
      const endTime: Date = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${openHour[1]}`);
      // console.log('now', now);
      // console.log('startTime', startTime);
      // console.log('endTime', endTime);
      if (startTime.getTime() <= now.getTime() &&  now.getTime() < endTime.getTime()) {
        if (endTime.getTime() <= now.getTime() + 1000 * 60 * 30) {
          return 'まもなく閉店';
        }

        return '開店';
      }
    }
  }

  for (let i: number = 0; i < hours.length; i += 1) {
    const index: number = (i + now.getDay()) % hours.length;
    const openHours: string[][] = hours[index];
    for (const openHour of openHours) {
      const startTime: Date = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + i} ${openHour[0]}`);
      const endTime: Date = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + i} ${openHour[1]}`);
      if (now.getTime() < startTime.getTime()) {
        if (startTime.getTime() <= now.getTime() + 1000 * 60 * 30) {
          return 'まもなく開店';
        }

        return `閉店 開店は ${index} ${openHour[0]}`;
      }
    }
  }
}
