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
            const profileLink = document.createElement('a')
            const moreInfoButton = document.createElement('button')

            user.textContent = element.login
            avatar.src = element.avatar_url
            profileLink.href = element.html_url
            profileLink.textContent = 'User profile'
            moreInfoButton.textContent = `User's repositories`


            moreInfoButton.addEventListener('click', e => displayUserRepos(e, element))
            user.appendChild(avatar)
            user.appendChild(profileLink)
            user.appendChild(moreInfoButton)
            document.getElementById('user-list').appendChild(user)
        })
    }

    function displayUserRepos(e, element) {
        const divider = document.createElement('div')
        const repoList = document.createElement('ul')
        const username = element.login

        divider.append(repoList)
        e.target.parentNode.append(divider)

        fetch(`https://api.github.com/users/${username}/repos`, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                const repositoryName = element.full_name
                const displayRepo = document.createElement('li')

                displayRepo.textContent = repositoryName
                
                repoList.append(displayRepo)
            })
        })
    
}

})