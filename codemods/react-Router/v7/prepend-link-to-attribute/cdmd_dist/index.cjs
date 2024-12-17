/*! @license
The MIT License (MIT)

Copyright (c) 2024 manishjha-04

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
"use strict";Object.defineProperty(exports,"__esModule",{value:true});function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:true,get:all[name]})}_export(exports,{default:function(){return transform},parser:function(){return parser}});function transform(file,api,options){const j=api.jscodeshift;const root=j(file.source);let dirtyFlag=false;root.find(j.JSXElement,{openingElement:{name:{name:"Link"}}}).forEach(path=>{const toAttribute=path.node.openingElement.attributes.find(attr=>{return j.JSXAttribute.check(attr)&&attr.name.name==="to"});if(toAttribute&&j.Literal.check(toAttribute.value)&&typeof toAttribute.value.value==="string"){if(toAttribute.value.value==="/"){toAttribute.value.value="../"}else if(!toAttribute.value.value.startsWith("../")){toAttribute.value.value="../"+toAttribute.value.value}dirtyFlag=true}});return dirtyFlag?root.toSource():undefined}const parser="tsx";