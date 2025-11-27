import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiFileCopyFill } from 'react-icons/ri';
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";
import { MdOutlineBarChart } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BASE_URL, BASE_HOSTNAME } from "../../../utils/constants";

const LinkCard = ({ link, refetch }) => {

    const date = link?.last_clicked && new Date(link?.last_clicked);
    const formattedDate = date?.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });

    const deleteLink = async (code) => {
        try {
            const response = await fetch(`${BASE_URL}/api/links/${code}`, { method: "DELETE" });
            const result = await response.json();

            if (!result.success) {
                console.log(result.message || "Something went wrong while deleting link");
                toast.error(result.message || "Something went wrong while deleting link");
            }
            if (result.success) {
                toast.success(result.message || "Link deleted successfully");
                refetch();
            }
        } catch (error) {
            console.log(error || error.message || "Something went wrong while deleting link");
            toast.error(error || error.message || "Something went wrong while deleting link");
        }


    }

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(`${BASE_URL}/${link?.code}`);
            toast.success("Copied to clipboard", {
                autoClose: 2000,
                hideProgressBar: true,
            });
        } catch (error) {
            toast.error(`Failed to copy link - ${error || error.message}`, {
                autoClose: 2000,
                hideProgressBar: true,
            });

        }
    }

    return (
        <div className='bg-white rounded-xl p-4 flex items-center justify-between gap-4'>
            <div className='flex flex-col gap-3 w-full'>
                <p className='flex items-center gap-2 text-violet-900'>
                    <a href={`${BASE_URL}/${link?.code}`} target="_blank" className='cursor-pointer font-extrabold hover:underline'>{BASE_HOSTNAME}/{link?.code}</a>
                    <span className='p-1 cursor-pointer rounded-sm hover:bg-violet-100' onClick={copyLink}><RiFileCopyFill /></span>
                </p>
                <p className='flex items-center gap-2'>
                    <span><HiMiniArrowTurnDownRight /></span>
                    <a href={link?.target_url} target="_blank" className='font-semibold hover:underline cursor-pointer line-clamp-1'>{link?.target_url}</a>
                </p>
                <div className="flex items-center gap-16 border-t border-zinc-300 pt-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-600">
                        <p>Total clicks:</p>
                        <span className="text-black font-bold">{link?.total_clicks}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-600">
                        <p>Last clicked:</p>
                        <span className="text-black font-bold">
                            {
                               formattedDate || "NA"
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <Link to={`/code/${link?.code}`} className='text-2xl text-violet-500 hover:bg-violet-100 p-2 rounded-md cursor-pointer '>
                    <MdOutlineBarChart />
                </Link>
                <div className='text-2xl text-violet-500 hover:bg-violet-100 p-2 rounded-md cursor-pointer ' onClick={() => deleteLink(link?.code)}>
                    <RiDeleteBin6Fill />
                </div>
            </div>


        </div>
    )
}

export default LinkCard