const API_KEY = '9f5647ff-ef27-4438-ab1f-87b68864f686';

const input = document.getElementById('input');
const search_btn = document.getElementById('search-button');
const search_result = document.querySelector('.result');
const sound = document.getElementById("sound");


search_btn.addEventListener("click", e => {
    e.preventDefault();    

    const word = input.value;
    if (word === ""){
        alert('Please type a word');
        return;
    }

    getData(word);

})

async function getData(word) {
    
    try {
        const result = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${API_KEY}`);
        const data = await result.json();
        const phonetics = data[0].hwi.prs[0].ipa;
        const meaning = data[0].shortdef[0];

        const soundName = data[0].hwi.prs[0].sound.audio;
        const firstLetter = soundName.charAt(0);
        const soundSrc = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${firstLetter}/${soundName}.mp3`;
        
        search_result.innerHTML = `
            <div class="word">
                <h3>${word}</h3>
                <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <p class="phonetics">${phonetics}</p>            
            <p class="word-meaning">${meaning}</p>
        `;       
        
        sound.src = soundSrc;
    } catch (error) {
        search_result.innerHTML = `
            <h3 class="error">No result found</h3>
        `        
    }
}

function playSound() {   
    sound.play();
}
