import { findLink, incrementClicks } from "../models/link.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const redirectController = asyncHandler(async (req, res) => {
    const { code } = req.params;
    const link = await findLink(code);

    if(!link){
        throw new ApiError(404, "Link not found for this code");
    }

    await incrementClicks(code);

    return res.redirect(302, link.target_url);
})