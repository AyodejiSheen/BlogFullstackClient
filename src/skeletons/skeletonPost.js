import React from "react";
import { SkeltonElement } from "./baseElement";
import { Shimmer } from "./shimmer";


export const PostSkeleton = (props) => {

    let {theme } = props;

    const themeClass = theme || 'light'  //if they dont pass a theme them the or operator should me use of the light theme as default theme  

    return(
        <>
            <div className={`skeleton-wrapper ${themeClass} w-80`}>
                <div className="skeleton-post">
                    <SkeltonElement type={"title"}/>
                    <SkeltonElement type={"text"}/>
                    <SkeltonElement type={"text"}/>
                    <SkeltonElement type={"title"}/>
                </div>
                <Shimmer/>
            </div>
        
        </>
    )
}
