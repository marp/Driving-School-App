(function framework7ComponentLoader(e,t){void 0===t&&(t=!0);var o=document,i=(window,e.$),s=(e.Template7,e.utils),n=(e.device,e.support,e.Class,e.Modal,e.ConstructorMethods,e.ModalMethods,{init:function(){var e,t,s,a,r,p,l,u,f,w,d,c,h,g,v,m,C,x,O,b,E,M=this,T={};var L=!!M.support.passiveListener&&{passive:!0};M.on("touchstart",function(e){if(n.el){var t=i(e.target);i(n.el).is(t[0])||t.parents(".swipeout").is(n.el)||t.hasClass("modal-in")||(t.attr("class")||"").indexOf("-backdrop")>0||t.hasClass("actions-modal")||t.parents(".actions-modal.modal-in, .dialog.modal-in").length>0||M.swipeout.close(n.el)}}),i(o).on(M.touchEvents.start,"li.swipeout",function(o){n.allow&&(t=!1,e=!0,s=void 0,T.x="touchstart"===o.type?o.targetTouches[0].pageX:o.pageX,T.y="touchstart"===o.type?o.targetTouches[0].pageY:o.pageY,a=(new Date).getTime(),p=i(this))},L),M.on("touchmove:active",function(o){if(e){var n="touchmove"===o.type?o.targetTouches[0].pageX:o.pageX,a="touchmove"===o.type?o.targetTouches[0].pageY:o.pageY;if(void 0===s&&(s=!!(s||Math.abs(a-T.y)>Math.abs(n-T.x))),s)e=!1;else{if(!t){if(i(".list.sortable-opened").length>0)return;l=p.find(".swipeout-content"),u=p.find(".swipeout-actions-right"),f=p.find(".swipeout-actions-left"),w=null,d=null,v=null,m=null,O=null,x=null,f.length>0&&(w=f.outerWidth(),v=f.children("a"),x=f.find(".swipeout-overswipe")),u.length>0&&(d=u.outerWidth(),m=u.children("a"),O=u.find(".swipeout-overswipe")),(h=p.hasClass("swipeout-opened"))&&(g=p.find(".swipeout-actions-left.swipeout-actions-opened").length>0?"left":"right"),p.removeClass("swipeout-transitioning"),M.params.swipeout.noFollow||(p.find(".swipeout-actions-opened").removeClass("swipeout-actions-opened"),p.removeClass("swipeout-opened"))}if(t=!0,o.preventDefault(),r=n-T.x,c=r,h&&("right"===g?c-=d:c+=w),c>0&&0===f.length||c<0&&0===u.length){if(!h)return e=!1,t=!1,l.transform(""),m&&m.length>0&&m.transform(""),void(v&&v.length>0&&v.transform(""));c=0}var L,y;if(c<0?C="to-left":c>0?C="to-right":C||(C="to-left"),o.f7PreventSwipePanel=!0,M.params.swipeout.noFollow)return h?("right"===g&&r>0&&M.swipeout.close(p),"left"===g&&r<0&&M.swipeout.close(p)):(r<0&&u.length>0&&M.swipeout.open(p,"right"),r>0&&f.length>0&&M.swipeout.open(p,"left")),e=!1,void(t=!1);if(b=!1,E=!1,u.length>0){var S=c;y=S/d,S<-d&&(S=-d-Math.pow(-S-d,.8),c=S,O.length>0&&(E=!0)),"to-left"!==C&&(y=0,S=0),m.each(function(e,t){var o=i(t);void 0===t.f7SwipeoutButtonOffset&&(o[0].f7SwipeoutButtonOffset=t.offsetLeft),L=t.f7SwipeoutButtonOffset,O.length>0&&o.hasClass("swipeout-overswipe")&&"to-left"===C&&(o.css({left:(E?-L:0)+"px"}),E?(o.hasClass("swipeout-overswipe-active")||(p.trigger("swipeout:overswipeenter"),M.emit("swipeoutOverswipeEnter",p[0])),o.addClass("swipeout-overswipe-active")):(o.hasClass("swipeout-overswipe-active")&&(p.trigger("swipeout:overswipeexit"),M.emit("swipeoutOverswipeExit",p[0])),o.removeClass("swipeout-overswipe-active"))),o.transform("translate3d("+(S-L*(1+Math.max(y,-1)))+"px,0,0)")})}if(f.length>0){var B=c;y=B/w,B>w&&(B=w+Math.pow(B-w,.8),c=B,x.length>0&&(b=!0)),"to-right"!==C&&(B=0,y=0),v.each(function(e,t){var o=i(t);void 0===t.f7SwipeoutButtonOffset&&(o[0].f7SwipeoutButtonOffset=w-t.offsetLeft-t.offsetWidth),L=t.f7SwipeoutButtonOffset,x.length>0&&o.hasClass("swipeout-overswipe")&&"to-right"===C&&(o.css({left:(b?L:0)+"px"}),b?(o.hasClass("swipeout-overswipe-active")||(p.trigger("swipeout:overswipeenter"),M.emit("swipeoutOverswipeEnter",p[0])),o.addClass("swipeout-overswipe-active")):(o.hasClass("swipeout-overswipe-active")&&(p.trigger("swipeout:overswipeexit"),M.emit("swipeoutOverswipeExit",p[0])),o.removeClass("swipeout-overswipe-active"))),v.length>1&&o.css("z-index",v.length-e),o.transform("translate3d("+(B+L*(1-Math.min(y,1)))+"px,0,0)")})}p.trigger("swipeout",y),M.emit("swipeout",p[0],y),l.transform("translate3d("+c+"px,0,0)")}}}),M.on("touchend:passive",function(){if(!e||!t)return e=!1,void(t=!1);e=!1,t=!1;var o,s,g,x,O=(new Date).getTime()-a,T="to-left"===C?u:f,L="to-left"===C?d:w;if(o=O<300&&(r<-10&&"to-left"===C||r>10&&"to-right"===C)||O>=300&&Math.abs(c)>L/2?"open":"close",O<300&&(0===Math.abs(c)&&(o="close"),Math.abs(c)===L&&(o="open")),"open"===o){n.el=p[0],p.trigger("swipeout:open"),M.emit("swipeoutOpen",p[0]),p.addClass("swipeout-opened swipeout-transitioning");var y="to-left"===C?-L:L;if(l.transform("translate3d("+y+"px,0,0)"),T.addClass("swipeout-actions-opened"),s="to-left"===C?m:v)for(g=0;g<s.length;g+=1)i(s[g]).transform("translate3d("+y+"px,0,0)");E&&u.find(".swipeout-overswipe").trigger("click","f7Overswipe"),b&&f.find(".swipeout-overswipe").trigger("click","f7Overswipe")}else p.trigger("swipeout:close"),M.emit("swipeoutClose",p[0]),n.el=void 0,p.addClass("swipeout-transitioning").removeClass("swipeout-opened"),l.transform(""),T.removeClass("swipeout-actions-opened");v&&v.length>0&&v!==s&&v.each(function(e,t){var o=i(t);void 0===(x=t.f7SwipeoutButtonOffset)&&(o[0].f7SwipeoutButtonOffset=w-t.offsetLeft-t.offsetWidth),o.transform("translate3d("+x+"px,0,0)")}),m&&m.length>0&&m!==s&&m.each(function(e,t){var o=i(t);void 0===(x=t.f7SwipeoutButtonOffset)&&(o[0].f7SwipeoutButtonOffset=t.offsetLeft),o.transform("translate3d("+-x+"px,0,0)")}),l.transitionEnd(function(){h&&"open"===o||!h&&"close"===o||(p.trigger("open"===o?"swipeout:opened":"swipeout:closed"),M.emit("open"===o?"swipeoutOpened":"swipeoutClosed",p[0]),p.removeClass("swipeout-transitioning"),h&&"close"===o&&(u.length>0&&m.transform(""),f.length>0&&v.transform("")))})})},allow:!0,el:void 0,open:function(){for(var e,t=[],o=arguments.length;o--;)t[o]=arguments[o];var a=this,r=t[0],p=t[1],l=t[2];"function"==typeof t[1]&&(r=(e=t)[0],l=e[1],p=e[2]);var u=i(r).eq(0);if(0!==u.length&&u.hasClass("swipeout")&&!u.hasClass("swipeout-opened")){p||(p=u.find(".swipeout-actions-right").length>0?"right":"left");var f=u.find(".swipeout-actions-"+p),w=u.find(".swipeout-content");if(0!==f.length){u.trigger("swipeout:open").addClass("swipeout-opened").removeClass("swipeout-transitioning"),a.emit("swipeoutOpen",u[0]),f.addClass("swipeout-actions-opened");var d=f.children("a"),c=f.outerWidth(),h="right"===p?-c:c;d.length>1&&d.each(function(e,t){var o=i(t);"right"===p?o.transform("translate3d("+-t.offsetLeft+"px,0,0)"):o.css("z-index",d.length-e).transform("translate3d("+(c-t.offsetWidth-t.offsetLeft)+"px,0,0)")}),u.addClass("swipeout-transitioning"),w.transitionEnd(function(){u.trigger("swipeout:opened"),a.emit("swipeoutOpened",u[0]),l&&l.call(u[0])}),s.nextFrame(function(){d.transform("translate3d("+h+"px,0,0)"),w.transform("translate3d("+h+"px,0,0)")}),n.el=u[0]}}},close:function(e,t){var o=this,s=i(e).eq(0);if(0!==s.length&&s.hasClass("swipeout-opened")){var a,r=s.find(".swipeout-actions-opened").hasClass("swipeout-actions-right")?"right":"left",p=s.find(".swipeout-actions-opened").removeClass("swipeout-actions-opened"),l=p.children("a"),u=p.outerWidth();n.allow=!1,s.trigger("swipeout:close"),o.emit("swipeoutClose",s[0]),s.removeClass("swipeout-opened").addClass("swipeout-transitioning"),s.find(".swipeout-content").transform("").transitionEnd(f),a=setTimeout(f,500),l.each(function(e,t){var o=i(t);"right"===r?o.transform("translate3d("+-t.offsetLeft+"px,0,0)"):o.transform("translate3d("+(u-t.offsetWidth-t.offsetLeft)+"px,0,0)"),o.css({left:"0px"}).removeClass("swipeout-overswipe-active")}),n.el&&n.el===s[0]&&(n.el=void 0)}function f(){n.allow=!0,s.hasClass("swipeout-opened")||(s.removeClass("swipeout-transitioning"),l.transform(""),s.trigger("swipeout:closed"),o.emit("swipeoutClosed",s[0]),t&&t.call(s[0]),a&&clearTimeout(a))}},delete:function(e,t){var o=this,a=i(e).eq(0);0!==a.length&&(n.el=void 0,a.trigger("swipeout:delete"),o.emit("swipeoutDelete",a[0]),a.css({height:a.outerHeight()+"px"}),a.transitionEnd(function(){if(a.trigger("swipeout:deleted"),o.emit("swipeoutDeleted",a[0]),t&&t.call(a[0]),a.parents(".virtual-list").length>0){var e=a.parents(".virtual-list")[0].f7VirtualList,i=a[0].f7VirtualListIndex;e&&void 0!==i&&e.deleteItem(i)}else o.params.swipeout.removeElements?o.params.swipeout.removeElementsWithTimeout?setTimeout(function(){a.remove()},o.params.swipeout.removeElementsTimeout):a.remove():a.removeClass("swipeout-deleting swipeout-transitioning")}),s.nextFrame(function(){a.addClass("swipeout-deleting swipeout-transitioning").css({height:"0px"}).find(".swipeout-content").transform("translate3d(-100%,0,0)")}))}}),a={name:"swipeout",params:{swipeout:{actionsNoFold:!1,noFollow:!1,removeElements:!0,removeElementsWithTimeout:!1,removeElementsTimeout:0}},create:function(){s.extend(this,{swipeout:{init:n.init.bind(this),open:n.open.bind(this),close:n.close.bind(this),delete:n.delete.bind(this)}}),Object.defineProperty(this.swipeout,"el",{enumerable:!0,configurable:!0,get:function(){return n.el},set:function(e){n.el=e}}),Object.defineProperty(this.swipeout,"allow",{enumerable:!0,configurable:!0,get:function(){return n.allow},set:function(e){n.allow=e}})},clicks:{".swipeout-open":function(e,t){void 0===t&&(t={});this.swipeout.open(t.swipeout,t.side)},".swipeout-close":function(e){var t=e.closest(".swipeout");0!==t.length&&this.swipeout.close(t)},".swipeout-delete":function(e,t){void 0===t&&(t={});var o=this,i=e.closest(".swipeout");if(0!==i.length){var s=t.confirm,n=t.confirmTitle;t.confirm?o.dialog.confirm(s,n,function(){o.swipeout.delete(i)}):o.swipeout.delete(i)}}},on:{init:function(){this.params.swipeout&&this.swipeout.init()}}};if(t){if(e.prototype.modules&&e.prototype.modules[a.name])return;e.use(a),e.instance&&(e.instance.useModuleParams(a,e.instance.params),e.instance.useModule(a))}return a}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
