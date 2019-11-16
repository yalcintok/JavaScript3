'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      this.container.innerHTML = "";
      const repoEls = createAndAppend('p', this.container, { class: 'list-items' });
      this.addRepoInformation('Repository:', repo.name, repoEls, repo.html_url);
      this.addRepoInformation('Description:', repo.description, repoEls);
      this.addRepoInformation('Forks:', repo.forks, repoEls);
      this.addRepoInformation('Updated:', new Date(repo.updated_at).toLocaleDateString(), repoEls);
    }
    
    addRepoInformation(head, statement, item, linkCondition) {
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
  }

  window.RepoView = RepoView;
}
