import React from 'react'

const MeasuringForms = () => {
    return (
        <>
            <div className="content">
                <div className="main-content">
                    <h2 className="heading-content">Measuring Forms</h2>
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
                                    width:'auto',
                                    justifyContent:'center',
                                    gap:'6px'
                                }}
                                    data-bs-toggle="modal" data-bs-target="#addmeasuringform">
                                    <img src="./images/white-plus.svg" className="template" /> Add Form
                                </button>
                            </div>
                        </div>
                        <div className="table-container">
                            <div className="scroll-table">
                                <table className="custom-table">
                                    <thead>
                                        <tr>
                                            <th 
                                            style={{
                                                width:'40px'
                                            }}
                                            >S.No.</th>
                                            <th className="table-expand" 
                                            style={{
                                                width:'324px'
                                            }}
                                            >Title</th>
                                            <th className="table-expand">Price</th>
                                            <th className="table-expand" 
                                            style={{
                                                width:'247px'
                                            }}
                                            >Description</th>
                                            <th className="table-expand">Date Added</th>
                                            <th className="table-expand" 
                                            style={{
                                                width:'115px'
                                            }}
                                            >Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>01</td>
                                            <td className="tutorials-data">Getting Started with DreamDraper</td>

                                            <td className="main-cat">1250</td>
                                            <td className="main-cat">Comprehensive set of window measuring printable forms in </td>
                                            <td className="nested-cat">12/02/2025</td>

                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editmeasuringform" style={{
                                                     display:'inline-block'
                                                }}/>
                                                <img src="./images/del-solid.svg" className="icon-table" data-bs-toggle="modal"
                                                    data-bs-target="#deleteDesign" style={{
                                                     display:'inline-block'
                                                }}/>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>02</td>
                                            <td className="tutorials-data">Advanced Space Planning Tips</td>

                                            <td className="main-cat">890</td>
                                            <td className="main-cat">Comprehensive set of window measuring printable forms in </td>
                                            <td className="nested-cat">10/02/2025</td>

                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editmeasuringform" style={{
                                                     display:'inline-block'
                                                }}/>
                                                <img src="./images/del-solid.svg" className="icon-table" data-bs-toggle="modal"
                                                    data-bs-target="#deleteDesign" style={{
                                                     display:'inline-block'
                                                }}/>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>03</td>
                                            <td className="tutorials-data">Color Coordination Guide</td>
                                            <td className="main-cat">456</td>
                                            <td className="main-cat">Comprehensive set of window measuring printable forms in </td>
                                            <td className="nested-cat">09/02/2025</td>

                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" data-bs-toggle="modal" data-bs-target="#editmeasuringform" style={{
                                                     display:'inline-block'
                                                }}/>
                                                <img src="./images/del-solid.svg" className="icon-table" data-bs-toggle="modal"
                                                    data-bs-target="#deleteDesign" style={{
                                                     display:'inline-block'
                                                }}/>
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

export default MeasuringForms
