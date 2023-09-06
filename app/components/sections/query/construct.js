import Component from '@glimmer/component';

export default class SectionsQueryConstructComponent extends Component {
  exampleQuery =
    'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n' +
    'PREFIX mo: <http://purl.org/ontology/mo/>\n' +
    '\n' +
    'CONSTRUCT {\n' +
    '  ?artist mo:collaborated_with ?otherArtist .\n' +
    '}\n' +
    'WHERE {\n' +
    '  ?record a mo:Record .\n' +
    '  ?record mo:track ?track .\n' +
    '  ?artist foaf:made ?track .\n' +
    '  ?otherArtist foaf:made ?track .\n' +
    '  FILTER (?artist != ?otherArtist) .\n' +
    '}\n' +
    'LIMIT 100';

  validQuery =
    'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n' +
    'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n' +
    'PREFIX mo: <http://purl.org/ontology/mo/>\n' +
    'CONSTRUCT {\n' +
    '  ?artist mo:collaborated_with ?otherArtist .\n' +
    '}\n' +
    'WHERE {\n' +
    '  ?artist foaf:made ?work .\n' +
    '  ?otherArtist foaf:made ?work . \n' +
    '}\n' +
    'LIMIT 100';

  defaultGraph = 'http://mu.semte.ch/graphs/music';
}
