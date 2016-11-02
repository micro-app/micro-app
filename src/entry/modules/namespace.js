import append from './append.js';
import createElement from './create-element.js';

export default document.querySelector('script[micro-app]') || append(createElement('<script micro-app>'));
