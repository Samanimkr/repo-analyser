
const credentials = `client_id=${clientID}&client_secret=${clientSecret}`;

const $URLInput = $('input#repo_url');

const isURLValid = (URL) => {
    const regex = /https:\/\/github\.com\/(.+)\/(.+)/;
    return URL.match(regex);
}

$URLInput.on('input', async () => {
    const URL = $URLInput.val();
    const match = isURLValid(URL);
    
    if (match) {
        const user = match[1]; 
        const repoName = match[2];
        const repoPath = user + '/' + repoName;

        const userInfo = await callApi(`users/${user}`);
        renderUserDetails(userInfo);

        const repoInfo = await getRepoInfo(repoPath);
        console.log(repoInfo);
        // renderRepoDetails(repoInfo);
    }
});

const callApi = (path, isURL = false) => {
    const URL = isURL ? `${path}?${credentials}` : `https://api.github.com/${path}?${credentials}`;
    return (
        axios
        .get(URL)
        .then(({ data }) => data)
        .catch(err => console.log(err))
    );
};

const getRepoInfo = async (repoPath) => {
    const repoInfo = await callApi(`repos/${repoPath}`);

    const commitsURL = repoInfo.commits_url.substr(0, repoInfo.commits_url.length - 6);
    const commits = await callApi(commitsURL, true);

    const issuesURL = repoInfo.issues_url.substr(0, repoInfo.issues_url.length - 9);
    const issues = await callApi(issuesURL, true);

    return {
        repo: repoInfo,
        commits,
        issues,
    }
};

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
    $('.repo_cards').html(html);
}