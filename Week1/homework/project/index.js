'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

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

  let createHeader = createAndAppend("div", root, {id : 'header'});
  createAndAppend('img', createHeader, {src: 'hyf.png', id : 'image'});
  createAndAppend("h4", createHeader, {text : 'HYF Repositories'});
  
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

  function arrangeDate (dateString) {
    const date = new Date (dateString);
    return date.toLocaleString();
  }


  function renderRepoDetails(repo, ul) {
    const repoEls = createAndAppend('li', ul, { class: 'list-items' });
    addRepoInformation('Repository:', repo.name, repoEls, repo.html_url);
    addRepoInformation('Description:', repo.description, repoEls);
    addRepoInformation('Forks:', repo.forks, repoEls);
    addRepoInformation('Updated:', arrangeDate(repo.updated_at), repoEls);
  };

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = createAndAppend('ul', root);
      repos.sort((a, b) => a.name.localeCompare(b.name))
      repos.forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=10';
  window.onload = () => main(HYF_REPOS_URL);
}
