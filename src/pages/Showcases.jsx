import React from 'react'

const Showcases = () => {
    return (
        <>
            <div className="content">
                <div className="main-content">
                    <h2 className="heading-content">Showcases</h2>
                    <p className="text-content">Manage your DreamDraper platform</p>

                    <div className="table-content">
                        <div className="content-header">
                            <div className="search-align">
                                <img src="./images/search.svg" className="magnify" />
                                <input type="text" placeholder="Search User Name" className="search-content" />
                            </div>
                            <div className="content-right">

                                <img className="datepicker" src="./images/datepicker.svg" />
                                <a href="categoryShowcases.html"
                                    // style="text-decoration: none;"
                                    style={{
                                        textDecoration: 'none'
                                    }}
                                > <button type="button" className="template-upload"
                                    style={{
                                        width: "auto",
                                        justifyContent: 'center',
                                        gap: "6px"
                                    }}
                                // style="width: auto; justify-content: center; gap: 6px;"
                                >
                                        Category Manager
                                    </button></a>
                                <button type="button" className="template-upload"
                                    style={{
                                        width: 'auto',
                                        justifyContent: 'center',
                                        gap: '6px'
                                    }}
                                    // style="width: auto; justify-content: center; gap: 6px;"
                                    data-bs-toggle="modal" data-bs-target="#uploadTemplateModal">
                                    <img src="./images/white-plus.svg" className="template" /> Add Tutorial
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
                                                    width: '40px'
                                                }}
                                            // style="width: 40px;"
                                            >S.No.</th>
                                            <th className="table-expand">Title</th>
                                            <th className="table-expand">Category</th>
                                            <th className="table-expand">Date Added</th>
                                            <th className="table-expand">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>01</td>
                                            <td className="tutorials-data">Showcases 01</td>

                                            <td>Bedroom</td>
                                            <td className="main-cat">12/02/2025</td>


                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" style={{
                                                     display:'inline-block'
                                                }}
                                                //  onclick="openSuspendUser()" 
                                                />
                                                <img src="./images/del-solid.svg" className="icon-table" data-bs-toggle="modal"
                                                    data-bs-target="#deleteDesign" style={{
                                                     display:'inline-block'
                                                }}/>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>02</td>
                                            <td className="tutorials-data">Showcases 02</td>

                                            <td>Living Room</td>
                                            <td className="main-cat">10/02/2025</td>


                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table"  style={{
                                                     display:'inline-block'
                                                }}
                                                // onclick="openSuspendUser()"
                                                 />
                                                <img src="./images/del-solid.svg" className="icon-table" data-bs-toggle="modal"
                                                    data-bs-target="#deleteDesign" style={{
                                                     display:'inline-block'
                                                }}/>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>03</td>
                                            <td className="tutorials-data">Showcases 03</td>

                                            <td>Kitchen</td>
                                            <td className="main-cat">09/02/2025</td>


                                            <td>
                                                <img src="./images/editsolid.svg" className="icon-table" style={{
                                                     display:'inline-block'
                                                }}
                                                // onclick="openSuspendUser()"
                                                 />
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

export default Showcases
