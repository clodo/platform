import PropTypes from "prop-types";

// Prop Types:
export const tagPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.number,
  url: PropTypes.string.isRequired,
  displayName: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEnabled: PropTypes.bool.isRequired,
  color: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.number).isRequired,
}).isRequired;

export const placeTagPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  note: PropTypes.string,
  tag: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

export const datasetsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    url: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    places: PropTypes.shape({
      length: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(tagPropType),
    submission_sets: PropTypes.object, // TODO
    display_name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
).isRequired;

// Selectors:
export const datasetsSelector = state => state.datasets;

export const datasetPlaceConfirmationModalSelector = (state, datsetUrl) =>
  state.datasets.find(({ url }) => url === datasetUrl);

export const datasetUrlSelector = (state, dataset) => {
  return state.datasets.find(
    // TODO: Use full dataset urls instead of slugs once datasets are sent from
    // the backend.
    dataset => dataset.slug === dataset.split("/").pop(),
  ).url;
};

// Actions:
const LOAD = "datasets/LOAD";

// Action creators:
export function loadDatasets(datasets) {
  const getTagDisplayName = (tag, tags) => {
    const nodes = [];

    let node = tag;
    while (node.parent) {
      nodes.push(node);
      const parentNode = tags.find(tag => tag.id === node.parent);
      node = parentNode;
    }
    nodes.push(node);

    // Traversing the tag tree produces an array in backward order, so
    // return the reversed array.
    return nodes.reverse().map(node => node.name);
  };

  const getBFSForTag = (tag, tags) => {
    const childTags = [];
    const queue = [tag];
    let currTag;
    while (queue.length > 0) {
      currTag = queue.shift();
      childTags.push(currTag);
      // Add all of the children to our list
      const newChildTags = currTag.children
        .map(id => tags.find(tag => tag.id === id))
        .sort((a, b) => a.name < b.name);
      newChildTags.forEach(childTag => queue.push(childTag));
    }
    return childTags;
  };

  datasets = datasets.map(dataset => {
    const tags = dataset.tags
      .map(({ is_enabled: isEnabled, ...rest }) => ({
        isEnabled,
        ...rest,
      }))
      .map(tag => ({
        ...tag,
        displayName: getTagDisplayName(tag, dataset.tags),
      }));

    // Re-order our tags so that they are grouped by BFS
    const rootTags = tags
      .filter(tag => !tag.parent)
      .sort((a, b) => a.name < b.name);
    const tagsGroupedByBFS = rootTags.reduce(
      (acc, rootTag) => acc.concat(getBFSForTag(rootTag, tags)),
      [],
    );

    return {
      ...dataset,
      tags: tagsGroupedByBFS,
    };
  });

  return { type: LOAD, payload: datasets };
}

export const getTagFromUrl = ({ state, dataset, tagUrl }) =>
  state.datasets
    .find(datasetModel => datasetModel.slug === dataset.split("/").pop())
    .tags.find(tag => tag.url === tagUrl);

export const getAllTagsForDataset = (state, dataset) =>
  state.datasets
    .find(datasetModel => datasetModel.slug === dataset.split("/").pop())
    .tags.filter(tag => tag.isEnabled);

export const getColorForTag = ({ state, dataset, tagUrl }) =>
  state.datasets
    .find(datasetModel => datasetModel.slug === dataset.split("/").pop())
    .tags.find(tag => tag.url === tagUrl).color;

// Reducers:
const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD:
      return action.payload;
    default:
      return state;
  }
};
