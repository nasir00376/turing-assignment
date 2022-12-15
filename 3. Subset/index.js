function enumerateUntil(setOfInteger, n, r, index, data, i) {
  // console.log("calling", {index, r})
  // Current combination is ready to
  // be printed, print it
  let currentRow = [];
  if (index == r) {
    for (let j = 0; j < r; j++) {
      currentRow.push(data[j]);
      if (j == r - 1) console.log(currentRow.join(","));
    }

    return;
  }

  // When no more elements are there
  // to put in data[]
  if (i >= n) return;

  // current is included, put next
  // at next location
  data[index] = setOfInteger[i];
  enumerateUntil(setOfInteger, n, r, index + 1, data, i + 1);

  // current is excluded, replace
  // it with next (Note that i+1
  // is passed, but index is not
  // changed)
  enumerateUntil(setOfInteger, n, r, index, data, i + 1);
}

function generateSubsets(setOfInteger, n, r) {
  // A temporary array to store all
  // combination one by one
  let data = new Array(r);
  data.fill(0);

  enumerateUntil(setOfInteger, n, r, 0, data, 0);
}

let setOfInteger = [10, 20, 30, 40, 50, 60];
let n = setOfInteger.length;
let r = Math.pow(2, n-(n-1));

generateSubsets(setOfInteger, n, r);
