import Container from '../../shared/components/Container';
import useFetchAllLinks from './hooks/useFetchAllLinks';
import Links from './links/Links';
import UserForm from './UserForm';

const Dashboard = () => {
    const { links, fetching, fetchError, refetch } = useFetchAllLinks();

    return (
        <div className='min-h-full flex-1 bg-violet-700 p-6'>
            <Container className="flex flex-col gap-16 py-8">
                <UserForm refetch={refetch}/>
                <Links links={links} fetching={fetching} fetchError={fetchError} refetch={refetch}/>
            </Container>


        </div>
    )
}

export default Dashboard