import { createLink, deleteLink, findLink, getAllLinks } from "../models/link.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateCode } from "../utils/generateCode.js";

export const createLinkController = asyncHandler(async (req, res) => {
    let { targetUrl, code } = req.body;

    const url = new URL(targetUrl);
    if(!url){
        throw new ApiError(400, "Invalid URL");
    }

    if(code){
        const exists = await findLink(code);
        if(exists){
            throw new ApiError(409, "Code already exists");
        }
    } else {
        let unique = false;
        while(!unique){
            code = generateCode();
            if(!(await findLink(code))){
                unique = true;
            }
        }
    }

    const newLink = await createLink(code, targetUrl);
    return res.status(201).json(
        new ApiResponse(201, newLink, "Link Created Successfully")
    );

})

export const getAllLinksController = asyncHandler(async (req, res) => {
    const links = await getAllLinks();
    return res.status(200).json(
        new ApiResponse(200, links, "All links fetched successfully")
    );

})


export const getLinksStatsController = asyncHandler(async (req, res) => {
    const { code } = req.params;
    const link = await findLink(code);

    if(!link){
        throw new ApiError(404, "Link not found");
    }

    return res.status(200).json(
        new ApiResponse(200, link, "Link Stats fetched successfully")
    );
})


export const deleteLinkController = asyncHandler(async (req, res) => {
    const { code } = req.params;
    const deleted = await deleteLink(code);
    if(!deleted){
        throw new ApiError(404, "Link not found");
    } 

    return res.status(200).json(
        new ApiResponse(200, deleted, "Link deleted successfully")
    );
})