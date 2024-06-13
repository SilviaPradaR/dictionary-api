async function getData(apikey) {
    try {
        const result = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/apple?key=${apikey}`);
        const data = await result.json();
        console.log(data);

        
    } catch (error) {
        console.log('Error: ', error);
    }
}

getData('9f5647ff-ef27-4438-ab1f-87b68864f686');