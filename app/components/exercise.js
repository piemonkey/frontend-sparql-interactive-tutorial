import Component from '@glimmer/component';
import { action } from '@ember/object';
import fetch, { Headers } from 'fetch';
import { tracked } from '@glimmer/tracking';

export default class ExerciseComponent extends Component {
  @tracked
  correctQuery = false;

  sparqlEndpoint =
    (this.args.sparqlEndpoint ?? '/sparql') +
    (this.args.defaultGraph
      ? `?default-graph-uri=${encodeURIComponent(this.args.defaultGraph)}`
      : '');
  validQuery = this.args.validQuery;

  @action
  async onQueryEventHandler(_instance, tab) {
    this.correctQuery = false;
    if (this.validQuery === undefined) {
      return;
    }

    const query = tab.getQuery();
    const response = await fetch(
      `/query-equivalence/equivalent?validQuery=${encodeURIComponent(
        this.validQuery
      )}&otherQuery=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: new Headers({ Accept: 'application/vnd.api+json' }),
      }
    );
    const json = await response.json();
    if (json.data) {
      this.correctQuery = json.data.attributes.equivalent;
    }
  }
}
