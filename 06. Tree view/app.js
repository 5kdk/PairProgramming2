import TreeView from './tree-view/index.js';

/**
 * mock data
 */
const tree = [
  /* do something! */
];

const treeView = new TreeView(document.getElementById('tree-navigation'), tree);

/**
 * select 이벤트: 펼치거나 닫을 수 없는 treeView node를 클릭하면 발생한다.
 */
treeView.on('select', e => {
  console.log('select event has occurred', e);
  document.querySelector('main').textContent = e.detail.name;
});

/**
 * expand 이벤트: 현재 닫혀있는 treeView node를 클릭하면 발생한다.
 */
treeView.on('expand', e => {
  console.log('expand event has occurred', e);
});

/**
 * collapse 이벤트: 현재 열려있는 treeView node를 클릭하면 발생한다.
 */
treeView.on('collapse', e => {
  console.log('collapse event has occurred', e);
});
