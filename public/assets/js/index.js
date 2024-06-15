// API key for accessing the dictionary API
const API_KEY = '9f5647ff-ef27-4438-ab1f-87b68864f686';

// DOM elements
const input = document.getElementById('input');
const search_btn = document.getElementById('search-button');
const search_result = document.querySelector('.result');
const sound = document.getElementById("sound");

// Event listener for the search button
search_btn.addEventListener("click", e => {
    e.preventDefault();    

    const word = input.value;
    if (word === ""){
        alert('Please type a word'); // Alert user if input field is empty
        return;
    }

    getData(word); // Call function to fetch data for the entered word

})

async function getData(word) {
    // Fetch data from dictionary API
    try {
        const result = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${API_KEY}`);
        const data = await result.json();
        
        // Extract necessary information from API response
        const phonetics = data[0].hwi.prs[0].ipa;
        const meaning = data[0].shortdef[0];
        
        // Construct URL for fetching pronunciation audio
        const soundName = data[0].hwi.prs[0].sound.audio;
        const firstLetter = soundName.charAt(0);
        const soundSrc = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${firstLetter}/${soundName}.mp3`;
        
        // Update search result container with word details
        search_result.innerHTML = `
            <div class="word">
                <h3>${word}</h3>
                <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <p class="phonetics">${phonetics}</p>            
            <p class="word-meaning">${meaning}</p>
        `;       
        
        // Set audio source for pronunciation
        sound.src = soundSrc;
    } catch (error) {
        // Display error message if no results found
        search_result.innerHTML = `
            <h3 class="error">No result found</h3>
        `        
    }
}

// Function to play pronunciation audio
function playSound() {   
    sound.play();
}
