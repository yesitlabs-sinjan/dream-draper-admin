import React from 'react'

const PlanManagement = () => {
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
                                <input type="text" placeholder="Search User Name" className="search-content" />
                            </div>
                            <div className="content-right">
                                <img className="datepicker" src="./images/datepicker.svg" />
                                <button type="button" className="template-upload"
                                    style={{
                                        width: '142px'
                                    }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#addplan">
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
                                                    data-bs-target="#editplan" style={{
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
                                        {/* <!-- Add more rows --> */}
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
        </>
    )
}

export default PlanManagement
