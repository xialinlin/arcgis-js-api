// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/assignHelper","../../../../../core/tsSupport/awaiterHelper","../../../../../core/tsSupport/generatorHelper","../../../../../core/arrayUtils","../../../../../core/promiseUtils","../../../../../core/requireUtils","../../../../../core/workers","../../../lib/glMatrix","../../../support/buffer/BufferView","../../../support/buffer/bufferViewUtil","../localOriginHelper","../LocalOriginManager","../PreinterleavedGeometryData","../RegularGridLocalOriginFactory","../Util","../TextureBackedBuffer/BufferManager","./bufferLayouts","./edgeBufferWriters","./EdgeProcessingWorker","./EdgeRenderer","./strokes","./util","../../../../webgl/BufferObject","../../../../webgl/VertexArrayObject","module"],function(e,t,r,n,i,o,s,a,d,c,u,l,f,p,h,g,m,v,b,y,E,x,O,R,w,T,M){Object.defineProperty(t,"__esModule",{value:!0});var B=function(){function t(e,t,r){this.rctx=e,this.programRepository=t,this.callbacks=r,this.profilingCallback=null,this.perObjectData=new Map,this.renderers=new Map,this.localOrigins=new p.LocalOriginManager(new g(1e4)),this.numberOfRenderedEdges=0,this.gpuMemoryUsage=0,this.worker=new E,this.workerThread=null,this.destroyed=!1,this.tmpModelPosition=c.vec3d.create(),this.tmpCameraPosition=c.vec3d.create(),this.componentColorManager=new v.BufferManager(this.rctx,2)}return t.isSupported=function(e){return!!e.capabilities.instancing},t.loadShaders=function(e,t,r){x.EdgeRenderer.loadShaders(e,t,r)},t.prototype.initialize=function(){var t=this;d.open(a.getAbsMid("./EdgeProcessingWorker",e,M),{client:this}).then(function(e){t.destroyed?e.close():t.workerThread=e});for(var r=b.VertexLayout.createBuffer(4),n=0;n<4;n++)r.sideness.set(n,0,0===n||3===n?0:1),r.sideness.set(n,1,0===n||1===n?0:1);this.verticesBufferObject=w.createVertex(this.rctx,35044,r.buffer)},t.prototype.destroy=function(){this.destroyed||(this.workerThread&&(this.workerThread.close(),this.workerThread=null),this.verticesBufferObject&&(this.verticesBufferObject.dispose(),this.verticesBufferObject=null),this.destroyed=!0)},t.prototype.getGpuMemoryUsage=function(){return this.gpuMemoryUsage/1048576},Object.defineProperty(t.prototype,"numberOfRenderedPrimitives",{get:function(){return this.numberOfRenderedEdges},enumerable:!0,configurable:!0}),t.prototype.shouldRender=function(){return this.renderers.size>0},t.prototype.addObject=function(e,t,r){return n(this,void 0,void 0,function(){var n,o,a,d,c,u,l;return i(this,function(i){switch(i.label){case 0:if(this.hasObject(e))return[2];if(n=new Array,a={loaded:s.create(function(e){o=e}),renderables:[]},this.perObjectData.set(e,a),r&&r.mergeGeometries&&e.geometries.length>1&&this.canMergeGeometries(e))n.push(this.addObjectMergedGeometries(e,a,t));else for(d=0;d<e.geometries.length;d++)c=e.geometries[d],u=e.geometryRecords[d],l=u.materials[0],l.supportsEdges&&(c.data instanceof h?n.push(this.addGeometryPreinterleaved(e,a,c,c.data,u,t)):n.push(this.addGeometryNonPreinterleaved(e,a,c,c.data,u,t[0])));return[4,s.all(n)];case 1:return i.sent(),this.callbacks.setNeedsRender(),o(),[2]}})})},t.prototype.hasObject=function(e){return this.perObjectData.has(e)},t.prototype.updateAllComponentOpacities=function(e,t){return n(this,void 0,void 0,function(){var r,n;return i(this,function(i){switch(i.label){case 0:return r=this.perObjectData.get(e),r?[4,r.loaded]:[2];case 1:return i.sent(),n=t instanceof Array?function(e){return t[e]}:function(e){return t},r.renderables.forEach(function(e){for(var t=e.components.meta.length,r=0;r<t;r++){var i=n(r),o=e.components.meta[r],s=o.index;o.material.opacity=i,e.components.buffer.textureBuffer.setDataElement(s,1,3,255*i)}e.allTransparent=R.determineAllTransparent(e.components.meta)}),this.callbacks.setNeedsRender(),[2]}})})},t.prototype.updateAllComponentMaterials=function(e,t){return n(this,void 0,void 0,function(){var r,n=this;return i(this,function(i){switch(i.label){case 0:return r=this.perObjectData.get(e),r?[4,r.loaded]:[2];case 1:return i.sent(),r.renderables.forEach(function(e){var r=R.determineRequiresUberRenderer(t),i=x.EdgeRenderer.getKey(r,t[0].type);if(i!==e.rendererKey){var o=n.renderers.get(e.rendererKey),s=n.aquireRenderer(r,t[0].type);o.removeRenderable(e),o.refCount.decrement(),e.rendererKey=i,s.addRenderable(e)}for(var a=0;a<t.length;a++)e.components.meta[a].material=t[a];n.updateComponentBuffer(e.components),e.allTransparent=R.determineAllTransparent(e.components.meta)}),this.callbacks.setNeedsRender(),[2]}})})},t.prototype.updateObjectVisibility=function(e,t){return n(this,void 0,void 0,function(){var r;return i(this,function(n){switch(n.label){case 0:return r=this.perObjectData.get(e),r?[4,r.loaded]:[2];case 1:return n.sent(),r.renderables.forEach(function(e){e.visible=t}),this.callbacks.setNeedsRender(),[2]}})})},t.prototype.removeObject=function(e){var t=this,r=this.perObjectData.get(e);r&&(this.perObjectData.delete(e),r.loaded.then(function(){r.renderables.forEach(function(e){t.removeRenderable(e)}),t.callbacks.setNeedsRender()}))},t.prototype.removeAll=function(){var e=this;this.perObjectData.forEach(function(t,r){e.removeObject(r)})},t.prototype.createSolidEdgeMaterial=function(e){return r({},I,e,{type:"solid"})},t.prototype.createSketchEdgeMaterial=function(e){return r({},C,e,{type:"sketch"})},t.prototype.render=function(e){var t=this;this.localOrigins.updateViewMatrices(e.view),this.renderers.forEach(function(e){0===e.refCount.value&&(t.renderers.delete(e.key),e.dispose())}),this.componentColorManager.garbageCollect(),this.componentColorManager.updateTextures();var r=e.view,n=0,i=0;this.renderers.forEach(function(e){e.forEachRenderable(function(e){n+=e.statistics.averageEdgeLength,i++})});var o=n/i,s={distanceFalloffFactor:40*o,minimumEdgeLength:R.estimateLengthAtDistance(e.viewport[3],e.fovY,1,3.5)},a=this.rctx.capabilities.blendMinMax;a?(this.rctx.setDepthWriteEnabled(!1),this.rctx.setBlendingEnabled(!0),this.rctx.setBlendEquationSeparate(32774,a.MAX),this.rctx.setBlendFunctionSeparate(1,0,1,1)):(this.rctx.setDepthWriteEnabled(!0),this.rctx.setBlendingEnabled(!1)),this.rctx.setDepthTestEnabled(!0),this.rctx.setDepthFunction(515),this.updateObjectCameraDistances(e),this.numberOfRenderedEdges=0,this.renderers.forEach(function(r){t.renderRegularEdges(r,e,s),t.renderSilhouetteEdges(r,e,s)}),this.rctx.setDepthWriteEnabled(!0),this.rctx.setDepthFunction(513),this.rctx.setBlendEquationSeparate(32774,32774),this.rctx.setBlendFunctionSeparate(1,0,1,1),e.view=r},t.prototype.computeModelTransformWithLocalOrigin=function(e,t,r){if(e.getCombinedStaticTransformation(t,r),t.origin)this.localOrigins.register(t.origin);else{var n=c.vec3d.set3(r[12],r[13],r[14],this.tmpModelPosition);t.origin=this.localOrigins.aquire(n)}return f.applyToModelMatrix(t.origin.vec3,r),r},t.prototype.updateComponentBuffer=function(e){for(var t=e.meta,r=e.buffer,n=0;n<t.length;n++){var i=t[n].material,o=t[n].index,s=m.clamp(Math.round(i.size*x.LINE_WIDTH_FRACTION_FACTOR),0,255),a=m.clamp(i.extensionLength,-x.EXTENSION_LENGTH_OFFSET,255-x.EXTENSION_LENGTH_OFFSET)+x.EXTENSION_LENGTH_OFFSET,d="solid"===i.type?0:1,c=255*i.opacity,u=i.color,l=255*u[0],f=255*u[1],p=255*u[2],h=255*u[3];r.textureBuffer.setData(o,0,l,f,p,h),r.textureBuffer.setData(o,1,s,a,d,c)}},t.prototype.createComponentBuffers=function(e){for(var t=[],r=this.componentColorManager.getBuffer(e.length),n=0;n<e.length;n++){var i=e[n],o=r.aquireIndex();t.push({index:o,material:i})}var s={meta:t,buffer:r};return this.updateComponentBuffer(s),s},t.prototype.extractEdges=function(e,t,r,n){return this.worker.process({data:t,originalIndices:n,writerSettings:e,skipDeduplicate:r},this.workerThread)},t.prototype.createEdgeResources=function(e){var t={};if(e.regular.lodInfo.lengths.length>0){var r=new T(this.rctx,b.EdgeShaderAttributeLocations,{vertices:b.glVertexLayout,instances:y.RegularEdgeBufferWriter.glLayout},{vertices:this.verticesBufferObject,instances:w.createVertex(this.rctx,35044,e.regular.instancesData.buffer)});t.regular={vao:r,lod:e.regular.lodInfo}}if(e.silhouette.lodInfo.lengths.length>0){var r=new T(this.rctx,b.EdgeShaderAttributeLocations,{vertices:b.glVertexLayout,instances:y.SilhouetteEdgeBufferWriter.glLayout},{vertices:this.verticesBufferObject,instances:w.createVertex(this.rctx,35044,e.silhouette.instancesData.buffer)});t.silhouette={vao:r,lod:e.silhouette.lodInfo}}return t},t.prototype.disposeEdgeResources=function(e){e.regular&&(e.regular.vao.vertexBuffers.instances.dispose(),e.regular.vao.dispose(!1),e.regular.vao=null),e.silhouette&&(e.silhouette.vao.vertexBuffers.instances.dispose(),e.silhouette.vao.dispose(!1),e.silhouette.vao=null)},t.prototype.addGeometryNonPreinterleaved=function(e,t,r,o,s,a){return n(this,void 0,void 0,function(){var r,n,d,u;return i(this,function(i){switch(i.label){case 0:return r=o.getAttribute("position"),n=this.computeModelTransformWithLocalOrigin(e,s,c.mat4d.create()),d=s.origin,u={position:r,indices:o.getIndices("position"),modelTransform:n,origin:d},[4,this.addNonPreinterleaved(e,t,u,a)];case 1:return i.sent(),[2]}})})},t.prototype.addNonPreinterleaved=function(e,t,r,o){return n(this,void 0,void 0,function(){var e,n,s,a,d,c,u,l,f,p,h,g,m,v,y;return i(this,function(i){switch(i.label){case 0:for(e=this.aquireRenderer(!1,o.type),n=r.modelTransform,s=r.origin,a=r.indices,d=r.position,c=d.data.length/d.strideIdx,u=b.EdgeInputBufferLayout.createBuffer(c),l=0;l<c;l++)u.position.set(l,0,d.data[d.offsetIdx+l*d.strideIdx+0]),u.position.set(l,1,d.data[d.offsetIdx+l*d.strideIdx+1]),u.position.set(l,2,d.data[d.offsetIdx+l*d.strideIdx+2]);return f=this.createComponentBuffers([o]),R.fillComponenBufferIndices(f.meta,[0,u.componentIndex.count],u.componentIndex),[4,this.extractEdges(e.writerSettings,u,!1,a)];case 1:return p=i.sent(),h=this.createEdgeResources(p),g=h.regular,m=h.silhouette,v=(g?g.vao.size:0)+(m?m.vao.size:0),y={regular:g,silhouette:m,transform:{modelMatrix:n,origin:s},statistics:{gpuMemoryUsage:v,averageEdgeLength:p.averageEdgeLength},components:f,visible:!0,allTransparent:R.determineAllTransparent(f.meta),distanceToCamera:0,rendererKey:e.key},t.renderables.push(y),e.addRenderable(y),this.gpuMemoryUsage+=v,[2]}})})},t.prototype.addGeometryPreinterleaved=function(e,t,r,o,s,a){return n(this,void 0,void 0,function(){var r,n,d,f,p,h,g,m,v,y,E,x,O,w,T,M,B;return i(this,function(i){switch(i.label){case 0:return(r=o.getAttribute("position"))&&r.data instanceof Float32Array?(n=a[0],d=R.determineRequiresUberRenderer(a),f=this.aquireRenderer(d,n.type),p=this.computeModelTransformWithLocalOrigin(e,s,c.mat4d.create()),h=s.origin,g=o.getIndices("position"),m=new u.BufferViewVec3f(r.data.buffer,4*r.offsetIdx,4*r.strideIdx),v=b.EdgeInputBufferLayout.createBuffer(m.count),l.unrolledCopyVec3(v.position,m),y=this.createComponentBuffers(a),R.fillComponenBufferIndices(y.meta,o.componentOffsets,v.componentIndex,g),E=o.hasPositionData,[4,this.extractEdges(f.writerSettings,v,E,g)]):(console.warn("Geometry has no float32 `position` attribute, skipping it."),[2]);case 1:return x=i.sent(),O=this.createEdgeResources(x),w=O.regular,T=O.silhouette,M=(w?w.vao.size:0)+(T?T.vao.size:0),B={regular:w,silhouette:T,transform:{modelMatrix:p,origin:h},statistics:{gpuMemoryUsage:M,averageEdgeLength:x.averageEdgeLength},components:y,visible:!e.isHidden(s),allTransparent:R.determineAllTransparent(y.meta),distanceToCamera:0,rendererKey:f.key},t.renderables.push(B),f.addRenderable(B),this.gpuMemoryUsage+=M,[2]}})})},t.prototype.canMergeGeometries=function(e){for(var t=null,r=null,n=0;n<e.geometries.length;n++){var i=e.geometries[n],s=e.geometryRecords[n];if(s.materials[0].supportsEdges){if(i.data instanceof h)return!1;if(t){if(!o.equals(t,s.transformation))return!1}else t=s.transformation;if(!r&&s.origin)r=s;else if(r&&s.origin&&r.origin.id!==s.origin.id)return!1}}return!0},t.prototype.addObjectMergedGeometries=function(e,t,r){return n(this,void 0,void 0,function(){var n,o,s,a,d,u,l,f,p,h,g,m,d,u,v,f,b,p,y,E,x,O,R,w,d,T;return i(this,function(i){switch(i.label){case 0:for(n=new Map,o=0,s=null,a=null,d=0;d<e.geometries.length;d++)u=e.geometries[d],l=e.geometryRecords[d],f=l.materials[0],f.supportsEdges&&(!a&&l.origin&&(a=l),p=u.data.getIndices("position"),o+=p?p.length:0,(p&&null==s||s===Uint16Array)&&(s=p instanceof Uint16Array?Uint16Array:Uint32Array));for(h=o?new s(o):null,g=[],m=0,d=0;d<e.geometries.length;d++)if(u=e.geometries[d],v=e.geometryRecords[d],f=v.materials[0],f.supportsEdges){if(b=u.data.getAttribute("position"),p=u.data.getIndices("position"),null==(y=n.get(b.data))){for(y=g.length/3,E=b.offsetIdx;E<b.data.length;E+=b.strideIdx)g.push(b.data[E+0]),g.push(b.data[E+1]),g.push(b.data[E+2]);n.set(b.data,y)}if(p)for(x=0;x<p.length;x++)h[m++]=y+p[x]}for(O=a||e.geometryRecords[0],R=this.computeModelTransformWithLocalOrigin(e,O,c.mat4d.create()),w=O.origin,d=0;d<e.geometryRecords.length;d++)e.geometryRecords[d].origin=w;return T={position:{data:g,offsetIdx:0,strideIdx:3},indices:h,modelTransform:R,origin:w},[4,this.addNonPreinterleaved(e,t,T,r[0])];case 1:return i.sent(),[2]}})})},t.prototype.aquireRenderer=function(e,t){var r=x.EdgeRenderer.getKey(e,t),n=this.renderers.get(r);return this.strokesTexture||(this.strokesTexture=O.generateStrokesTexture(this.rctx)),n||(n=new x.EdgeRenderer(this.rctx,this.programRepository,{type:t,strokesTexture:this.strokesTexture,uber:e}),this.renderers.set(r,n)),n.refCount.increment(),n},t.prototype.removeRenderable=function(e){var t=this.renderers.get(e.rendererKey);t.removeRenderable(e),t.refCount.decrement(),this.disposeEdgeResources(e),this.localOrigins.release(e.transform.origin),this.gpuMemoryUsage-=e.statistics.gpuMemoryUsage;for(var r=0,n=e.components.meta;r<n.length;r++){var i=n[r];e.components.buffer.releaseIndex(i.index)}},t.prototype.updateObjectCameraDistances=function(e){var t=this,r=e.viewInvTransp;c.vec3d.set3(r[3],r[7],r[11],this.tmpCameraPosition),this.perObjectData.forEach(function(e,r){var n=c.vec3d.dist(r.getCenter(),t.tmpCameraPosition);e.renderables.forEach(function(e){return e.distanceToCamera=n})})},t.prototype.renderRegularEdges=function(e,t,r){var n=this;e.bindRegularEdges(t,r),e.forEachRenderable(function(i){if(i.visible&&i.regular&&!i.allTransparent){var o=R.computeEdgeCount(i.regular.lod.lengths,i.distanceToCamera,r);t.view=n.localOrigins.getViewMatrix(i.transform.origin),e.renderRegularEdges(i,t,o),n.numberOfRenderedEdges+=o}})},t.prototype.renderSilhouetteEdges=function(e,t,r){var n=this;e.bindSilhouetteEdges(t,r),e.forEachRenderable(function(i){if(i.visible&&i.silhouette&&!i.allTransparent){var o=R.computeEdgeCount(i.silhouette.lod.lengths,i.distanceToCamera,r);t.view=n.localOrigins.getViewMatrix(i.transform.origin),e.renderSilhouetteEdges(i,t,o),n.numberOfRenderedEdges+=o}})},t}();t.EdgeView=B;var I={color:c.vec4d.createFrom(0,0,0,.2),size:1,extensionLength:0,opacity:1},C={color:c.vec4d.createFrom(0,0,0,.2),size:1,extensionLength:0,opacity:1}});