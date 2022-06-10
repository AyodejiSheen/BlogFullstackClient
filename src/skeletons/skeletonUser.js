import React from "react";
import { SkeltonElement } from "./baseElement";


export const UserSkeleton = (props) => {

    let {theme} = props;

    const themeClass = theme || 'light'  // to select default as light in no theme is passed

    return(
        <>
            <div className={`skeleton-wrapper ${themeClass}`}>
                <div className="skeleton-profile">
                        <div>
                            <SkeltonElement type={"avatar"}/>
                        </div>

                        <div>
                            <SkeltonElement type={"title"}/>
                            <SkeltonElement type={"text"}/>
                            <SkeltonElement type={"text"}/>
                        </div>
                </div>
            </div>
        
        </>
    )
}
