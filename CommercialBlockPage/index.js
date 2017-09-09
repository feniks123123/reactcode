import React from 'react';
import Page from './Page';

const url = [
  '/:url/commercial',
  '/rostovskaya-oblast/:url/commercial',
  '/novorossiisk/:url/commercial',
  '/yaroslavl/:url/commercial',
  '/perm/:url/commercial',
  '/kaluga/:url/commercial',
  '/obninsk/:url/commercial',
  '/spb/:url/commercial',
  '/:url/:guid/commercial',
  '/rostovskaya-oblast/:url/:guid/commercial',
  '/novorossiisk/:url/:guid/commercial',
  '/yaroslavl/:url/:guid/commercial',
  '/perm/:url/:guid/commercial',
  '/kaluga/:url/:guid/commercial',
  '/obninsk/:url/:guid/commercial',
  '/spb/:url/:guid/commercial'
];

const routes = url.map(path => ({
  path,
  exact    : true,
  component: Page
}));

export default routes;