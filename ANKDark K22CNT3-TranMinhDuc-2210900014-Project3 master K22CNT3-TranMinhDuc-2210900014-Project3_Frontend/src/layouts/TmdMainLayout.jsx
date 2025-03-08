import { Outlet } from 'react-router-dom';
import TmdHeader from '../components/users/TmdHeader'
import TmdSidebar from '../components/users/TmdSidebar'

export default function TmdMainLayout() {
    return (
        <div className='d-flex flex-row bg-dark'>
            <TmdSidebar />
            <div className='w-100'>
                <TmdHeader />
                <Outlet />
            </div>
        </div>
    )
}
