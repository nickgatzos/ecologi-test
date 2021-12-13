export const parseTreesResults = (results: []) => {
  const treeDates: Array<number> = Array.from(new Set(results.map(treeArray => treeArray[1]))).sort();

  let finalTreeDates: Array<{ x: Date, y: number; }> = [];

  const treeDatesAdjustedForSameDay = Array.from(new Set(treeDates.map(treeDate => parseSameDayAdjustment(treeDate))));

  console.log(treeDatesAdjustedForSameDay);

  for (let treeDate of treeDatesAdjustedForSameDay) {
    const treesCountForDate = results.filter(result => parseSameDayAdjustment(result[1]) === treeDate).map(tree => parseInt(tree[0])).reduce((a, b) => a + b);

    finalTreeDates.push({
      x: new Date(treeDate),
      y: treesCountForDate
    });
  }

  return finalTreeDates;
};

// Multiple plantings may be reported on the same day
// For sake of providing clean data in the chart, I perform same-day parsing adjustment
export const parseSameDayAdjustment = (date: number) => {
  let day = new Date(parseUnixEpoch(date));
  day.setHours(0);
  day.setMinutes(0);
  day.setSeconds(0);
  day.setMilliseconds(0);
  return day.toISOString();
}

export const parseUnixEpoch = (time: number) => new Date(time * 1000);
