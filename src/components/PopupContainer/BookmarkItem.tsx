import {h} from "preact";
import {useContext} from "preact/hooks";
import {ConfigContext, NavContext} from "../ContextWrapper";
import "./BookmarkItem.scss";

export interface BookmarkItemProps {
    id: string;
    type: string;
    title: string;
    url: string | undefined;
    active: boolean;
}

const manifestObj = chrome.runtime.getManifest() || {};

export default function BookmarkItem(props: BookmarkItemProps) {
    const navigate = useContext(NavContext);
    const [config] = useContext(ConfigContext);
    const DEFAULT_FAVICON = 'data:image/ico;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAACAgAAABACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///zD9/f2W/f392P39/fn9/f35/f391/39/ZT+/v4uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v7+Cf39/Zn///////////////////////////////////////////39/ZX///8IAAAAAAAAAAAAAAAA/v7+Cf39/cH/////+v35/7TZp/92ul3/WKs6/1iqOv9yuFn/rNWd//j79v///////f39v////wgAAAAAAAAAAP39/Zn/////7PXp/3G3WP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP+Or1j//vDo///////9/f2VAAAAAP///zD/////+vz5/3G3V/9TqDT/WKo6/6LQkf/U6cz/1urO/6rUm/+Zo0r/8IZB//adZ////v7///////7+/i79/f2Y/////4nWzf9Lqkj/Vqo4/9Xqzv///////////////////////ebY//SHRv/0hUL//NjD///////9/f2U/f392v////8sxPH/Ebzt/43RsP/////////////////////////////////4roL/9IVC//i1jf///////f391/39/fr/////Cr37/wW8+/+16/7/////////////////9IVC//SFQv/0hUL/9IVC//SFQv/3pnX///////39/fn9/f36/////wu++/8FvPv/tuz+//////////////////SFQv/0hUL/9IVC//SFQv/0hUL/96p7///////9/f35/f392/////81yfz/CrL5/2uk9v///////////////////////////////////////////////////////f392P39/Zn/////ks/7/zdS7P84Rur/0NT6///////////////////////9/f////////////////////////39/Zb+/v4y//////n5/v9WYu3/NUPq/ztJ6/+VnPT/z9L6/9HU+v+WnfT/Ul7t/+Hj/P////////////////////8wAAAAAP39/Z3/////6Or9/1hj7v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v9sdvD////////////9/f2YAAAAAAAAAAD///8K/f39w//////5+f7/paz2/11p7v88Suv/Okfq/1pm7v+iqfX/+fn+///////9/f3B/v7+CQAAAAAAAAAAAAAAAP///wr9/f2d///////////////////////////////////////////9/f2Z/v7+CQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/jL9/f2Z/f392/39/fr9/f36/f392v39/Zj///8wAAAAAAAAAAAAAAAAAAAAAPAPAADAAwAAgAEAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAACAAQAAwAMAAPAPAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/g3+/v5X/f39mf39/cj9/f3q/f39+f39/fn9/f3q/f39yP39/Zn+/v5W////DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/iT9/f2c/f399f/////////////////////////////////////////////////////9/f31/f39mv7+/iMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/gn9/f2K/f39+////////////////////////////////////////////////////////////////////////////f39+v39/Yf///8IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v4k/f390v////////////////////////////////////////////////////////////////////////////////////////////////39/dD///8iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////MP39/er//////////////////////////+r05v+v16H/gsBs/2WxSf9Wqjj/Vqk3/2OwRv99vWX/pdKV/97u2P////////////////////////////39/ej+/v4vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/iT9/f3q/////////////////////+v15/+Pxnv/VKk2/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/36+Z//d7tf///////////////////////39/ej///8iAAAAAAAAAAAAAAAAAAAAAAAAAAD///8K/f390//////////////////////E4bn/XKw+/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1apN/+x0pv///////////////////////39/dD///8IAAAAAAAAAAAAAAAAAAAAAP39/Yv/////////////////////sdij/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/YKU1/8qOPv/5wZ////////////////////////39/YcAAAAAAAAAAAAAAAD+/v4l/f39+////////////////8Lgt/9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9utlT/n86N/7faqv+426v/pdKV/3u8ZP9UqDX/U6g0/3egN//jiUH/9IVC//SFQv/82MP//////////////////f39+v7+/iMAAAAAAAAAAP39/Z3////////////////q9Ob/W6w+/1OoNP9TqDT/U6g0/1OoNP9nskz/zOXC/////////////////////////////////+Dv2v+osWP/8YVC//SFQv/0hUL/9IVC//WQVP/++fb//////////////////f39mgAAAAD+/v4O/f399v///////////////4LHj/9TqDT/U6g0/1OoNP9TqDT/dblc//L58P/////////////////////////////////////////////8+v/3p3f/9IVC//SFQv/0hUL/9IVC//rIqf/////////////////9/f31////DP7+/ln////////////////f9v7/Cbz2/zOwhv9TqDT/U6g0/2KwRv/v9+z///////////////////////////////////////////////////////738//1kFT/9IVC//SFQv/0hUL/9plg///////////////////////+/v5W/f39nP///////////////4jf/f8FvPv/Bbz7/yG1s/9QqDz/vN2w//////////////////////////////////////////////////////////////////rHqP/0hUL/9IVC//SFQv/0hUL//vDn//////////////////39/Zn9/f3L////////////////R878/wW8+/8FvPv/Bbz7/y7C5P/7/fr//////////////////////////////////////////////////////////////////ere//SFQv/0hUL/9IVC//SFQv/718H//////////////////f39yP39/ez///////////////8cwvv/Bbz7/wW8+/8FvPv/WNL8///////////////////////////////////////0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//rIqv/////////////////9/f3q/f39+v///////////////we9+/8FvPv/Bbz7/wW8+/993P3///////////////////////////////////////SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/+cGf//////////////////39/fn9/f36////////////////B737/wW8+/8FvPv/Bbz7/33c/f//////////////////////////////////////9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/6xaX//////////////////f39+f39/e3///////////////8cwvv/Bbz7/wW8+/8FvPv/WdP8///////////////////////////////////////0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//vVv//////////////////9/f3q/f39y////////////////0bN/P8FvPv/Bbz7/wW8+/8hrvn/+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////39/cj9/f2c////////////////ht/9/wW8+/8FvPv/FZP1/zRJ6/+zuPf//////////////////////////////////////////////////////////////////////////////////////////////////////////////////f39mf7+/lr////////////////d9v7/B7n7/yB38f81Q+r/NUPq/0hV7P/u8P3////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v5X////D/39/ff///////////////9tkPT/NUPq/zVD6v81Q+r/NUPq/2Fs7//y8v7////////////////////////////////////////////09f7//////////////////////////////////////////////////f399f7+/g0AAAAA/f39n////////////////+Tm/P89Suv/NUPq/zVD6v81Q+r/NUPq/1Bc7f/IzPn/////////////////////////////////x8v5/0xY7P+MlPP////////////////////////////////////////////9/f2cAAAAAAAAAAD+/v4n/f39/P///////////////7W69/81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v9ZZe7/k5v0/6609/+vtff/lJv0/1pm7v81Q+r/NUPq/zVD6v+GjvL//v7//////////////////////////////f39+/7+/iQAAAAAAAAAAAAAAAD9/f2N/////////////////////6Cn9f81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v+BivL////////////////////////////9/f2KAAAAAAAAAAAAAAAAAAAAAP7+/gv9/f3V/////////////////////7W69/8+S+v/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/P0zr/7q/+P///////////////////////f390v7+/gkAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/ib9/f3r/////////////////////+Xn/P94gfH/NkTq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NkTq/3Z/8f/l5/z///////////////////////39/er+/v4kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/jL9/f3r///////////////////////////k5vz/nqX1/2p08P9IVez/OEbq/zdF6v9GU+z/aHLv/5qh9f/i5Pz////////////////////////////9/f3q////MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/ib9/f3V/////////////////////////////////////////////////////////////////////////////////////////////////f390v7+/iQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wr9/f2N/f39/P///////////////////////////////////////////////////////////////////////////f39+/39/Yv+/v4JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v4n/f39n/39/ff//////////////////////////////////////////////////////f399v39/Z3+/v4lAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v7+Dv7+/lr9/f2c/f39y/39/e39/f36/f39+v39/ez9/f3L/f39nP7+/ln+/v4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AA///AAD//AAAP/gAAB/wAAAP4AAAB8AAAAPAAAADgAAAAYAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABgAAAAcAAAAPAAAAD4AAAB/AAAA/4AAAf/AAAP/8AAP//wAP/';

    const hoverEnterSpeed = {
        slow: 750,
        medium: 450,
        fast: 200,
    };

    const openFolder = () => navigate("folder", props.id);
    const openUrl = (button: "left" | "middle") => {
        let openIn = "new";
        switch (button) {
            case "middle":
                openIn = config.openInMiddle;
                break;
            case "left":
                openIn = config.openIn;
                break;
            default:
                break;
        }

        let active = false;
        switch (openIn) {
            case "new":
                active = true;
            case "background":
                chrome.tabs.create({url: props.url, active});
                if (
                    config.doNotClose != "background" &&
                    config.doNotClose != "both"
                ) {
                    window.close();
                }
                break;
            case "current":
            default:
                chrome.tabs.update({url: props.url});
                if (
                    config.doNotClose != "current" &&
                    config.doNotClose != "both"
                ) {
                    window.close();
                }
                break;
        }
    };

    const handleClick = () => {
        switch (props.type) {
            case "folder":
                openFolder();
                break;
            case "link":
            case "manage":
            default:
                openUrl("left");
                break;
        }
    };

    let clickTimeout: number | null = null;
    const handleMouseOver = () => {
        if (config.hoverEnter === "off" || props.type != "folder") return;
        clickTimeout = setTimeout(
            () => openFolder(),
            hoverEnterSpeed[config.hoverEnter]
        );
    };

    const handleMouseOut = () => {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (e.button != 1) {
            // check if it is middle button
            return;
        }
        e.preventDefault();
        openUrl("middle");
    };

    const handleMouseDown = (e: MouseEvent) => {
        if (e.button === 1) {
            e.preventDefault();
        }
    };

    const getFaviconUrl = (pageUrl: string = "") => {
        const userAgent = navigator.userAgent || "";
        let faviconUrl = "";
        if (manifestObj.manifest_version === 2) {
            return "chrome://favicon/" + pageUrl;
        }
        if (userAgent.includes("Edg")) {
            // 说明当前浏览器是edge浏览器
            // manifest V3 写法，读取文件速度慢
            const orangeUrl = new URL(pageUrl).origin;
            faviconUrl = orangeUrl + "/favicon.ico";
        } else if (userAgent.includes("Chrome")) {
            // 说明当前浏览器是chrome浏览器
            /**
             * 只支持chrome浏览器获得favicon图标
             */
            const url = new URL(chrome.runtime.getURL("/_favicon/"));
            url.searchParams.set("pageUrl", pageUrl);
            url.searchParams.set("size", "32");
            faviconUrl = url.toString();
        } else {
            // 其他浏览器暂时不做兼容处理
            faviconUrl = "chrome://favicon/" + pageUrl;
        }

        return faviconUrl;
    };

    const defaultFavicon = (e: Event) => {
        (e.target as HTMLImageElement).src = DEFAULT_FAVICON;
    }

    return (
        <div
            className={`bookmark-item${
                !props.active ? " bookmark-item-hide" : ""
            } ${props.active || config.showHidden ? "show-flex" : "hide"}`}
            data-id={props.id}
        >
            <button
                className="bookmark-item-button"
                role="link"
                tabIndex={0}
                title={
                    props.type === "link" ? props.title + "\n" + props.url : ""
                }
                type={props.type}
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onWheel={handleMouseOut}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}
            >
                <img
                    title="favicon"
                    className={`bookmark-item-icon bookmark-item-icon-${props.type}`}
                    src={
                        props.type === "link"
                            ? getFaviconUrl(props.url)
                            : "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                    }
                    onError={defaultFavicon}
                />
                <span className="bookmark-item-text">{props.title}</span>
            </button>
        </div>
    );
}
