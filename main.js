const fs = require('fs');
const path = require('path');

function getCharFrequency(word) {
    const frequency = {};
    // For every word, get the frequency of the characters using a hash map
    for (const char of word) {
        // If the character was not in the map, add it; otherwise, increment its count
        frequency[char] = (frequency[char] || 0) + 1;
    }
    return frequency;
}

function areAnagrams(word1, word2) {
    // Check if the lengths of the words are different; If so, they cannot be anagrams
    if (word1.length !== word2.length) {
        return false;
    }
    
    // Get character frequency maps for both words
    const freq1 = getCharFrequency(word1.toLowerCase());
    const freq2 = getCharFrequency(word2.toLowerCase());

    // Compare the frequency maps; If they are equal, the words are anagrams
    for (const char in freq1) {
        if (freq1[char] !== freq2[char]) {
            return false;
        }
    }
    return true;
}

function readWordsFile() {
    console.time('Execution Time');  // Start timing
    const filePath = path.join(__dirname, 'words.txt');
  
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        
        const lines = data.split('\n');
        const anagramGroups = {};
        
        // Group words by their character frequency signature
        for (const word of lines) {
            const sortedWord = word.toLowerCase().split('').sort().join('');
            // Group and save all anagrams first, reducing the need to check every word each time
            if (anagramGroups[sortedWord]) {
                anagramGroups[sortedWord].push(word);
            } else {
                anagramGroups[sortedWord] = [word];
            }
        }

        // Print out the groups of anagrams
        for (const group in anagramGroups) {
            if (anagramGroups[group].length > 1) {
                console.log(`Anagrams: ${anagramGroups[group].join(', ')}`);
            }
        }
        
        console.log('\n\n');
        console.timeEnd('Execution Time');  // End timing and print the duration
        console.log('\n\n');
    });
}

readWordsFile();
