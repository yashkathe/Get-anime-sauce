import React from "react";

const AuthContext = React.createContext({
    hoverBtn: {
        rotate: [0, -18, 18, -18, 18, 0],
    },

    tap: { scale: 1.5 },

    urlFocus: {
        scale: 1.1,
        borderBottom: "3px solid black",
        boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
        transition: {
            type: "spring",
            duration: 0.1,
        },
    },

    submitBtnAnimate: {
        hover: {
            scale: 1.1,
            boxShadow: "1px 1px 10px rgba(0,0,0,0.5)",
            transition: {
                type: "tween",
            },
        },
    },

    backdropAnimation: {
        hidden: {
            opacity: 0,
            transition: { duration: 1 },
        },
        visible: {
            opacity: 1,
            transition: { duration: 1 },
        },
    },
    
    resultModal: {
        hidden: {
            y: "50vh",
        },
        visible: {
            y: "0vh",
            transition: { type: "tween", duration: 1 },
        },
        exit: {
            y: "50vh",
            transition: { duration: 1 },
        },
    },
});

export default AuthContext;
