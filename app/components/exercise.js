import Component from '@glimmer/component';
import { action } from '@ember/object';
import fetch, { Headers } from 'fetch';
import { tracked } from '@glimmer/tracking';

export default class ExerciseComponent extends Component {
  @tracked
  resStatus = undefined;
  @tracked
  correctQuery = false;

  sparqlEndpoint =
    (this.args.sparqlEndpoint ?? '/sparql') +
    (this.args.defaultGraph
      ? `?default-graph-uri=${encodeURIComponent(this.args.defaultGraph)}`
      : '');
  validQuery = this.args.validQuery;

  get resStatusGood() {
    return (
      (this.resStatus >= 200 && this.resStatus < 300) || this.resStatus === 304
    );
  }
  get errorStatus() {
    return this.resStatus !== undefined && !this.resStatusGood;
  }
  get equivalentQuery() {
    return (
      this.resStatus !== undefined && this.resStatusGood && this.correctQuery
    );
  }
  get nonEquivalentQuery() {
    return (
      this.resStatus !== undefined && this.resStatusGood && !this.correctQuery
    );
  }

  @action
  elementInserted(element) {
    this.element = element;
  }

  @action
  async onQueryEventHandler(_instance, tab) {
    this.resStatus = undefined;
    this.correctQuery = false;
    if (this.validQuery === undefined) {
      return;
    }
    window.scrollTo({ top: this.element.offsetTop, behavior: 'smooth' });

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
    this.resStatus = response.status;
    if (response.ok) {
      const json = await response.json();
      if (json.data) {
        this.correctQuery = json.data.attributes.equivalent;
      }
    }
  }
}
