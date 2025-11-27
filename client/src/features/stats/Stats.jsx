import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../shared/components/Container";
import { toast } from "react-toastify";
import { Loader } from "../../shared/components/Loader";
import { RiFileCopyFill } from "react-icons/ri";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";

const Stats = () => {
    const { code } = useParams();
    const [stats, setStats] = useState(null);

    const formatDate = (date) => {
        return date?.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'UTC'
        });
    }

    const lastClickedDate = stats?.last_clicked && new Date(stats?.last_clicked);
    const createdDate = stats?.created_at && new Date(stats?.created_at);
    

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/${stats?.code}`);
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

    useEffect(() => {
        async function load() {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/links/${code}`);
                const result = await response.json();
                if (result.success) {
                    setStats(result.data);
                }
                if (!result.success) {
                    console.log(result.message || "Something went wrong while fetching stats");
                    toast.error(result.message || "Something went wrong while fetching stats");
                }
            } catch (error) {
                console.log(error || error.message || "Something went wrong while fetching stats");
                toast.error(error || error.message || "Something went wrong while fetching stats");
            }

        }
        load();
    }, [code]);


    return (
        <div className="min-h-full flex-1 flex items-center justify-center bg-violet-700 p-6">
            <Container>
                {
                    !stats ? (
                        <div className="flex items-center justify-center">
                            <Loader size="md" />
                        </div>
                    ) : (
                        <div className='bg-white rounded-xl p-8 flex items-center justify-between gap-4'>
                            <div className='flex flex-col gap-4 w-full'>
                                <p className='flex items-center gap-2 text-violet-900'>
                                    <a href={`${import.meta.env.VITE_BASE_URL}/${stats?.code}`} target="_blank"  className='cursor-pointer text-2xl font-extrabold hover:underline'>{import.meta.env.VITE_BASE_HOSTNAME}/{stats?.code}</a>
                                    <span className='p-1 text-lg cursor-pointer rounded-sm hover:bg-violet-100' onClick={copyLink}><RiFileCopyFill /></span>
                                </p>
                                <p className='flex items-center gap-2'>
                                    <span><HiMiniArrowTurnDownRight /></span>
                                    <a href={stats?.target_url} target="_blank" className='font-semibold hover:underline cursor-pointer line-clamp-1'>{stats?.target_url}</a>
                                </p>
                                <div className="flex items-center gap-16 border-t border-zinc-300 pt-6">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-600">
                                        <p>Total clicks:</p>
                                        <span className="text-black font-bold">{stats?.total_clicks}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-600">
                                        <p>Last clicked:</p>
                                        <span className="text-black font-bold">
                                            {
                                                formatDate(lastClickedDate) || "NA"
                                            }
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-600">
                                        <p>Created At:</p>
                                        <span className="text-black font-bold">{formatDate(createdDate)}</span>
                                    </div>
                                </div>
                            </div>


                        </div>
                    )
                }


            </Container>
        </div>
    );
}

export default Stats;
