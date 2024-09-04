const fs = require('fs');
const path = require('path');

function areAnagrams(word1,word2){

    // Check if the lengths of the word are different; If so, they cannot be anagrams
    if (word1.length !== word2.length) {
        return false;
    }

    //Convert the words to lowercase to make the comparison case-insentitive
    word1= word1.toLowerCase();
    word2= word2.toLowerCase();
    
    //Convert words to arrays of characters, sort them, and join them back into strings
    const sortedWord1= word1.split('').sort().join('');
    const sortedWord2= word2.split('').sort().join('');

    //Compare the sorted string; If they are equal, the words are anagrams
    return sortedWord1 === sortedWord2;
}

function readWordsFile() {
  let readWords = []
  const filePath = path.join(__dirname, 'words.txt');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    const lines = data.split('\n');
    for(let i=0;i<lines.length; i++){
	//check if and this are anagrams
	for(let a=i+1; a<(lines.length-1); a++){
		if(areAnagrams(lines[i], lines[a])){
			console.log(`${lines[i]} and ${lines[a]} are anagrams`);
		}else{
			console.log(`---> ${lines[i]} is not a anagram of ${lines[a]}`);
		}
	}
	    //console.log(`Line ${i} : ${lines[i]}`);
    }
  });
}

readWordsFile();
