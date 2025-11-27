import React, { useEffect, useState } from 'react'
import Container from '../../shared/components/Container'
import { toast } from 'react-toastify';
import { Loader } from '../../shared/components/Loader';

const HealthCheck = () => {
    const [healthStats, setHealthStats] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/healthz`);
                const result = await response.json();
                if (result.success) {
                    setHealthStats(result.data);
                }
                if (!result.success) {
                    console.log(result.message || "Something went wrong while fetching Health stats");
                    toast.error(result.message || "Something went wrong while fetching Health stats");
                }
            } catch (error) {
                console.log(error || error.message || "Something went wrong while fetching Health  stats");
                toast.error(error || error.message || "Something went wrong while fetching Health  stats");
            }

        }
        load();
    }, [])


    return (
        <div className='min-h-full flex-1 flex justify-center items-center bg-violet-100 p-6'>
            <Container>
                {
                    !healthStats ? (
                        <div className='flex justify-center'>
                            <Loader size='md' />
                        </div>
                    ) : (
                        <div className='flex flex-col gap-6 text-black'>
                            <p className='text-2xl font-bold'>Status : <span className='text-green-500'>{healthStats?.status?.toUpperCase()}</span></p>

                            <div className='flex flex-col gap-2'>
                                <h4 className='font-bold text-lg'>System Information</h4>
                                <div className='flex flex-col gap-1.5'>
                                    <Info title="Platform:" value={healthStats?.system?.platform} />
                                    <Info title="Architecture:" value={healthStats?.system?.arch} />
                                    <Info title="Hostname:" value={healthStats?.system?.hostname} />
                                    <Info title="CPUs:" value={healthStats?.system?.cpus} />
                                    <Info title="CPU Model:" value={healthStats?.system?.cpuModel} />
                                    <Info title="Total Memory:" value={healthStats?.system?.totalMemory} />
                                    <Info title="Node Version:" value={healthStats?.system?.nodeVersion} />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <h4 className='font-bold text-lg'>Uptime Information</h4>
                                <div>
                                    <Info title="Process Uptime:" value={healthStats?.uptime?.processUptime} />
                                    <Info title="System Uptime:" value={healthStats?.uptime?.systemUptime} />
                                    <Info title="Process Uptime Human:" value={healthStats?.uptime?.processUptimeHuman} />
                                    <Info title="System Uptime Human:" value={healthStats?.uptime?.systemUptimeHuman} />
                                </div>
                            </div>
                        </div>
                    )
                }

            </Container>
        </div>
    )
}

const Info = ({ title, value }) => {
    return (
        <div className='flex items-center gap-3 font-semibold'>
            <p className='text-zinc-600'>{title}</p>
            <p>{value}</p>
        </div>
    )
}

export default HealthCheck