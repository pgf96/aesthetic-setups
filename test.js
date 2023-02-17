const fs = require('fs');

// Find all battlestations and return only the redditLink and imageURL fields
Battlestation.find({}, { redditLink: 1, imageURL: 1, redditUser: 1, _id: 0, }, (err, battlestations) => {
  if (err) throw err;


//   const battlestationList = battlestations.map(battlestation => {
//     return { ...battlestation.toObject(), users: 'n/a' };
//   });

  const formattedData = JSON.stringify(battlestations, null, 2);

  // Save the results to a JSON file
  fs.writeFile('battlestations.json', formattedData, err => {
    if (err) throw err;
    console.log('Results saved to battlestations.json');
  });
});
