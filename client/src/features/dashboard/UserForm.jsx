import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { FaArrowRight } from "react-icons/fa";
import { BASE_URL } from '../../utils/constants';

const UserForm = ({refetch}) => {
    const [form, setForm] = useState({ targetUrl: "", code: "" });
    const [generating, setGenerating] = useState(false);

    const generateURL = async () => {
        if (generating || form.targetUrl === "") return;
        setGenerating(true);
        try {
            const response = await fetch(`${BASE_URL}/api/links`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            const result = await response.json();

            if (result.success) {
                toast.success(result.message || "Link generated successfully")
                refetch();
            }

            if (!result.success) {
                console.log(result);
                toast.error(result.message || "Something went wrong while generating URL");
            }


        } catch (error) {
            console.log(error);
            toast.error(error || error.message || "Something went wrong while generating URL")
        } finally {
            setGenerating(false);
            setForm({ targetUrl: "", code: "" })
        }
    }

    return (
        <div className='bg-violet-100 p-6 rounded-2xl w-2xl mx-auto shadow-xl'>
            <div className='mx-auto flex flex-col text-center mb-8'>
                <h3 className='text-2xl font-black '>Your Links, Made Short & Simple</h3>
                <p className='font-semibold text-zinc-500'>Paste a long URL and get a fast, reliable short link.</p>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="targetUrl" className='font-bold'>Paste your long link here</label>
                    <input type="text" value={form.targetUrl} onChange={(e) => setForm({ ...form, targetUrl: e.target.value })} name="targetUrl" id="targetUrl" placeholder='https://example.com/my-long-url' className='outline-none border border-zinc-400 rounded-md px-3 py-3 focus:ring-3 focus:ring-violet-300/60 focus:border-violet-700 focus:bg-violet-50' />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="code" className='font-bold text-zinc-600'>Custom Code (optional)</label>
                    <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} name="code" id="code" placeholder='aWRQ0sk' className='outline-none border border-zinc-400 rounded-md px-3 py-3 focus:ring-3 focus:ring-violet-300/60 focus:border-violet-700 focus:bg-violet-50' />
                    <p className='text-sm text-zinc-500 font-semibold'>Your custom code must be 6-8 characters. Only letters and numbers are allowed.</p>
                </div>

                <div>
                    <button disabled={generating} onClick={generateURL} type='button' className={`transition-all flex items-center gap-3  text-lg font-bold text-white rounded-md px-4 py-2 ${generating ? "cursor-not-allowed bg-zinc-500" : "bg-violet-600 hover:bg-violet-800 hover:scale-105 hover:shadow-md cursor-pointer"}`}>
                        <span>{generating ? "Generating..." : "Generate"}</span>
                        <span><FaArrowRight /></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserForm