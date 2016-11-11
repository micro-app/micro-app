import {
    doc,
} from './variable.js';
import append from './append.js';
import createElement from './create-element.js';

export default doc.querySelector('script[micro-app]') || append(createElement('<script micro-app>'));
