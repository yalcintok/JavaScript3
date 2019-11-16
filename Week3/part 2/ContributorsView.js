'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      this.container.innerHTML = '';
      createAndAppend('h5', this.container, {text: 'Contributions'});
      contributors.forEach(contr => this.addRepoContributors(contr));
    }
    addRepoContributors(contr) {
      const div = createAndAppend('div', this.container);
      createAndAppend('img', div, { src: contr.avatar_url });
      const nameSpan = createAndAppend('span', div, { class: 'name-contr' });
      createAndAppend('a', nameSpan, { text: contr.login, href: contr.html_url, target: "_blank" });
      createAndAppend('span', div, { class: 'contributions', text: contr.contributions });
    }

  }

  window.ContributorsView = ContributorsView;
}
