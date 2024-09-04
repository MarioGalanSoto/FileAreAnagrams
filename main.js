const fs = require('fs');
const path = require('path');

function getCharFrequency(word){
	const frecuency = {};
	// for every word get the frecuency of the characters using hash maps
	for (const char of word){
		// if the character was not in here add it otherwise add 1 to it's count
		frecuency[char] = (frecuency[char] || 0) + 1;
	}
	return frequency;
}


function areAnagrams(word1,word2){

    // Check if the lengths of the word are different; If so, they cannot be anagrams
    if (word1.length !== word2.length) {
        return false;
    }
    
    //Convert words to arrays of characters, sort them, and join them back into strings
    const freq1 = getCharFrequency(word1.toLowerCase());
    const freq2 = getCharFrequency(word2.toLowerCase());

    //Compare the sorted string; If they are equal, the words are anagrams
    for (const char in freq1){
	if (freq1[char] !== freq2[char]){
		return false;
	}
    }
    return true;
}

function readWordsFile() {
  const filePath = path.join(__dirname, 'words.txt');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    const lines = data.split('\n');
    const anagramGroups = {};
    //Group words by their character frequency signature
    for (const word of lines){
	const sortedWord = word.toLowerCase().split('').sort().join('');
	// group and save all anagrams first, this way you dont have to check every word each time
	if (anagramGroups[sortedWord]){
		anagramGroups[sortedWord].push(word);
	}else{
		anagramGroups[sortedWord]=[word];
	}
    }

    // Print out the groups of anagrams
    for (const group in anagramGroups){
	if(anagramGroups[group].length > 1){
		console.log(`Anagrams: ${anagramGroups[group].join(', ')}`)
	}
    }
  });
}

readWordsFile();
