// 使用chrome.storage.local.get()方法获取扩展的本地存储数据，并根据需要设置默认值
chrome.storage.local.get(['openIn', 'openInMiddle', 'doNotClose', 'hoverEnter', 'startup', 'root', 'theme', 'scroll', 'hidden', 'showHidden'], ({ openIn, openInMiddle, doNotClose, hoverEnter, startup, root, theme, scroll, hidden, showHidden }) => {
    // 定义默认的书签菜单设置对象
    const qbm = {
        startup: ['1', 18],
        openIn: 'new',
        openInMiddle: 'background',
        doNotClose: 'none',
        hoverEnter: 'off',
        root: '0',
        theme: 'auto',
        scroll: 'x',
        hidden: [],
        showHidden: false
    };

    // 如果startup不存在，则根据是否在移动浏览器上运行设置启动项
    if (!startup) {
        chrome.bookmarks.get('1', results => {  //检查移动浏览器
            if (!Array.isArray(results) || !results.length) {
                qbm.startup = ['0', 18];
            }
            chrome.storage.local.set({ startup } = qbm);
        });
    } else if (!startup[1]) {   //检查旧格式
        chrome.storage.local.set({ startup: [startup, 18] });
    } else {
        qbm.startup = startup;
    }

    // 根据是否存在openIn值来设置相关项
    if (!openIn) {
        chrome.storage.local.set({ openIn } = qbm);
    } else {
        qbm.openIn = openIn;
    }

    // 根据是否存在openInMiddle值来设置相关项
    if (!openInMiddle) {
        chrome.storage.local.set({ openInMiddle } = qbm);
    } else {
        qbm.openInMiddle = openInMiddle;
    }

    // 根据是否存在doNotClose值来设置相关项
    if (!doNotClose) {
        chrome.storage.local.set({ doNotClose } = qbm);
    } else {
        qbm.doNotClose = doNotClose;
    }

    // 根据是否存在hoverEnter值来设置相关项
    if (!hoverEnter) {
        chrome.storage.local.set({ hoverEnter } = qbm);
    } else {
        qbm.hoverEnter = hoverEnter;
    }

    // 根据是否存在root值来设置相关项，检查旧格式
    if (!root || isNaN(root)) {
        chrome.storage.local.set({ root } = qbm);
    } else {
        qbm.root = root;
    }

    // 根据是否存在theme值来设置相关项
    if (!theme) {
        chrome.storage.local.set({ theme } = qbm);
    } else {
        qbm.theme = theme;
    }

    // 根据是否存在scroll值来设置相关项
    if (!scroll) {
        chrome.storage.local.set({ scroll } = qbm);
    } else {
        qbm.scroll = scroll;
    }

    // 根据是否存在hidden值来设置相关项
    if (!hidden) {
        chrome.storage.local.set({ hidden } = qbm);
    } else {
        qbm.hidden = hidden;
    }

    // 根据是否存在showHidden值来设置相关项
    if (!showHidden) {
        chrome.storage.local.set({ showHidden } = qbm);
    } else {
        qbm.showHidden = showHidden;
    }
});

// 导出空对象
export { };