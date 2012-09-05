/**
 *  Copyright 2012 Tomaz Muraus
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

var fs = require('fs');
var util = require('util');
var path = require('path');

var async = require('async');
var marked = require('marked');
var et = require('elementtree');
var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;

var utils = require('./utils');

function convertFile(inputFilePath, outputFilePath, callback) {
  var content = fs.readFileSync(inputFilePath, 'utf8'), ast, i, item, root,
      elems, elem, exampleElem, tableElem, trElem, name, attrib, text,
      currentParrent, lastParrentForLevel = {}, currentTableParent = null;

  ast = marked.lexer(content);

  elems = [];

  for (i = 0; i < ast.length; i++) {
    item = ast[i];

    name = null;
    attrib = {};
    text = null;

    if (item.type === 'heading') {
      if (item.depth === 1) {
        name = 'chapter';
        attrib = {'xmlns': 'http://docbook.org/ns/docbook',
                  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                  'xmlns:xi': 'http://www.w3.org/2001/XInclude',
                  'xmlns:svg': 'http://www.w3.org/2000/svg',
                  'version': '5.0',
                  'xml:id': item.text};

        elem = element(name, attrib);
        elems.push(elem);

        currentParrent = elem;
        lastParrentForLevel[1] = elem;

        elem = subElement(elem, 'title');
        elem.text = item.text;
        elems.push(elem);
      }
      else if (item.depth === 2 || item.depth === 3) {
        elem = subElement(lastParrentForLevel[item.depth - 1], 'section',
                          {'xml:id': utils.normalizeString(item.text)});
        elems.push(elem);

        currentParrent = elem;
        lastParrentForLevel[item.depth] = elem;

        elem = subElement(elem, 'title');
        elem.text = item.text;
        elems.push(elem);
      }
    }
    else if (item.type === 'paragraph') {
      elem = subElement(currentParrent, 'para');
      elem.text = item.text;
      elems.push(elem);
    }
    else if (item.type === 'list_start' && item.ordered === false) {
      elem = subElement(currentParrent, 'itemizedlist');
      elems.push(elem);

      currentTableParent = elem;
    }
    else if (item.type === 'list_item_start') {
      elem = subElement(currentTableParent, 'listitem');
      elems.push(elem);

      currentParrent = elem;
    }
    else if (item.type === 'text') {
      elem = subElement(currentParrent, 'para');
      elem.text = item.text;
      elems.push(elem);
    }
    else if (item.type === 'table') {
      tableElem = subElement(currentParrent, 'informaltable', {'rules': 'all'});
      elems.push(tableElem);

      elem = subElement(tableElem, 'thead', {'xmlns': 'http://docbook.org/ns/docbook'});
      trElem = subElement(elem, 'tr');

      item.header.forEach(function(text) {
        elem = subElement(trElem, 'td');
        elem.text = text;
      });

      if (item.cells.length > 0) {
        elem = subElement(tableElem, 'tbody');

        item.cells.forEach(function(cell) {
          trElem = subElement(elem, 'tr');

          cell.forEach(function(text) {
            elem = subElement(trElem, 'td');
            elem.text = text;
          });
        });
      }
    }
    else if (item.type === 'code') {
      exampleElem = subElement(currentParrent, 'example');

      if (item.label) {
        elem = subElement(exampleElem, 'title');
        elem.text = item.label;
      }

      elem = subElement(exampleElem, 'programlisting', {'language': item.lang});

      if (item.file) {
        elem = subElement(exampleElem, 'xi:include', {'href': item.file, 'parse': 'text'});
        elem = subElement(elem, 'xi:fallback');
        elem.text = 'Missing example!';
      }
      else {
        elem.text = item.text;
      }
    }
    else if (item.type === 'html') {
      // TODO: raw html
    }
  }

  root = elems[0];

  if (!root) {
    throw new Error('Input markdown file is empty!');
  }

  etree = new ElementTree(root);
  xml = etree.write({'xml_declaration': true, 'indent': 4});
  fs.writeFileSync(outputFilePath, xml, 'utf8');
}

exports.convert = function(inputDirectory, outputDirectory, callback) {
  var files = fs.readdirSync(inputDirectory);

  files = files.filter(function(name) {
    return /\.md$/.test(name);
  });

  async.forEach(files, function(name, callback) {
    var inputFilePath = path.join(inputDirectory, name),
        outputFilePath = path.join(outputDirectory, name.replace('.md', '.xml'));

    convertFile(inputFilePath, outputFilePath, callback);
  }, callback);
}
