const USER = 'SuperJavy';

async function loadPortfolio() {
    const urls = [
        `https://api.github.com/users/${USER}`,
        `https://api.github.com/users/${USER}/repos?sort=updated&per_page=6&type=owner`,
        `https://api.github.com/users/${USER}/followers?per_page=12`
    ];

    try {
        const [resUser, resRepos, resFollows] = await Promise.all(urls.map(u => fetch(u)));
        
        const userData = await resUser.json();
        const reposData = await resRepos.json();
        const followersData = await resFollows.json();

        renderUser(userData);
        renderRepos(reposData);
        renderFollowers(followersData);
    } catch (err) {
        console.error("Fallo al conectar con GitHub", err);
    }
}

function renderUser(data) {
    document.getElementById('profile').innerHTML = `
        <img src="${data.avatar_url}" alt="Avatar">
        <h1>${data.name || data.login}</h1>
        <p>${data.bio || 'Software Developer'}</p>
        <p style="color: var(--accent-color); margin-top: 15px; font-size: 1.2rem;">
            <i class="fas fa-map-marker-alt"></i> ${data.location || 'Remoto'}
        </p>
    `;
}

function renderRepos(repos) {
    const container = document.getElementById('repos');
    container.innerHTML = repos.map(repo => `
        <div class="repo-card">
            <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: inherit;">
                <h3>${repo.name}</h3>
            </a>
            <p>${repo.description || 'Sin descripción disponible para este increíble proyecto.'}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 1rem; color: var(--accent-color); font-weight: bold;">${repo.language || 'Code'}</span>
                <a href="${repo.html_url}" target="_blank" style="color: white; font-size: 1.5rem;"><i class="fab fa-github"></i></a>
            </div>
        </div>
    `).join('');
}

function renderFollowers(followers) {
    const container = document.getElementById('followers');
    container.innerHTML = followers.map(f => `
        <a href="${f.html_url}" target="_blank">
            <img src="${f.avatar_url}" class="follower-img" title="${f.login}">
        </a>
    `).join('');
}

loadPortfolio();