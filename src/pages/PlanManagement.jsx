import React, { useEffect, useRef, useState } from 'react'
import AddEditPlanManagement from '../components/Modals/AddEditPlanManagement'
import ViewFeatures from '../components/ViewFeatures'
import ActiveAndInActiveModal from '../components/Modals/ActiveAndInActiveModal'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPlans, getPlans, updatePlansDaitls } from '../redux/admin/slices/planSlices'
import DeleteModal from '../components/Modals/DeleteModal'
import Pagination from '../components/commanComponents/Pagination'
import MyPicker from '../components/commanComponents/MyPicker'
import { activeInActiveCategories, deleteDate } from '../redux/admin/slices/libraryCategorySlice'

const PlanManagement = () => {
    const hasFetched = useRef(false);
    const dispatch = useDispatch();
    const { allPlans, loading } = useSelector((state) => state.plans);
    const [plans, setPlans] = useState([]);
    const [selectedData, setSelectedData] = useState(null)
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        dispatch(getPlans())
    }, [])

    useEffect(() => {
        if (allPlans) {
            setPlans(allPlans)
        }
    }, [allPlans])

    console.log("allPlans", allPlans)


    useEffect(() => {
        let filtered = Array.isArray(plans) ? [...plans] : [];
        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter(item =>
                item?.plan_name?.toLowerCase().includes(term)
            );
        }
        if (dateRange.startDate && dateRange.endDate) {
            const start = new Date(dateRange.startDate).setHours(0, 0, 0, 0);
            const end = new Date(dateRange.endDate).setHours(23, 59, 59, 999);
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.createdAt).getTime();
                return itemDate >= start && itemDate <= end;
            });
        }
        setFilteredData(filtered);
        setCurrentPage(1)
    }, [plans, search, dateRange]);

    const totalItems = filteredData?.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleSubmit = async (values) => {
        console.log("values", values)
        values.id ? await dispatch(updatePlansDaitls(values)) :
            await dispatch(addNewPlans(values))
        await dispatch(getPlans())
        setSelectedData(null)
    }
    const handlePopup = () => {
        setSelectedData(null)
    }
    const handleActiveConfirm = async () => {
        try {
            await dispatch(activeInActiveCategories({ id: selectedData.id, type: 'plan' }));
            await dispatch(getPlans())
            setSelectedData(null);
        } catch (error) {
            console.log("error from Category page", error)
        }
    }

    const handleResetForm = () => {
        setSelectedData(null);
    }

    const handleDelete = async () => {
        try {
            await dispatch(deleteDate({ id: selectedData.id, type: 'plan' }))
            await dispatch(getPlans())
            setSelectedData(null);
        } catch (error) {
            console.log("error from Category page", error)
        }
    }

    const handleRange = (startDate, endDate) => {
        setDateRange({ startDate, endDate });
    };
    return (
        <>
            <div className="content">
                <div className="main-content">
                    <h2 className="heading-content">Plan Management</h2>
                    <p className="text-content">Manage your DreamDraper platform</p>
                    <div className="table-content">
                        <div className="content-header">
                            <div className="search-align">
                                <img src="./images/search.svg" className="magnify" />
                                <input type="text" placeholder="Search plans" className="search-content" onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className="content-right">
                                {/* <img className="datepicker" src="./images/datepicker.svg" /> */}
                                <MyPicker handleDateFilter={handleRange} />
                                <button type="button" className="template-upload"
                                    style={{
                                        width: '142px'
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#addplan" onClick={handlePopup}>
                                    <img src="./images/templateUpload.svg" className="template" /> Add New Plan
                                </button>
                            </div>
                        </div>
                        <div className="table-container">
                            <div className="scroll-table">
                                <table className="custom-table">
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th className="profile-pic">Plan Name</th>
                                            <th className="table-expand">Pricing</th>
                                            <th className="table-expand">Subscribers</th>
                                            <th className="table-expand">Features</th>
                                            <th className="table-expand">Status</th>
                                            <th className="table-expand">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="7" style={{ textAlign: "center" }}>
                                                    Loading...
                                                </td>
                                            </tr>
                                        ) : currentItems.length > 0 ? (
                                            currentItems.map((plan, index) => (
                                                <tr key={plan.id}>
                                                    <td>{String(index + 1).padStart(2, "0")}</td>

                                                    <td className="tempName">{plan.plan_name}</td>

                                                    <td>
                                                        {plan.price === 0
                                                            ? "$0/month"
                                                            : `$${plan.price}/${plan.duraction}`}
                                                    </td>

                                                    <td className="main-cat">
                                                        {plan.subscribers?.length || 0}
                                                    </td>

                                                    <td className="eye-td">
                                                        <a
                                                            href="#"
                                                            className="view-link"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#featuresPopupModal"
                                                            onClick={() => setSelectedData(plan)}
                                                        >
                                                            View{" "}
                                                            <img
                                                                src="./images/solid-eye.svg"
                                                                className="eye-img"
                                                                alt="view"
                                                            />
                                                        </a>
                                                    </td>

                                                    <td>
                                                        {/* <button
                                                            className="status-btn-library"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#activateTemplateModal"
                                                            onClick={() => setSelectedData(plan)}
                                                        >
                                                            {plan.is_active ? "Active" : "Inactive"}
                                                        </button> */}

                                                        <button
                                                            className="status-btn-library"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#activateTemplateModal"
                                                            style={
                                                                plan.is_active == 1
                                                                    ? {}
                                                                    : { background: "#4B5563", width: "69px" }
                                                            }
                                                            onClick={() => setSelectedData(plan)}
                                                        >
                                                            {plan.is_active == 1 ? "Active" : "Inactive"}
                                                        </button>


                                                    </td>

                                                    <td>
                                                        <img
                                                            src="./images/editsolid.svg"
                                                            className="icon-table"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#addplan"
                                                            style={{ display: "inline-block" }}
                                                            alt="edit"
                                                            onClick={() => setSelectedData(plan)}
                                                        />
                                                        <img
                                                            src="./images/del-solid.svg"
                                                            className="icon-table"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#deleteDesign"
                                                            style={{ display: "inline-block" }}
                                                            alt="delete"
                                                            onClick={() => setSelectedData(plan)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" style={{ textAlign: "center" }}>
                                                    No plans found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                    {/* <tbody>
                                        <tr>
                                            <td>01</td>
                                            <td className="tempName">Monthly Subscription</td>

                                            <td>$0/month</td>
                                            <td className="main-cat">3,420</td>
                                            <td className="eye-td">
                                                <a href="#" className="view-link" data-bs-toggle="modal" data-bs-target="#featuresPopupModal">
                                                    View <img src="./images/solid-eye.svg" className="eye-img" />
                                                </a>
                                            </td>
                                            <td><button className="status-btn-library" data-bs-toggle="modal"
                                                data-bs-target="#activateTemplateModal"> Active</button></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal"
                                                    data-bs-target="#addplan" style={{
                                                        display: 'inline-block'
                                                    }} />
                                                <img src="./images/del-solid.svg" className="icon-table" data-bs-toggle="modal"
                                                    data-bs-target="#deleteDesign" style={{
                                                        display: 'inline-block'
                                                    }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>02</td>
                                            <td className="tempName">Annual Subscription</td>

                                            <td>$99/year</td>
                                            <td className="main-cat">1,250</td>
                                            <td className="eye-td">
                                                <a href="#" className="view-link" data-bs-toggle="modal" data-bs-target="#featuresPopupModal">
                                                    View <img src="./images/solid-eye.svg" className="eye-img" />
                                                </a>
                                            </td>
                                            <td><button className="status-btn-library" data-bs-toggle="modal"
                                                data-bs-target="#activateTemplateModal"> Active</button></td>
                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal"
                                                    data-bs-target="#editplan" style={{
                                                        display: 'inline-block'
                                                    }} />
                                                <img src="./images/del-solid.svg" className="icon-table" data-bs-toggle="modal"
                                                    data-bs-target="#deleteDesign" style={{
                                                        display: 'inline-block'
                                                    }} />
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
                            {/* <div className="pagination">
                                <button>&laquo;</button>
                                <button>&lt;</button>
                                <button className="active">1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>...</button>
                                <button>10</button>
                                <button>&gt;</button>
                                <button>&raquo;</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <AddEditPlanManagement initialData={selectedData} onSubmit={handleSubmit} />
            <ViewFeatures initialData={selectedData} />
            <ActiveAndInActiveModal onClose={handleResetForm}
                onConfirm={handleActiveConfirm} item={selectedData}
                type={'plan'}
            />
            <DeleteModal onClose={handleResetForm}
                onConfirm={handleDelete} type={'plan'} />
        </>
    )
}

export default PlanManagement