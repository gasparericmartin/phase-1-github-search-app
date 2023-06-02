window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form')
    form.addEventListener('submit', e => {
        e.preventDefault()
        const searchTerm = e.target.childNodes[1].value
        
        fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
            Method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            } 
        })
        .then(response => response.json())
        .then(data => displayUsernames(data))

    })

    function displayUsernames(data) {
        data.items.forEach(element => {
            const user = document.createElement('li')
            const avatar = document.createElement('img')
            const profileLink = document.createElement('p')

            user.textContent = element.login
            avatar.src = element.avatar_url
            profileLink.textContent = element.url

            user.addEventListener('click', displayUserRepos)
            user.appendChild(avatar)
            user.appendChild(profileLink)
            document.getElementById('user-list').appendChild(user)
        })
    }

    function displayUserRepos(e) {
        const username = e.target.childNodes[0].textContent
        fetch(`https://api.github.com/users/${username}/repos`, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const repository = element.full_name
                const displayRepo = document.createElement('p')

                displayRepo.textContent = repository
                
                e.target.appendChild(displayRepo)
            })
        })
    }

})