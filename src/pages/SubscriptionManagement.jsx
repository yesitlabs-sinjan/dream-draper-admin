import React, { useEffect, useRef, useState } from 'react'
import AddAndEditUser from '../components/Modals/AddAndEditUser'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/admin/slices/adminSlices'
import { getAllSubscribers } from '../redux/admin/slices/subscriberSlice'
import MyPicker from '../components/commanComponents/MyPicker'
import Pagination from '../components/commanComponents/Pagination';

const SubscriptionManagement = () => {
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
    }, [data, search, , dateRange, filterMode]);



    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString() : '---';

    const statusClass = (status) => {
        if (status === 'active' || status === 'paid') return 'paid';
        if (status === 'failed' || status !== 'paid' || status === null) return 'unpaid';
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


    return (
        <>
            <div className="content">
                <div className="main-content">
                    <h2 className="heading-content">Subscription Management</h2>
                    <p className="text-content">Manage your DreamDraper platform</p>

                    <div className="table-content">
                        <div className="content-header">
                            <div className="search-align">
                                <img src="./images/search.svg" className="magnify" />
                                <input type="text" placeholder="Search User Name" className="search-content" onChange={(e) => setSearch(e.target.value)} />
                            </div>
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
                                        <img src="./images/dropdown.svg" className="dropdown-arrow" />
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
                                <button type="button" className="template-upload"
                                    style={{
                                        width: 'auto',
                                        justifyContent: "center",
                                        gap: '6px'
                                    }}
                                    // style="width: auto; justify-content: center; gap: 6px;"
                                    data-bs-toggle="modal" data-bs-target="#editUserModal">
                                    <img src="./images/white-plus.svg" className="template" /> Add User
                                </button>
                            </div>
                        </div>
                        <div className="table-container manual-table">
                            <div className="scroll-table">
                                <table className="custom-table">
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
                                            <th className="table-expand">Date</th>
                                            <th className="table-expand">View Details</th>
                                            <th className="table-expand">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems && currentItems.length > 0 ? (
                                            currentItems.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>

                                                    <td>{item.User?.name || '---'}</td>
                                                    <td>{item.User?.username || '---'}</td>
                                                    <td>{item.User?.email || '---'}</td>
                                                    <td>{item.User?.phone || '---'}</td>

                                                    <td>{item.transaction_id || '---'}</td>

                                                    <td>
                                                        <button className={statusClass(item?.manual_suscribe ? item?.manual_suscribe : item.payment_status)}>
                                                            {item?.manual_suscribe ? item?.manual_suscribe : item.Transactions[0]?.status || '---'}
                                                        </button>
                                                    </td>

                                                    <td>{item.Plan?.plan_name || '---'}</td>

                                                    <td>{formatDate(item.start_date)}</td>

                                                    <td className="eye-td">
                                                        <a href="#" className="view-link">
                                                            View <img src="./images/solid-eye.svg" className="eye-img" />
                                                        </a>
                                                    </td>

                                                    <td>
                                                        {/* <img
                                                            src="./images/editsolid.svg"
                                                            className="icon-table"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editUserModal"
                                                        /> */}
                                                        <img
                                                            src="./images/del-solid.svg"
                                                            className="icon-table"
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="11" style={{ textAlign: 'center' }}>
                                                    No subscribers found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                    {/* <tbody>
                                        <tr className="rounded-tr">
                                            <td>01</td>
                                            <td>Darrell Steward</td>
                                            <td>Darrell@Steward01</td>
                                            <td>alma.lawson@example.com</td>
                                            <td>(270) 555-0117</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Monthly</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" style={{
                                                    display: 'inline-block'
                                                }} />
                                                <img src="./images/del-solid.svg" className="icon-table" style={{
                                                    display: 'inline-block'
                                                }}
                                                // onclick="opendeleteUser()"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>02</td>
                                            <td>Darlene Robertson</td>
                                            <td>Darlene@Robertson01</td>
                                            <td>tim.jennings@example.com</td>
                                            <td>(907) 555-0101</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Yearly</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" style={{
                                                    display: 'inline-block'
                                                }} />
                                                <img src="./images/del-solid.svg" className="icon-table" style={{
                                                    display: 'inline-block'
                                                }}
                                                // onclick="opendeleteUser()" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>03</td>
                                            <td>Kristin Watson</td>
                                            <td>Kristin@Watson01</td>
                                            <td>debra.holt@example.com</td>
                                            <td>(406) 555-0120</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Yearly</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" style={{
                                                    display: 'inline-block'
                                                }} />
                                                <img src="./images/del-solid.svg" className="icon-table" style={{
                                                    display: 'inline-block'
                                                }}
                                                // onclick="opendeleteUser()" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>04</td>
                                            <td>Bessie Cooper</td>
                                            <td>Bessie@Cooper01</td>
                                            <td>kenzi.lawson@example.com</td>
                                            <td>(319) 555-0115</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Monthly</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" style={{
                                                    display: 'inline-block'
                                                }} />
                                                <img src="./images/del-solid.svg" className="icon-table" style={{
                                                    display: 'inline-block'
                                                }}
                                                // onclick="opendeleteUser()" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>05</td>
                                            <td>Theresa Webb</td>
                                            <td>Theresa@Webb01</td>
                                            <td>willie.jennings@example.com</td>
                                            <td>(702) 555-0122</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Monthly</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" style={{
                                                    display: 'inline-block'
                                                }} />
                                                <img src="./images/del-solid.svg" className="icon-table" style={{
                                                    display: 'inline-block'
                                                }}
                                                // onclick="opendeleteUser()" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>06</td>
                                            <td>Kathryn Murphy</td>
                                            <td>Kathryn@Murphy01</td>
                                            <td>georgia.young@example.com</td>
                                            <td>(229) 555-0109</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Monthly</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" style={{
                                                    display: 'inline-block'
                                                }} />
                                                <img src="./images/del-solid.svg" className="icon-table" style={{
                                                    display: 'inline-block'
                                                }}
                                                //  onclick="opendeleteUser()" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>07</td>
                                            <td>Dianne Russell</td>
                                            <td>Dianne@Russell01</td>
                                            <td>michelle.rivera@example.com</td>
                                            <td>(209) 555-0104</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Yearly</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" />
                                                <img src="./images/del-solid.svg" className="icon-table"
                                                // onclick="opendeleteUser()"
                                                />
                                            </td>
                                        </tr>
                                        
                                    </tbody> */}
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
                                <table className="custom-table">
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
                                                        <button className={statusClass(item.payment_status)}>
                                                            {item.payment_status || '---'}
                                                        </button>
                                                    </td>

                                                    <td>{item.Plan?.plan_name || '---'}</td>

                                                    <td>{formatDate(item.start_date)}</td>

                                                    <td className="eye-td">
                                                        <a href="#" className="view-link">
                                                            View <img src="./images/solid-eye.svg" className="eye-img" />
                                                        </a>
                                                    </td>

                                                    <td>
                                                        <img
                                                            src="./images/editsolid.svg"
                                                            className="icon-table"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editUserModal"
                                                        />
                                                        <img
                                                            src="./images/del-solid.svg"
                                                            className="icon-table"
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="11" style={{ textAlign: 'center' }}>
                                                    No subscribers found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>



                                    {/* <tbody>
                                        <tr className="rounded-tr">
                                            <td>01</td>
                                            <td>Darrell Steward</td>
                                            <td>Darrell@Steward01</td>
                                            <td>alma.lawson@example.com</td>
                                            <td>(270) 555-0117</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Monthly</td>
                                            <td>Stripe</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" />
                                                <img src="./images/del-solid.svg" className="icon-table"
                                                //  onclick="opendeleteUser()" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>02</td>
                                            <td>Darlene Robertson</td>
                                            <td>Darlene@Robertson01</td>
                                            <td>tim.jennings@example.com</td>
                                            <td>(907) 555-0101</td>
                                            <td>---</td>
                                            <td><button className="trial">Trial</button></td>
                                            <td>Yearly</td>
                                            <td>Stripe</td>
                                            <td>---</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" />
                                                <img src="./images/del-solid.svg" className="icon-table"
                                                //  onclick="opendeleteUser()" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>03</td>
                                            <td>Kristin Watson</td>
                                            <td>Kristin@Watson01</td>
                                            <td>debra.holt@example.com</td>
                                            <td>(406) 555-0120</td>
                                            <td>---</td>
                                            <td><button className="unpaid">Failed</button></td>
                                            <td>Yearly</td>
                                            <td>Stripe</td>
                                            <td>---</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" />
                                                <img src="./images/del-solid.svg" className="icon-table"
                                                // onclick="opendeleteUser()"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>04</td>
                                            <td>Bessie Cooper</td>
                                            <td>Bessie@Cooper01</td>
                                            <td>kenzi.lawson@example.com</td>
                                            <td>(319) 555-0115</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Monthly</td>
                                            <td>Stripe</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" />
                                                <img src="./images/del-solid.svg" className="icon-table"
                                                //  onclick="opendeleteUser()" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>05</td>
                                            <td>Theresa Webb</td>
                                            <td>Theresa@Webb01</td>
                                            <td>willie.jennings@example.com</td>
                                            <td>(702) 555-0122</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Monthly</td>
                                            <td>Stripe</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" />
                                                <img src="./images/del-solid.svg" className="icon-table"
                                                // onclick="opendeleteUser()" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>06</td>
                                            <td>Kathryn Murphy</td>
                                            <td>Kathryn@Murphy01</td>
                                            <td>georgia.young@example.com</td>
                                            <td>(229) 555-0109</td>
                                            <td>TXN-001</td>
                                            <td><button className="paid">Paid</button></td>
                                            <td>Monthly</td>
                                            <td>Stripe9</td>
                                            <td>06-10-2025</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" />
                                                <img src="./images/del-solid.svg" className="icon-table"
                                                // onclick="opendeleteUser()" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>07</td>
                                            <td>Dianne Russell</td>
                                            <td>Dianne@Russell01</td>
                                            <td>michelle.rivera@example.com</td>
                                            <td>(209) 555-0104</td>
                                            <td>---</td>
                                            <td><button className="unpaid">Failed</button></td>
                                            <td>Yearly</td>
                                            <td>Stripe</td>
                                            <td>---</td>
                                            <td className="eye-td"><a href="#" className="view-link">View <img src="./images/solid-eye.svg"
                                                className="eye-img" /></a></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editUserModal" />
                                                <img src="./images/del-solid.svg" className="icon-table"
                                                //  onclick="opendeleteUser()"
                                                />
                                            </td>
                                        </tr>
                                      
                                    </tbody> */}
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
        </>
    )
}

export default SubscriptionManagement
