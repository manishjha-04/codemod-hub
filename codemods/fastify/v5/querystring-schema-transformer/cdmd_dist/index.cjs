/*! @license
The MIT License (MIT)

Copyright (c) 2024 manishjha-04

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"default",{enumerable:true,get:function(){return transformer}});function transformer(fileInfo,api){const j=api.jscodeshift;const root=j(fileInfo.source);root.find(j.CallExpression,{callee:{object:{name:"fastify"},property:{name:"get"}}}).forEach(path=>{const args=path.node.arguments;if(args[1]&&args[1].properties&&args[1].properties.some(prop=>prop.key.name==="schema"&&prop.value.properties.some(schemaProp=>schemaProp.key.name==="querystring"&&schemaProp.value.type==="ObjectExpression"))){args[1].properties.forEach(prop=>{if(prop.key.name==="schema"){prop.value.properties.forEach(schemaProp=>{if(schemaProp.key.name==="querystring"){const queryStringProps=schemaProp.value.properties;const nameProp=queryStringProps.find(p=>p.key.name==="name");schemaProp.value=j.objectExpression([j.property("init",j.identifier("type"),j.literal("object")),j.property("init",j.identifier("properties"),j.objectExpression([nameProp])),j.property("init",j.identifier("required"),j.arrayExpression([j.literal("name")]))])}})}})}});return root.toSource()}