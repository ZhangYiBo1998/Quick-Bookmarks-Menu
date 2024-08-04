// 引入所需的库和组件
import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import ContextWrapper, { Configuration, Message, Page } from './components/ContextWrapper';
import PopupHeader from './components/PopupHeader';
import PopupContainer from './components/PopupContainer';
import PopupFooter from './components/PopupFooter';
import ContextMenu from './components/ContextMenu';
import './Popup.scss';

// 定义PopupProps接口
interface PopupProps {
    config: Configuration
}

// 定义弹出窗口组件
function Popup(props: PopupProps) {
    // 使用useState定义多个状态变量
    const [config, setConfig] = useState(props.config);
    const [page, setPage] = useState<Page>({ type: 'folder', key: config.startup[0] });
    const [msgs, setMsgs] = useState<Message[]>([]);
    const [hidden, setHidden] = useState(config.hidden);
    const [removeBookmarksId, setRemoveBookmarksId] = useState('');

    // 定义导航函数，用于更新页面状态
    const navigate = (type: Page["type"], key: Page["key"]) => {
        setPage({ type, key });
    };

    // 定义消息通知函数，用于向页面添加消息
    const notify = (msg: Message) => {
        setMsgs([...msgs, msg]);
    };

    // 定义清空消息函数
    const clearMsg = () => {
        setMsgs([]);
    };

    // 定义设置隐藏状态的函数
    const setItemHide = (key: string) => {
        // 更新新的隐藏状态并存储到本地存储
        let newHidden: string[];
        if (hidden.includes(key)) {
            newHidden = hidden.filter(e => e != key);
        } else {
            newHidden = hidden.concat([key]);
        }
        chrome.storage.local.set({ hidden: newHidden }, () => {
            setHidden(newHidden);
        });
    };

    // 更新收藏夹列表
    const removeBookmarksCallback = (id:string) => {
        console.log('更新收藏夹列表')
        setRemoveBookmarksId(id);
    }

    // 应用主题配置
    applyTheme(config.theme);
    return (
        <ContextWrapper nav={navigate} config={[config, setConfig]} notify={notify} hide={setItemHide}>
            <PopupHeader page={page} msgs={msgs} clearMsg={clearMsg} horiz={config.scroll === 'x'} />
            <PopupContainer page={page} hidden={hidden} removeBookmarksId={removeBookmarksId} />
            <PopupFooter page={page} hidden={hidden} />
            <ContextMenu removeBookmarksCallback={removeBookmarksCallback} />
        </ContextWrapper>
    );
}

// 加载配置并渲染弹出窗口
chrome.storage.local.get(['openIn', 'openInMiddle', 'doNotClose', 'hoverEnter', 'startup', 'root', 'theme', 'scroll', 'hidden', 'showHidden'], (result: Partial<Configuration>) => {
    adjustHeight((result as Configuration).startup[1]);
    render(<Popup config={result as Configuration} />, document.body);
});

// 调整弹出窗口的高度
function adjustHeight(length: number) {
    const rootStyle = document.documentElement.style;
    const height = (length + 2) * 30;
    rootStyle.setProperty('--startup-height', (height > 600) ? '600px' : height + 'px');
}

// 应用主题
function applyTheme(theme: 'auto' | 'light' | 'dark') {
    const rootElm = document.documentElement;

    // 应用深色主题的函数
    const applyDarkTheme = () => {
        rootElm.classList.add('theme-dark');
        rootElm.classList.remove('theme-light');
        chrome.action.setIcon({
            path: {
                "16": "/icons/qbm16-dark.png",
                "32": "/icons/qbm32-dark.png"
            }
        });
    }

    // 应用浅色主题的函数
    const applyLightTheme = () => {
        rootElm.classList.add('theme-light');
        rootElm.classList.remove('theme-dark');
        chrome.action.setIcon({
            path: {
                "16": "/icons/qbm16.png",
                "32": "/icons/qbm32.png"
            }
        });
    }

    // 根据主题类型应用相应的主题
    switch (theme) {
        case 'light':
            applyLightTheme();
            break;
        case 'dark':
            applyDarkTheme();
            break;
        case 'auto':
        default:
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            const colorSchemeTest = (e: MediaQueryListEvent | MediaQueryList) => {
                if (e.matches) {
                    applyDarkTheme();
                } else {
                    applyLightTheme();
                }
            };
            mql.onchange = colorSchemeTest;
            colorSchemeTest(mql);
            break;
    }
}