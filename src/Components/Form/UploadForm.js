import React, { useState, useRef } from "react";

import folderIcon from "../../assets/folder.png";
import urlIcon from "../../assets/url.png";
import { motion } from "framer-motion";

import ReceivedResult from "../Result/ReceivedResult";
import Spinner from "../../UI/Spinner";

import classes from "./UploadForm.module.css";
import Errormsg from "../../UI/Errormsg";

const UploadForm = () => {
    //refs

    const urlRef = useRef();

    // variants and hover

    const hover = {
        rotate: [0, -18, 18, -18, 18, 0],
    };

    const urlFocus = {
        scale: 1.2,
        borderBottom: "3px solid black",
        boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
        transition: {
            type: "spring",
            duration: 0.1,
        },
    };

    // state handling

    //state for assigning css classes
    const [isUrl, setIsUrl] = useState(true);

    //state for getting image by upload
    const [getImage, setGetImage] = useState(null);

    //state for fetching data
    const [isLoading, setIsLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [receivedData, setReceivedData] = useState([]);
    const [error, setError] = useState(null);

    function photoHandler(event) {
        setIsUrl(false);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setGetImage(reader.result);
            }
        };
        reader.readAsDataURL(event.target.files[0]);

        if(getImage){
            console.log(getImage)
        }
    }

    if(getImage){
        console.log(getImage)
    }

    const urlHandler = () => {
        setIsUrl(true);
    };

    //http request

    async function fetchUrlHandler() {
        setError(null);
        setIsLoading(true);
        setDataFetched(false);
        try {
            const response = await fetch(
                `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(
                    `${urlRef.current.value}`
                )}`
            );

            if (!response.ok) {
                throw new Error("Request failed or Incorrect image url");
            }

            const data = await response.json();
            setReceivedData(data);
            setError(false);
            setIsLoading(false);
            setDataFetched(true);
        } catch (err) {
            setIsLoading(false);
            setDataFetched(false);
            setError(err.message);
            console.log(error);
        }

        urlRef.current.value = "";
    }

    return (
        <React.Fragment>
            <div className={classes.altButtons}>
                {/* add folder button  */}

                <div>
                    <input
                        type='file'
                        name='imageUpload'
                        id='input'
                        accept='image/*'
                        className={classes.fileInput}
                        onChange={photoHandler}
                    />
                    <label htmlFor='input'>
                        <motion.img
                            className={`${classes.optButton} ${
                                !isUrl && classes.optButtonActive
                            }`}
                            src={folderIcon}
                            whileHover={hover}
                            alt='folder Icon'
                        ></motion.img>
                    </label>
                </div>

                {/* url insert button  */}

                <div>
                    <motion.button
                        className={`${classes.optButton} ${
                            isUrl && classes.optButtonActive
                        }`}
                        onClick={urlHandler}
                        whileHover={hover}
                    >
                        <img
                            className={classes.upIcons}
                            src={urlIcon}
                            alt='attachment chain Icon'
                        ></img>
                    </motion.button>
                </div>
            </div>

            {/* rest of the form  */}

            <div className={classes.urlDiv}>
                <motion.input
                    className={`${classes.urlInput} ${
                        !isUrl && classes.cancel
                    }`}
                    placeholder='Image URL'
                    whileFocus={urlFocus}
                    ref={urlRef}
                />
            </div>
            <div className={classes.submit}>
                <button type='submit' onClick={fetchUrlHandler}>
                    Submit
                </button>
            </div>

            {/* spinner  and gotError msg*/}

            {isLoading === true && <Spinner />}

            {/* result */}
            <ReceivedResult
                items={receivedData}
                isLoading={isLoading}
                dataFetched={dataFetched}
                error={error}
                setDataFetched={setDataFetched}
            />

            <Errormsg gotError={error} setError={setError} />
        </React.Fragment>
    );
};

export default UploadForm;
