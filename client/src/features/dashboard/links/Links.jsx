import { FaLink, FaSearch } from 'react-icons/fa';

import LinkCard from './LinkCard';
import { Loader } from '../../../shared/components/Loader';
import { useMemo, useState } from 'react';

const Links = ({ links, fetching, fetchError, refetch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLinks = useMemo(() => {
        if (!searchTerm.trim()) return links;

        const term = searchTerm.toLowerCase().trim();
        return links.filter(link => link?.code?.toLowerCase().includes(term) || link?.target_url?.toLowerCase().includes(term));
    }, [links, searchTerm]);


    if (fetching) {
        return (
            <Loader size='md' className='mx-auto' />
        )
    }


    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>

                <h4 className='text-3xl text-white font-bold flex items-center gap-3'>Your Links <span className='text-2xl'><FaLink /></span></h4>
                <input type="search" name="search" placeholder='Search by Code or URL' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='bg-violet-500 outline-none border border-violet-400 text-white rounded-md py-1.5 px-3 min-w-[250px] focus:ring-2 focus:ring-white/40' />
            </div>
            {
                !fetching && fetchError && (
                    <div className='text-sm text-red-800 text-center'>{fetchError}</div>
                )
            }

            {
                filteredLinks.length > 0 ? (
                    <div className='flex flex-col gap-3'>
                        {
                            filteredLinks.map((link) => (
                                <LinkCard key={link?.code} link={link} refetch={refetch} />
                            ))
                        }
                    </div>
                ) : searchTerm ? (
                    <div className='text-violet-200 text-center py-8 rounded-xl bg-white/5'>
                        <FaSearch className="text-3xl mx-auto mb-2 opacity-50" />
                        <p className="font-semibold">No links found</p>
                        <p className="text-sm mt-1">No links match "{searchTerm}"</p>
                    </div>
                ) : (
                    <div className='text-violet-200 text-center py-8 rounded-xl bg-white/5'>
                        <FaLink className="text-3xl mx-auto mb-2 opacity-50" />
                        <p className="font-semibold">No links created yet</p>
                        <p className="text-sm mt-1">Create your first short link above!</p>
                    </div>
                )
            }
        </div>
    )
}

export default Links