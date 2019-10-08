(function framework7ComponentLoader(e,t){void 0===t&&(t=!0);var i=window,n=e.$,s=(e.Template7,e.utils),a=(e.device,e.support,e.Class),o=(e.Modal,e.ConstructorMethods);e.ModalMethods;var r=function(e){function t(t,a){void 0===a&&(a={}),e.call(this,a,[t]);var o,r,l,c=this;if(c.params=s.extend({},t.params.picker,a),c.params.containerEl&&0===(o=n(c.params.containerEl)).length)return c;function p(){c.resizeCols()}function u(){c.open()}function d(e){e.preventDefault()}function h(e){var t=n(e.target);c.isPopover()||c.opened&&!c.closing&&(t.closest('[class*="backdrop"]').length||(r&&r.length>0?t[0]!==r[0]&&0===t.closest(".sheet-modal").length&&c.close():0===n(e.target).closest(".sheet-modal").length&&c.close()))}return c.params.inputEl&&(r=n(c.params.inputEl)),r&&(l=r.parents(".view").length&&r.parents(".view")[0].f7View),l||(l=t.views.main),s.extend(c,{app:t,$containerEl:o,containerEl:o&&o[0],inline:o&&o.length>0,needsOriginFix:t.device.ios||i.navigator.userAgent.toLowerCase().indexOf("safari")>=0&&i.navigator.userAgent.toLowerCase().indexOf("chrome")<0&&!t.device.android,cols:[],$inputEl:r,inputEl:r&&r[0],initialized:!1,opened:!1,url:c.params.url,view:l}),s.extend(c,{attachResizeEvent:function(){t.on("resize",p)},detachResizeEvent:function(){t.off("resize",p)},attachInputEvents:function(){c.$inputEl.on("click",u),c.params.inputReadOnly&&c.$inputEl.on("focus mousedown",d)},detachInputEvents:function(){c.$inputEl.off("click",u),c.params.inputReadOnly&&c.$inputEl.off("focus mousedown",d)},attachHtmlEvents:function(){t.on("click",h)},detachHtmlEvents:function(){t.off("click",h)}}),c.init(),c}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.initInput=function(){this.$inputEl&&this.params.inputReadOnly&&this.$inputEl.prop("readOnly",!0)},t.prototype.resizeCols=function(){if(this.opened)for(var e=0;e<this.cols.length;e+=1)this.cols[e].divider||(this.cols[e].calcSize(),this.cols[e].setValue(this.cols[e].value,0,!1))},t.prototype.isPopover=function(){var e=this.app,t=this.modal,i=this.params;if("sheet"===i.openIn)return!1;if(t&&"popover"!==t.type)return!1;if(!this.inline&&this.inputEl){if("popover"===i.openIn)return!0;if(e.device.ios)return!!e.device.ipad;if(e.width>=768)return!0;if(e.device.desktop&&"aurora"===e.theme)return!0}return!1},t.prototype.formatValue=function(){var e=this.value,t=this.displayValue;return this.params.formatValue?this.params.formatValue.call(this,e,t):e.join(" ")},t.prototype.setValue=function(e,t){var i=0;if(0===this.cols.length)return this.value=e,void this.updateValue(e);for(var n=0;n<this.cols.length;n+=1)this.cols[n]&&!this.cols[n].divider&&(this.cols[n].setValue(e[i],t),i+=1)},t.prototype.getValue=function(){return this.value},t.prototype.updateValue=function(e){var t,i=e||[],n=[];if(0===this.cols.length)for(var s=this.params.cols.filter(function(e){return!e.divider}),a=0;a<s.length;a+=1)void 0!==(t=s[a]).displayValues&&void 0!==t.values&&-1!==t.values.indexOf(i[a])?n.push(t.displayValues[t.values.indexOf(i[a])]):n.push(i[a]);else for(var o=0;o<this.cols.length;o+=1)this.cols[o].divider||(i.push(this.cols[o].value),n.push(this.cols[o].displayValue));i.indexOf(void 0)>=0||(this.value=i,this.displayValue=n,this.emit("local::change pickerChange",this,this.value,this.displayValue),this.inputEl&&(this.$inputEl.val(this.formatValue()),this.$inputEl.trigger("change")))},t.prototype.initColumn=function(e,t){(function(e,t){var i=this,a=i.app,o=n(e),r=o.index(),l=i.cols[r];if(!l.divider){var c,p,u,d,h;l.$el=o,l.el=o[0],l.$itemsEl=l.$el.find(".picker-items"),l.items=l.$itemsEl.find(".picker-item"),l.replaceValues=function(e,t){l.detachEvents(),l.values=e,l.displayValues=t,l.$itemsEl.html(i.renderColumn(l,!0)),l.items=l.$itemsEl.find(".picker-item"),l.calcSize(),l.setValue(l.values[0],0,!0),l.attachEvents()},l.calcSize=function(){i.params.rotateEffect&&(l.$el.removeClass("picker-column-absolute"),l.width||l.$el.css({width:""}));var e=0,t=l.$el[0].offsetHeight;c=l.items[0].offsetHeight,p=c*l.items.length,u=t/2-p+c/2,d=t/2-c/2,l.width&&(e=l.width,parseInt(e,10)===e&&(e+="px"),l.$el.css({width:e})),i.params.rotateEffect&&(l.width||(l.items.each(function(t,i){var s=n(i).children("span");e=Math.max(e,s[0].offsetWidth)}),l.$el.css({width:e+2+"px"})),l.$el.addClass("picker-column-absolute"))},l.setValue=function(e,t,n){void 0===t&&(t="");var a=l.$itemsEl.find('.picker-item[data-picker-value="'+e+'"]').index();if(void 0!==a&&-1!==a){var o=-a*c+d;l.$itemsEl.transition(t),l.$itemsEl.transform("translate3d(0,"+o+"px,0)"),i.params.updateValuesOnMomentum&&l.activeIndex&&l.activeIndex!==a&&(s.cancelAnimationFrame(h),l.$itemsEl.transitionEnd(function(){s.cancelAnimationFrame(h)}),M()),l.updateItems(a,o,t,n)}},l.updateItems=function(e,t,a,o){void 0===t&&(t=s.getTranslate(l.$itemsEl[0],"y")),void 0===e&&(e=-Math.round((t-d)/c)),e<0&&(e=0),e>=l.items.length&&(e=l.items.length-1);var r=l.activeIndex;l.activeIndex=e,l.$itemsEl.find(".picker-item-selected").removeClass("picker-item-selected"),l.items.transition(a);var p=l.items.eq(e).addClass("picker-item-selected").transform("");i.params.rotateEffect&&l.items.each(function(e,s){var a=n(s),o=(a.index()*c-(d-t))/c,r=Math.ceil(l.height/c/2)+1,p=-18*o;p>180&&(p=180),p<-180&&(p=-180),Math.abs(o)>r?a.addClass("picker-item-far"):a.removeClass("picker-item-far"),a.transform("translate3d(0, "+(-t+d)+"px, "+(i.needsOriginFix?-110:0)+"px) rotateX("+p+"deg)")}),(o||void 0===o)&&(l.value=p.attr("data-picker-value"),l.displayValue=l.displayValues?l.displayValues[e]:l.value,r!==e&&(l.onChange&&l.onChange(i,l.value,l.displayValue),i.updateValue()))};var m,v,f,g,E,k,$,y,C,x,V,w=!0,b=!!a.support.passiveListener&&{passive:!1,capture:!1};l.attachEvents=function(){l.$el.on(a.touchEvents.start,O,b),a.on("touchmove:active",I),a.on("touchend:passive",T),i.params.mousewheel&&l.$el.on("wheel",z),l.items.on("click",P)},l.detachEvents=function(){l.$el.off(a.touchEvents.start,O,b),a.off("touchmove:active",I),a.off("touchend:passive",T),i.params.mousewheel&&l.$el.off("wheel",z),l.items.off("click",P)},l.init=function(){l.calcSize(),l.$itemsEl.transform("translate3d(0,"+d+"px,0)").transition(0),0===r&&l.$el.addClass("picker-column-first"),r===i.cols.length-1&&l.$el.addClass("picker-column-last"),t&&l.updateItems(0,d,0),l.attachEvents()},l.destroy=function(){l.detachEvents()},l.init()}function M(){h=s.requestAnimationFrame(function(){l.updateItems(void 0,void 0,0),M()})}function O(e){v||m||(e.preventDefault(),m=!0,f="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,g=f,E=(new Date).getTime(),w=!0,k=s.getTranslate(l.$itemsEl[0],"y"),y=k)}function I(e){m&&(e.preventDefault(),w=!1,g="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,v||(s.cancelAnimationFrame(h),v=!0,k=s.getTranslate(l.$itemsEl[0],"y"),y=k,l.$itemsEl.transition(0)),$=void 0,(y=k+(g-f))<u&&(y=u-Math.pow(u-y,.8),$="min"),y>d&&(y=d+Math.pow(y-d,.8),$="max"),l.$itemsEl.transform("translate3d(0,"+y+"px,0)"),l.updateItems(void 0,y,0,i.params.updateValuesOnTouchmove),x=y-C||y,C=y)}function T(){if(!m||!v)return m=!1,void(v=!1);var e;m=!1,v=!1,l.$itemsEl.transition(""),$&&("min"===$?l.$itemsEl.transform("translate3d(0,"+u+"px,0)"):l.$itemsEl.transform("translate3d(0,"+d+"px,0)")),e=(new Date).getTime()-E>300?y:y+x*i.params.momentumRatio,e=Math.max(Math.min(e,d),u);var t=Math.round(Math.abs((e-d)/c));i.params.freeMode||(e=-t*c+d),l.$itemsEl.transform("translate3d(0,"+parseInt(e,10)+"px,0)"),l.updateItems(t,e,"",!0),i.params.updateValuesOnMomentum&&(M(),l.$itemsEl.transitionEnd(function(){s.cancelAnimationFrame(h)})),setTimeout(function(){w=!0},100)}function z(e){var t=e.deltaX,n=e.deltaY;Math.abs(t)>Math.abs(n)||(clearTimeout(V),e.preventDefault(),s.cancelAnimationFrame(h),k=s.getTranslate(l.$itemsEl[0],"y"),l.$itemsEl.transition(0),$=void 0,(y=k-n)<u&&(y=u,$="min"),y>d&&(y=d,$="max"),l.$itemsEl.transform("translate3d(0,"+y+"px,0)"),l.updateItems(void 0,y,0,i.params.updateValuesOnMousewheel),V=setTimeout(function(){l.$itemsEl.transition(""),$&&("min"===$?l.$itemsEl.transform("translate3d(0,"+u+"px,0)"):l.$itemsEl.transform("translate3d(0,"+d+"px,0)")),(new Date).getTime();var e=y;e=Math.max(Math.min(e,d),u);var t=Math.round(Math.abs((e-d)/c));i.params.freeMode||(e=-t*c+d),l.$itemsEl.transform("translate3d(0,"+parseInt(e,10)+"px,0)"),l.updateItems(t,e,"",!0)},200))}function P(){if(w){s.cancelAnimationFrame(h);var e=n(this).attr("data-picker-value");l.setValue(e)}}}).call(this,e,t)},t.prototype.destroyColumn=function(e){var t=n(e).index();this.cols[t]&&this.cols[t].destroy&&this.cols[t].destroy()},t.prototype.renderToolbar=function(){return this.params.renderToolbar?this.params.renderToolbar.call(this,this):('\n      <div class="toolbar toolbar-top no-shadow">\n        <div class="toolbar-inner">\n          <div class="left"></div>\n          <div class="right">\n            <a class="link sheet-close popover-close">'+this.params.toolbarCloseText+"</a>\n          </div>\n        </div>\n      </div>\n    ").trim()},t.prototype.renderColumn=function(e,t){var i,n,s="picker-column "+(e.textAlign?"picker-column-"+e.textAlign:"")+" "+(e.cssClass||"");return i=e.divider?'\n        <div class="'+s+' picker-column-divider">'+e.content+"</div>\n      ":'\n        <div class="'+s+'">\n          <div class="picker-items">'+(n=e.values.map(function(t,i){return'\n        <div class="picker-item" data-picker-value="'+t+'">\n          <span>'+(e.displayValues?e.displayValues[i]:t)+"</span>\n        </div>\n      "}).join(""))+"</div>\n        </div>\n      ",t?n.trim():i.trim()},t.prototype.renderInline=function(){var e=this,t=e.params;return('\n      <div class="picker picker-inline '+(t.rotateEffect?"picker-3d":"")+" "+(t.cssClass||"")+'">\n        '+(t.toolbar?e.renderToolbar():"")+'\n        <div class="picker-columns">\n          '+e.cols.map(function(t){return e.renderColumn(t)}).join("")+'\n          <div class="picker-center-highlight"></div>\n        </div>\n      </div>\n    ').trim()},t.prototype.renderSheet=function(){var e=this,t=e.params;return('\n      <div class="sheet-modal picker picker-sheet '+(t.rotateEffect?"picker-3d":"")+" "+(t.cssClass||"")+'">\n        '+(t.toolbar?e.renderToolbar():"")+'\n        <div class="sheet-modal-inner picker-columns">\n          '+e.cols.map(function(t){return e.renderColumn(t)}).join("")+'\n          <div class="picker-center-highlight"></div>\n        </div>\n      </div>\n    ').trim()},t.prototype.renderPopover=function(){var e=this,t=e.params;return('\n      <div class="popover picker-popover">\n        <div class="popover-inner">\n          <div class="picker '+(t.rotateEffect?"picker-3d":"")+" "+(t.cssClass||"")+'">\n            '+(t.toolbar?e.renderToolbar():"")+'\n            <div class="picker-columns">\n              '+e.cols.map(function(t){return e.renderColumn(t)}).join("")+'\n              <div class="picker-center-highlight"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ').trim()},t.prototype.render=function(){return this.params.render?this.params.render.call(this):this.inline?this.renderInline():this.isPopover()?this.renderPopover():this.renderSheet()},t.prototype.onOpen=function(){var e=this,t=e.initialized,i=e.$el,n=e.app,s=e.$inputEl,a=e.inline,o=e.value,r=e.params;e.opened=!0,e.closing=!1,e.opening=!0,e.attachResizeEvent(),i.find(".picker-column").each(function(i,n){var s=!0;(!t&&r.value||t&&o)&&(s=!1),e.initColumn(n,s)}),t?o&&e.setValue(o,0):o?e.setValue(o,0):r.value&&e.setValue(r.value,0),!a&&s&&s.length&&"md"===n.theme&&s.trigger("focus"),e.initialized=!0,i&&i.trigger("picker:open",e),s&&s.trigger("picker:open",e),e.emit("local::open pickerOpen",e)},t.prototype.onOpened=function(){this.opening=!1,this.$el&&this.$el.trigger("picker:opened",this),this.$inputEl&&this.$inputEl.trigger("picker:opened",this),this.emit("local::opened pickerOpened",this)},t.prototype.onClose=function(){var e=this.app;this.opening=!1,this.closing=!0,this.detachResizeEvent(),this.cols.forEach(function(e){e.destroy&&e.destroy()}),this.$inputEl&&"md"===e.theme&&this.$inputEl.trigger("blur"),this.$el&&this.$el.trigger("picker:close",this),this.$inputEl&&this.$inputEl.trigger("picker:close",this),this.emit("local::close pickerClose",this)},t.prototype.onClosed=function(){var e=this;e.opened=!1,e.closing=!1,e.inline||s.nextTick(function(){e.modal&&e.modal.el&&e.modal.destroy&&(e.params.routableModals||e.modal.destroy()),delete e.modal}),e.$el&&e.$el.trigger("picker:closed",e),e.$inputEl&&e.$inputEl.trigger("picker:closed",e),e.emit("local::closed pickerClosed",e)},t.prototype.open=function(){var e,t=this,i=t.app,s=t.opened,a=t.inline,o=t.$inputEl;if(!s){if(0===t.cols.length&&t.params.cols.length&&t.params.cols.forEach(function(e){t.cols.push(e)}),a)return t.$el=n(t.render()),t.$el[0].f7Picker=t,t.$containerEl.append(t.$el),t.onOpen(),void t.onOpened();var r=t.isPopover(),l=r?"popover":"sheet",c={targetEl:o,scrollToEl:t.params.scrollToInput?o:void 0,content:t.render(),backdrop:r,on:{open:function(){t.modal=this,t.$el=r?this.$el.find(".picker"):this.$el,t.$el[0].f7Picker=t,t.onOpen()},opened:function(){t.onOpened()},close:function(){t.onClose()},closed:function(){t.onClosed()}}};t.params.routableModals?t.view.router.navigate({url:t.url,route:(e={path:t.url},e[l]=c,e)}):(t.modal=i[l].create(c),t.modal.open())}},t.prototype.close=function(){var e=this.opened,t=this.inline;if(e)return t?(this.onClose(),void this.onClosed()):void(this.params.routableModals?this.view.router.back():this.modal.close())},t.prototype.init=function(){if(this.initInput(),this.inline)return this.open(),void this.emit("local::init pickerInit",this);!this.initialized&&this.params.value&&this.setValue(this.params.value),this.$inputEl&&this.attachInputEvents(),this.params.closeByOutsideClick&&this.attachHtmlEvents(),this.emit("local::init pickerInit",this)},t.prototype.destroy=function(){if(!this.destroyed){var e=this.$el;this.emit("local::beforeDestroy pickerBeforeDestroy",this),e&&e.trigger("picker:beforedestroy",this),this.close(),this.$inputEl&&this.detachInputEvents(),this.params.closeByOutsideClick&&this.detachHtmlEvents(),e&&e.length&&delete this.$el[0].f7Picker,s.deleteProps(this),this.destroyed=!0}},t}(a),l={name:"picker",static:{Picker:r},create:function(){this.picker=o({defaultSelector:".picker",constructor:r,app:this,domProp:"f7Picker"}),this.picker.close=function(e){void 0===e&&(e=".picker");var t=n(e);if(0!==t.length){var i=t[0].f7Picker;!i||i&&!i.opened||i.close()}}},params:{picker:{updateValuesOnMomentum:!1,updateValuesOnTouchmove:!0,updateValuesOnMousewheel:!0,mousewheel:!0,rotateEffect:!1,momentumRatio:7,freeMode:!1,cols:[],containerEl:null,openIn:"auto",formatValue:null,inputEl:null,inputReadOnly:!0,closeByOutsideClick:!0,scrollToInput:!0,toolbar:!0,toolbarCloseText:"Done",cssClass:null,routableModals:!0,view:null,url:"select/",renderToolbar:null,render:null}}};if(t){if(e.prototype.modules&&e.prototype.modules[l.name])return;e.use(l),e.instance&&(e.instance.useModuleParams(l,e.instance.params),e.instance.useModule(l))}return l}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
