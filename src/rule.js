'use strict';

var _ = require('underscore');
var when = require('when');

/** A SEO Rule module.
 * @module Rule
 */
module.exports = {

  /**
   * detect exist tag
   * @param {string} root - root tag name
   * @param {string} tag - tag name
   * @param {string} msg - defect message
   */
  detectExistTag: function(root, tag, msg=`This HTML without ${root} ${tag} tag`){
    // validate function
    return function(dom){
      if (dom(`${root} ${tag}`).length>0) 
        return {};
      return {'defect':msg};
    };
  },

  /**
   * detect exist tag with attribute
   * @param {string} root - root tag name
   * @param {string} tag - tag name
   * @param {string} attr - attribute name
   * @param {string} msg - defect message
   */
  detectExistTagWithAttribute: function(root, tag, attr, msg=`This HTML without ${root} ${tag} tag include attribute ${attr}`){
    // validate function
    return function(dom){
      if (dom(`${root} ${tag}[${attr}]`).length>0) 
        return {};
      return {'defect':msg};
    };
  },

  /**
   * detect exist tag with attribute and specific value
   * @param {string} root - root tag name
   * @param {string} tag - tag name
   * @param {string} attr - attribute name
   * @param {string} value - value
   * @param {string} msg - defect message
   */
  detectExistTagWithAttributeValue: function(root, tag, attr, value, msg=`This HTML without ${root} ${tag} tag include attribute value ${attr}=${value}`){
    // validate function
    return function(dom){
      if (dom(`${root} ${tag}[${attr}*=${value}]`).length>0)
        return {};
      return {'defect':msg};
    };
  },

  /**
   * detect whether the count of tag exceeds the limit
   * @param {string} root - root tag name
   * @param {string} tag - tag name
   * @param {number} limit - number of limit
   * @param {string} msg - defect message
   */
  detectLimitOfTagCount: function(root, tag, limit, msg=`This HTML has more than ${limit} ${root} ${tag} tag`){
    // validate function
    return function(dom){
      if (dom(`${root} ${tag}`).length <= limit)
        return {};
      return {'defect':msg};
    };
  },

  /**
   * detect the count of the exist of tag with attribute 
   * @param {string} root - root tag name
   * @param {string} tag - tag name
   * @param {string} attr - attribute name
   * @param {string} msg - defect message
   */
  detectCountWithoutTagWithAttribute: function(root, tag, attr, msg=null){
    // validate function
    return function(dom){
      var count = dom(`${root} ${tag}:not([${attr}])`).length;
      if (_.isNull(msg))
        msg = `There are ${count} ${root} ${tag} without ${attr} attribute`;
      if (count==0)
        return {};
      return {'defect':msg};
    };
  }
};
