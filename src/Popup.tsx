import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import ContextWrapper, { Configuration, Message, Page } from './components/ContextWrapper';
import PopupHeader from './components/PopupHeader';
import PopupContainer from './components/PopupContainer';
import PopupFooter from './components/PopupFooter';
import ContextMenu from './components/ContextMenu';
import './Popup.scss';

interface PopupProps {
    config: Configuration
}

function Popup(props: PopupProps) {
    const [config, setConfig] = useState(props.config);
    const [page, setPage] = useState<Page>({ type: 'folder', key: config.startup[0] });
    const [msgs, setMsgs] = useState<Message[]>([]);
    const [hidden, setHidden] = useState(config.hidden);
    const [removeBookmarksId, setRemoveBookmarksId] = useState('');

    const navigate = (type: Page["type"], key: Page["key"]) => {
        setPage({ type, key });
    };

    const notify = (msg: Message) => {
        setMsgs([...msgs, msg]);
    };

    const clearMsg = () => {
        setMsgs([]);
    };

    const setItemHide = (key: string) => {
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

// load config and render popup
chrome.storage.local.get(['openIn', 'openInMiddle', 'doNotClose', 'hoverEnter', 'startup', 'root', 'theme', 'scroll', 'hidden', 'showHidden'], (result: Partial<Configuration>) => {
    adjustHeight((result as Configuration).startup[1]);
    render(<Popup config={result as Configuration} />, document.body);
});

function adjustHeight(length: number) {
    const rootStyle = document.documentElement.style;
    const height = (length + 2) * 30;
    rootStyle.setProperty('--startup-height', (height > 600) ? '600px' : height + 'px');
}

function applyTheme(theme: 'auto' | 'light' | 'dark') {
    const rootElm = document.documentElement;

    const applyDarkTheme = () => {
        rootElm.classList.add('theme-dark');
        rootElm.classList.remove('theme-light');
        chrome.browserAction.setIcon({
            path: {
                "16": "/icons/qbm16-dark.png",
                "32": "/icons/qbm32-dark.png"
            }
        });
    }

    const applyLightTheme = () => {
        rootElm.classList.add('theme-light');
        rootElm.classList.remove('theme-dark');
        chrome.browserAction.setIcon({
            path: {
                "16": "/icons/qbm16.png",
                "32": "/icons/qbm32.png"
            }
        });
    }

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