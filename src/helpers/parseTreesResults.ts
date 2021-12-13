export const parseTreesResults = (results: []) => {
  const treeDates: Array<number> = Array.from(new Set(results.map(treeArray => treeArray[1]))).sort();

  console.log(treeDates);
  let finalTreeDates: Array<{ x: Date, y: number; }> = [];

  for (let treeDate of treeDates) {
    const treesCountForDate = results.filter(result => result[1] === treeDate).map(tree => parseInt(tree[0])).reduce((a, b) => a + b);
    finalTreeDates.push({
      x: parseUnixEpoch(treeDate),
      y: treesCountForDate
    });
  }

  return finalTreeDates;
};

export const parseUnixEpoch = (time: number) => new Date(time * 1000);
