import { h, Fragment } from 'preact';
import { useEffect, useState, useContext, useRef } from 'preact/hooks';
import { HideContext, NotifyContext, ConfigContext } from '../ContextWrapper';
import './ContextMenu.scss';

interface ContextMenuProps {
    removeBookmarksCallback: (id:string) => void;
};

interface Bookmark {
    id: string;
    title: string;
    url?: string;
    active: boolean;
};

type Position = [x: number, y: number];

export default function ContextMenu(props: ContextMenuProps) {
    const notify = useContext(NotifyContext);
    const setItemHide = useContext(HideContext);
    const [config] = useContext(ConfigContext);

    const [bookmark, setBookmark] = useState<Bookmark>({ id: '0', title: '', active: true });
    const [pos, setPos] = useState<Position>([0, 0]);
    const [show, setShow] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        let point: Position = [e.clientX, e.clientY];

        // get bookmark of the pos
        const elm = document.elementFromPoint(...point);
        if (!elm) {
            return;
        }
        const bmItem = elm.closest('.bookmark-item');
        if (!bmItem) {
            return;
        }
        const id = (bmItem as HTMLDivElement).dataset.id;
        if (!id) {
            return;
        }
        const active = !bmItem.matches('.bookmark-item-hide');
        chrome.bookmarks.get(id, results => {
            if (results.length === 0) {
                return;
            }
            let { id, title, url } = results[0];
            setBookmark({ id, title, url, active });
        })

        // make sure menu is not out of viewport
        let menu: any = menuRef.current;
        if (!menu || !menu.clientWidth || !menu.clientHeight) {
            menu = { clientWidth: 140, clientHeight: 150 };
        }
        const deltaX = window.innerWidth - menu.clientWidth - point[0];
        const deltaY = window.innerHeight - menu.clientHeight - point[1];
        if (deltaX <= 5) {
            point[0] = window.innerWidth - 5 - menu.clientWidth;
        }
        if (deltaY <= 5) {
            point[1] = window.innerHeight - 5 - menu.clientHeight;
        }
        setPos(point);

        if (!show) {
            setShow(true);
        }
    };

    const handleBlur = (e: Event) => {
        if (show) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleBlur);
        document.addEventListener('wheel', handleBlur);
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('click', handleBlur);
            document.removeEventListener('wheel', handleBlur);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
        // re register event listener when active is modified
    }, [show, menuRef]);

    const handleHideClick = () => {
        setItemHide(bookmark.id);
        notify({
            target: bookmark.title,
            action: bookmark.active ?
                chrome.i18n.getMessage("set_hidden") :
                chrome.i18n.getMessage("set_hidden_off")
        });
    };

    const handleOpenURL = (openIn: 'new' | 'background' | 'current') => {
        let active = false;
        switch (openIn) {
            case 'new':
                active = true;
            case 'background':
                chrome.tabs.create({ url: bookmark.url, active });
                if (config.doNotClose != 'background' && config.doNotClose != 'both') {
                    window.close();
                }
                break;
            case 'current':
            default:
                chrome.tabs.update({ url: bookmark.url });
                if (config.doNotClose != 'current' && config.doNotClose != 'both') {
                    window.close();
                }
                break;
        }
    };

    /*
    * 删除书签
    * */
    const removeBookmarks = () => {

        // 判断是否是文件夹
        if(bookmark.url){
            // 删除书签
            chrome.bookmarks.remove(bookmark.id, () => {
                // 更新收藏夹列表
                props.removeBookmarksCallback(bookmark.id);
            })
        }else{
            // 删除目录
            chrome.bookmarks.removeTree(bookmark.id, () => {
                // 更新收藏夹列表
                props.removeBookmarksCallback(bookmark.id);
            })
        }

    }

    return (
        <ul className={`context-menu ${show ? 'show' : 'hide'}`} style={{ top: pos[1], left: pos[0] }} ref={menuRef}>
            {
                // if url is undefined, the bookmark is a folder
                bookmark.url &&
                <>
                    <li onClick={() => handleOpenURL('new')}>{chrome.i18n.getMessage('menu_open_in_new')}</li>
                    <li onClick={() => handleOpenURL('current')}>{chrome.i18n.getMessage('menu_open_in_current')}</li>
                    <li onClick={() => handleOpenURL('background')}>{chrome.i18n.getMessage('menu_open_in_background')}</li>
                    <li className="divider"></li>
                </>
            }
            <li onClick={handleHideClick}>{bookmark.active ? chrome.i18n.getMessage('menu_hide') : chrome.i18n.getMessage('menu_show')}</li>
            <li onClick={removeBookmarks}>{chrome.i18n.getMessage(bookmark.url ? 'menu_remove_bookmarks' : 'menu_remove_bookmarks_tree')}</li>
        </ul>
    );
}