function findGoodStudentGroups(n, marks) {
  // Calculate the average marks of all students
  const totalSum = marks.reduce((sum, mark) => sum + mark, 0);
  const totalAvg = totalSum / n;

  // Calculate the prefix sum of marks array
  const prefixSum = [0];
  for (let i = 0; i < n; i++) {
    prefixSum.push(prefixSum[i] + marks[i]);
  }

  // Find good student groups
  const goodGroups = [];
  for (let i = 1; i <= n; i++) {
    for (let j = i; j <= n; j++) {
      const groupSum = prefixSum[j] - prefixSum[i - 1];
      const groupAvg = groupSum / (j - i + 1);
      const remainingSum = totalSum - groupSum;
      const remainingCount = n - (j - i + 1);
      const remainingAvg = remainingSum / remainingCount;
      if (groupAvg > remainingAvg) {
        goodGroups.push([i, j]);
      }
    }
  }

  // Sort the list of good student groups based on the start roll number
  goodGroups.sort((a, b) => a[0] - b[0]);

  // Print the start and end roll numbers of each good student group
  console.log(goodGroups.length);
  for (let i = 0; i < goodGroups.length; i++) {
    console.log(goodGroups[i][0] + " " + goodGroups[i][1]);
  }
}

// Example usage:
const n = 3;
const marks = [5, 8, 9];
findGoodStudentGroups(n, marks);
