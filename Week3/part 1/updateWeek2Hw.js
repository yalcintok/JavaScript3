   'use strict';

{
  async function fetchJSON(url, cb) {
   const response =  await axios.get(url);
   try {
    if (response.status < 200 || response.status > 300) {
      return new Error(`Error: ${response.status}`);
    } else {
      return response.data
    }
   }
   catch {
    throw new Error(`Error: ${response.status}`);
   }
  } 

  let receivedRepos;
  let currentRepo;

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  
  function arrangeDate (dateString) {
    const date = new Date (dateString);
    return date.toLocaleString();
  }

  function addRepoInformation(head, statement, item, linkCondition) {
    const repoEl = createAndAppend('div', item, {class : 'repoitems'});
    createAndAppend('h3', repoEl, {text: head});
    const pEl = createAndAppend('p', repoEl);
    if (linkCondition) {
        createAndAppend('a', pEl, { href: linkCondition, text: statement});
    } else {
        pEl.textContent = statement;
    };
    return repoEl;
  };
  
  let contributorField = document.querySelector('.contributors-container');
  const repoField = document.querySelector('.repo-container')

  function addRepoContributors(contr, parent) {
    const ul = createAndAppend('ul', parent);
    const li = createAndAppend('li', ul)
    createAndAppend('img', li, { src: contr.avatar_url });
    const nameSpan = createAndAppend('span', li, { class: 'name-contr' });
    createAndAppend('a', nameSpan, { text: contr.login, href: contr.html_url, target: "_blank" });
    createAndAppend('span', li, { class: 'contributions', text: contr.contributions });
  }
  function sortToRepo (repo, parent) {
    createAndAppend('option', parent, { text: repo.name, value: repo.id });
  }
  function renderRepoDetails(repo, parent) {
    
    const ul = createAndAppend('ul', parent)
    const repoEls = createAndAppend('li', ul, { class: 'list-items' });
    addRepoInformation('Repository:', repo.name, repoEls, repo.html_url);
    addRepoInformation('Description:', repo.description, repoEls);
    addRepoInformation('Forks:', repo.forks, repoEls);
    addRepoInformation('Updated:', arrangeDate(repo.updated_at), repoEls);
  }

  function appendContributor() {
    fetchJSON(currentRepo.contributors_url)
      .then(data => {
        createAndAppend('h5', contributorField, {text: 'Contributions'});
        data.forEach(contr => addRepoContributors(contr, contributorField));
      })
      .catch(err => {
        console.log(err);
          return;
      })
  };

  function main(url) {
    fetchJSON(url) 
      .then(repos => {
        
        let head = document.querySelector('.head');
        head.innerHTML = 'HYF Repositories'
        const select = createAndAppend('select', head);
        receivedRepos = repos.sort((a, b) => a.name.localeCompare(b.name));
        receivedRepos.forEach(repo => renderRepoDetails(repo, repoField));
        select.addEventListener('change', function(event) {
          console.log(event.target.value);
          for (let i = 0; i < receivedRepos.length; i++) {
            if (event.target.value == receivedRepos[i].id) {
              currentRepo = receivedRepos[i];
              break;
            }
          }
          console.log(currentRepo);
          contributorField.innerHTML = '';
          appendContributor();
          repoField.innerHTML = '';
          renderRepoDetails(receivedRepos[select.selectedIndex], repoField);        
        });
        
        
        receivedRepos.forEach(repo => sortToRepo(repo, select));
        
  
        // Manually Trigger Change Event
        const ev = new Event('change');
        select.dispatchEvent(ev);
      })
      .catch(err => {
        const root = document.getElementById('root');
        if (err) {
          createAndAppend('div', root, {
            text: err.message,
            class: 'alert-error',
          });
          return;
        }
      })
}
  const HYF_REPOS_URL =
      'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    window.onload = () => main(HYF_REPOS_URL);
}
