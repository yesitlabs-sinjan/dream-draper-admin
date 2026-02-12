import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyPicker from '../components/commanComponents/MyPicker'
import Pagination from '../components/commanComponents/Pagination'
import AddAndEditUser from '../components/Modals/AddAndEditUser'
import DeleteModal from '../components/Modals/DeleteModal'
import SearchBox from '../components/table/SearchBox'
import useTableSort from '../hooks/useTableSort'
import { registerUser } from '../redux/admin/slices/adminSlices'
import { getAllSubscribers, removeSubscriber } from '../redux/admin/slices/subscriberSlice'
import { formatDateUSA } from '../utils/healper/dateHelper'

const SubscriptionManagement = () => {
    // table ref to apply sorting functionality for manual subscription
    const manualTableRef = useTableSort({ excludeColumns: [7] });
    // table ref to apply sorting functionality for automatic subscription
    const autoTableRef = useTableSort({ excludeColumns: [8, 10, 11] });
    const dispatch = useDispatch();
    const hasFetched = useRef(false);
    const { allSubscribers } = useSelector((state) => state.subscriber);
    const [data, setData] = useState([]);
    const [changeMode, setChangeMode] = useState(true);
    const [filterMode, setFilterMode] = useState('manual')
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(null)
    const [search, setSearch] = useState('')
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
    const [selectedId, setSelectedId] = useState(null);
    const itemsPerPage = 10;
    const handleSubmit = async (values) => {
        const res = await dispatch(registerUser(values))
        console.log("Here is the data for save", res)
    }
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        dispatch(getAllSubscribers())
    }, []);
    useEffect(() => {
        if (allSubscribers) {
            setData(allSubscribers)
        }
    }, [allSubscribers])


    useEffect(() => {
        const showcases = Array.isArray(data) ? data : [];
        let filtered = [...showcases];
        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter(item =>
                item?.User?.name?.toLowerCase().includes(term)
                || item?.User?.email?.toLowerCase().includes(term)
                || item?.User?.phone?.toLowerCase().includes(term)
            );
        }
        if (dateRange.startDate && dateRange.endDate) {
            const start = new Date(dateRange.startDate).setHours(0, 0, 0, 0);
            const end = new Date(dateRange.endDate).setHours(23, 59, 59, 999);
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.start_date).getTime();
                return itemDate >= start && itemDate <= end;
            });
        }
        // 🔁 Manual / Auto filter
        if (filterMode === 'manual') {
            filtered = filtered.filter(
                item => item?.manual_suscribe !== null
            );
        }

        if (filterMode === 'auto') {
            filtered = filtered.filter(
                item => item?.manual_suscribe === null
            );
        }

        setFilteredData(filtered);
        setCurrentPage(1)
    }, [data, search, dateRange, filterMode]);


    const statusClass = (status) => {

        if (status === 'active' || status === 'paid') return 'paid';
        if (status === 'failed' || status !== 'paid' || status == null) return 'unpaid';
        return 'trial';
    };

    const handleSwitch = (mode) => {
        if (mode == 'manual') {
            setChangeMode(true);
            setFilterMode('manual')
        }
        if (mode == 'auto') {
            setChangeMode(false);
            setFilterMode('auto')
        }
    }

    const handleRange = (startDate, endDate) => {
        setDateRange({ startDate, endDate });
    };


    const totalItems = filteredData?.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData?.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        if (currentItems)
            console.log("sub currentItems: ", currentItems)
    }, [currentItems]);

    const handleResetForm = () => { }

    // const handleDelete = (id) => {
    //     console.log("Id for delete", id)
    //     dispatch(removeSubscriber(id));
    //     dispatch(getAllSubscribers());
    // };

    const handleDelete = () => {
        if (!selectedId) return;

        dispatch(removeSubscriber(selectedId));
        dispatch(getAllSubscribers());
    };


    const openDeleteModal = (id) => {
        setSelectedId(id);
    };

    return (
        <>
            <div className="content">
                <div className="main-content">
                    <h2 className="heading-content">Subscription Management</h2>
                    <p className="text-content">Manage your DreamDraper platform</p>

                    <div className="table-content">
                        <div className="content-header">
                            {/* <div className="search-align">
                                <img src="./images/search.svg" className="magnify" />
                                <input type="text" placeholder="Search User Name" className="search-content" onChange={(e) => setSearch(e.target.value)} />
                            </div> */}
                            <SearchBox search={search} setSearch={setSearch} placeholder="Search User" />
                            <div className="content-right">
                                <div className="manual-auto-toggle">
                                    <button className={`manual-auto-btn ${changeMode ? 'active' : ''}`} id="manual-option" onClick={() => handleSwitch('manual')}>Manual</button>
                                    <button className={`manual-auto-btn ${changeMode ? '' : 'active'}`} id="automatic-option" onClick={() => handleSwitch('auto')}>Automatic</button>
                                </div>
                                <div className="dropdown">
                                    <div className="status-btn"
                                    //  onclick="toggleDropdown()"
                                    >
                                        <span id="label">Status</span>
                                        <img src="./images/dropdown.svg" className="dropdown-arrow" alt='dropdown icon' />
                                    </div>
                                    <div className="menu" id="dropdownMenu"
                                        style={{
                                            zIndex: 7
                                        }}
                                    // style="z-index: 7;"
                                    >
                                        <div
                                        // onclick="selectOption('Pending')"
                                        >
                                            Pending</div>
                                        <div
                                        // onclick="selectOption('Approved')"
                                        >Approved</div>
                                        <div
                                        // onclick="selectOption('Rejected')"
                                        >Rejected</div>
                                    </div>
                                </div>
                                {/* <img className="datepicker" src="./images/datepicker.svg" /> */}
                                <MyPicker handleDateFilter={handleRange} />
                                {filterMode !== 'auto' && (
                                    <button type="button" className="template-upload"
                                        style={{
                                            width: 'auto',
                                            justifyContent: "center",
                                            gap: '6px'
                                        }}
                                        // style="width: auto; justify-content: center; gap: 6px;"
                                        data-bs-toggle="modal" data-bs-target="#editUserModal">
                                        <img src="./images/white-plus.svg" className="template" alt='edit icon' /> Add User
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="table-container manual-table">
                            <div className="scroll-table">
                                <table ref={manualTableRef} className="custom-table">
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th className="table-expand">Name</th>
                                            {/* <th className="table-expand">Username</th> */}
                                            <th className="table-expand">Email ID</th>
                                            <th className="table-expand">Phone Number</th>
                                            {/* <th className="table-expand">Transaction ID</th> */}
                                            <th className="table-expand">Status</th>
                                            <th className="table-expand">Plan</th>
                                            <th className="table-expand">Date</th>
                                            {/* <th className="table-expand">View Details</th> */}
                                            <th className="table-expand">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems && currentItems.length > 0 ? (
                                            currentItems.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>

                                                    <td>{item.User?.name || '---'}</td>
                                                    {/* <td>{item.User?.username || '---'}</td> */}
                                                    <td>{item.User?.email || '---'}</td>
                                                    <td>{item.User?.phone || '---'}</td>

                                                    {/* <td>{item.transaction_id || '---'}</td> */}

                                                    <td>
                                                        <button className={statusClass(item?.manual_suscribe ? item?.manual_suscribe : item.payment_status)}>
                                                            {item?.manual_suscribe ? item?.manual_suscribe.trim().toUpperCase() : item.Transactions[0]?.status.trim().toUpperCase() || '---'}
                                                        </button>
                                                    </td>

                                                    <td>{item.Plan?.plan_name?.replace('Subscription', '').trim() || '---'}</td>

                                                    <td>{formatDateUSA(item.start_date)}</td>

                                                    {/* <td className="eye-td">
                                                        <a href="#" className="view-link">
                                                            View <img src="./images/solid-eye.svg" className="eye-img" alt='eye icon'/>
                                                        </a>
                                                    </td> */}

                                                    <td>
                                                        {/* <img
                                                            src="./images/editsolid.svg"
                                                            className="icon-table"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editUserModal"
                                                        /> */}
                                                        <button
                                                            type='button'
                                                            className='bg-transparent border-0'
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#deleteDesign"
                                                            onClick={() => openDeleteModal(item.id)}
                                                        >
                                                            <img
                                                                src="./images/del-solid.svg"
                                                                className="icon-table"
                                                                alt='delete icon'
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="11" style={{ textAlign: 'center' }}>
                                                    No data found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* <!-- Pagination --> */}
                            <Pagination
                                currentPage={currentPage}
                                totalItems={totalItems}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />

                        </div>

                        <div className="table-container automatic-table"
                            style={{
                                display: 'none'
                            }}
                        // style="display: none;"
                        >
                            <div className="scroll-table">
                                <table ref={autoTableRef} className="custom-table">
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th className="table-expand">Name</th>
                                            <th className="table-expand">Username</th>
                                            <th className="table-expand">Email ID</th>
                                            <th className="table-expand">Phone Number</th>
                                            <th className="table-expand">Transaction ID</th>
                                            <th className="table-expand">Status</th>
                                            <th className="table-expand">Plan</th>
                                            <th className="table-expand">Payment Method</th>
                                            <th className="table-expand">Date</th>
                                            <th className="table-expand">View Details</th>
                                            <th className="table-expand">Action</th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                        {data && data.length > 0 ? (
                                            data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>

                                                    <td>{item.User?.name || '---'}</td>
                                                    <td>{item.User?.username || '---'}</td>
                                                    <td>{item.User?.email || '---'}</td>
                                                    <td>{item.User?.phone || '---'}</td>

                                                    <td>{item.transaction_id || '---'}</td>

                                                    <td>
                                                        {/* <button className={statusClass(item.payment_status, true)}>
                                                            {item.payment_status?.toUpperCase().trim() || '---'}
                                                        </button> */}
                                                        <button className={statusClass(item?.manual_suscribe != null ? item?.manual_suscribe : item.payment_status)}>
                                                            {item?.manual_suscribe != null ? item?.manual_suscribe.trim().toUpperCase() : item.Transactions[0]?.status.trim().toUpperCase() || '---'}
                                                        </button>
                                                    </td>

                                                    <td>{item.Plan?.plan_name?.replace('Subscription', '').trim() || '---'}</td>

                                                    <td>{formatDateUSA(item.start_date)}</td>

                                                    <td className="eye-td">
                                                        <a href="#" className="view-link">
                                                            View <img src="./images/solid-eye.svg" className="eye-img" alt='eye icon' />
                                                        </a>
                                                    </td>

                                                    <td>
                                                        <img
                                                            src="./images/editsolid.svg"
                                                            className="icon-table"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editUserModal"
                                                            alt='edit icon'
                                                        />
                                                        <img
                                                            src="./images/del-solid.svg"
                                                            className="icon-table"
                                                            alt='delete button'
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="11" style={{ textAlign: 'center' }}>
                                                    No data found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* <!-- Pagination --> */}
                            <div className="pagination">
                                <button>&laquo;</button>
                                <button>&lt;</button>
                                <button className="active">1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>...</button>
                                <button>10</button>
                                <button>&gt;</button>
                                <button>&raquo;</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <AddAndEditUser onSubmit={handleSubmit} />
            <DeleteModal onClose={handleResetForm}
                onConfirm={handleDelete} type={'subscription'} />
        </>
    )
}

export default SubscriptionManagement
