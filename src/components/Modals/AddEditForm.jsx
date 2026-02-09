import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const AddEditForm = ({ initialValues = null, onSubmit }) => {
    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        setFileData(null);
    }, [initialValues]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: initialValues?.id || null,
            title: initialValues?.title || '',
            fileData: null,
            description: initialValues?.description || '',
            price: initialValues?.price || '',
            is_active: initialValues?.is_active ?? 1, 
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            price: Yup.number().min(1, 'Price must be 0 or more').required('Price is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();
                ["title", "description", "price", "is_active"].forEach((field) => {
                    formData.append(field, values[field] ?? '');
                });
                if (values.id) formData.append('id', values.id);
                if (fileData) formData.append('formFile', fileData);

                await onSubmit(formData); // parent/backend submission

                // Reset form and file
                resetForm();
                setFileData(null);
                // if (onClose) onClose(); // close modal manually
            } catch (err) {
                console.error('Error submitting form:', err);
            }
        }

    });

    return (
        <div className="modal fade" id="addmeasuringform" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: '462px' }}>
                <div className="modal-content upload-template-popup">
                    <div className="modal-header upload-header" style={{ justifyContent: 'space-between' }}>
                        <label className="modal-heading">
                            {initialValues ? 'Edit Measuring Form' : 'Add Measuring Form'}
                        </label>
                        <img
                            src="./images/cross-dropdown.svg"
                            className="cross-dropdown"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            style={{ cursor: 'pointer' }}
                        />
                    </div>

                    <form className="upload-dropdowns" onSubmit={formik.handleSubmit}>
                        {/* Title */}
                        <div>
                            <p className="upload-content-heading">Title</p>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter Design Name"
                                className="upload-content-input"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <div className="text-danger">{formik.errors.title}</div>
                            )}
                        </div>

                        {/* File */}
                        {/* <div className="upload-section">
                            <p className="upload-heading">Upload File</p>
                            <input
                                type="file"
                                id="uploadDesignInput"
                                name="fileData"
                                hidden
                                onChange={(event) => formik.setFieldValue('fileData', event.currentTarget.files[0])}
                            />
                            <label htmlFor="uploadDesignInput" className="upload-template-label">
                                <img src="./images/browse.svg" alt="upload" />
                                <br />
                                <p className="upload-txt">Click to browse or drag and drop your file</p>
                            </label>
                        </div> */}

                        <div className="upload-section">
                            <p className="upload-heading">Upload File</p>
                            <input
                                type="file"
                                id="uploadDesignInput"
                                hidden
                                onChange={(e) => setFileData(e.currentTarget.files[0])}
                            />
                            <label htmlFor="uploadDesignInput" className="upload-template-label">
                                <img src="./images/browse.svg" alt="upload" /><br />
                                <p className="upload-txt">{fileData ? fileData.name : 'Click to browse or drag and drop your file'}</p>
                            </label>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="upload-content-heading">Description</p>
                            <textarea
                                name="description"
                                placeholder="Enter design description..."
                                className="upload-content-textarea"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                            ></textarea>
                            {formik.touched.description && formik.errors.description && (
                                <div className="text-danger">{formik.errors.description}</div>
                            )}
                        </div>

                        {/* Price */}
                        <div className="upload-payment" style={{ border: 'none' }}>
                            <p className="price-forms">Price ($)</p>
                            <input
                                type="number"
                                name="price"
                                placeholder="0"
                                className="number-input"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                            />

                            {/* Active Toggle */}
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button
                                    type="button"
                                    className="upload-content-heading"
                                    style={{ border: 'none', background: 'transparent' }}
                                    onClick={() => formik.setFieldValue('is_active', 0)}
                                >
                                    Inactive
                                </button>

                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        checked={formik.values.is_active === 1}
                                        onChange={() =>
                                            formik.setFieldValue('is_active', formik.values.is_active === 1 ? 0 : 1)
                                        }
                                    />
                                    <span className="slider"></span>
                                </label>

                                <button
                                    type="button"
                                    className="upload-content-heading"
                                    style={{ border: 'none', background: 'transparent' }}
                                    onClick={() => formik.setFieldValue('is_active', 1)}
                                >
                                    Active
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'end',
                                gap: '10px',
                            }}
                        >
                            <button type="button" className="uploadCancel" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="submit" className="uploadSubmit" >
                                {initialValues ? 'Update Form' : 'Add Form'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEditForm;
