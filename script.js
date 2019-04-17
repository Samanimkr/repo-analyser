

const $URLInput = $('input#repo_url');

const isURLValid = (URL) => {
    const regex = /https:\/\/github\.com\/(.+)\/(.+)/;
    return URL.match(regex);
}

$URLInput.on('input', () => {
    const URL = $URLInput.val();
    const match = isURLValid(URL);
    
    if (match) {
        const user = match[1]; 
        const repoName = match[2];
        const repoPath = user + '/' + repoName;
        // axios.get(`https://api.github.com/repos/${repoPath}/issues?client_id=${clientID}&client_secret=${clientSecret}`)
        axios.get(`https://api.github.com/users/${user}?client_id=${clientID}&client_secret=${clientSecret}`)
        .then(({ data }) => {
            $('.repo_data').fadeIn(500);
            const html = `
                <img src="${data.avatar_url}" />
                <div class="user_details">
                    <p>${data.name}</p>
                    <p><strong>Bio:</strong> ${data.bio}</p>
                    <p><strong>Followers:</strong> ${data.followers}</p>
                    <p><strong>Location:</strong> ${data.location}</p>
                </div>
            `
            $('.user').html(html);
        })
        .catch(err => console.log(err));
    }
});
