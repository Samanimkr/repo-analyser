
const $URLInput = $('input#repo_url');

const isURLValid = (URL) => {
    const regex = /https:\/\/github\.com\/(.+)\/(.+)/;
    return URL.match(regex);
}

$URLInput.on('input', async() => {
    const URL = $URLInput.val();
    const match = isURLValid(URL);
    
    if (match) {
        const user = match[1]; 
        const repoName = match[2];
        const repoPath = user + '/' + repoName;

        const userInfo = await getUserDetails(user);
        renderUserDetails(userInfo);

        const repoInfo = await getRepoDetails(repoPath);
        renderRepoDetails(repoInfo);
    }
});

const getUserDetails = (user) => (
    axios
    .get(`https://api.github.com/users/${user}?client_id=${clientID}&client_secret=${clientSecret}`)
    .then(({ data }) => data)
    .catch(err => console.log(err))
);

const getRepoDetails = (repoPath) => (
    axios
    .get(`https://api.github.com/repos/${repoPath}?client_id=${clientID}&client_secret=${clientSecret}`)
    .then(({ data }) => data)
    .catch(err => console.log(err))
)

const renderUserDetails = userInfo => {
    $('.repo_data').fadeIn(500);
    const html = `
        <img src="${userInfo.avatar_url}" />
        <div class="user_details">
            <p>${userInfo.name}</p>
            <p><strong>Bio:</strong> ${userInfo.bio}</p>
            <p><strong>Followers:</strong> ${userInfo.followers}</p>
            <p><strong>Location:</strong> ${userInfo.location}</p>
        </div>
    `
    $('.user').html(html);
}

const renderRepoDetails = repoInfo => {
    // $('.repo_data').fadeIn(500);
        // const html = `
        //     <img src="${data.avatar_url}" />
        //     <div class="user_details">
        //         <p>${data.name}</p>
        //         <p><strong>Bio:</strong> ${data.bio}</p>
        //         <p><strong>Followers:</strong> ${data.followers}</p>
        //         <p><strong>Location:</strong> ${data.location}</p>
        //     </div>
        // `
        // $('.user').html(html);
}