const reg = /^(#?[\w-]+|\.[\w-.]+)$/, // 以 # 或者. 打头的match; [\w-] 字母下划线和横线集合
          slice = [].slice;

    (function (window) {
        window.selector = (selector, ctx) => {
            if(reg.test(selector)) {
                switch (selector.charAt(0)){
                    case '#' : {
                        return ctx.getElementById(selector.substr(1));
                    }
                    case '.' : {
                        return slice.call(ctx.getElementsByClassName(
                            selector.substr(1).replace(/\./g, ' ') // .a .b => a b
                        ));
                    }
                    default: {
                        return slice.call(ctx.getElementsByTagName(selector));
                    }
                }
            }
            return slice.call(ctx.querySelectorAll(selector));
        };
    })(window);
