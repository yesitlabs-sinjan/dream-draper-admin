import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getCategory } from '../../redux/admin/slices/libraryCategorySlice';

const AddEditShowcases = ({ editedData, onSubmit }) => {
    const hasFetched = useRef(false);
    const dispatch = useDispatch();
    const { mainCategoryData } = useSelector((state) => state.libCategory);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        dispatch(getCategory({ type: 'showcase_category' }));
    }, [dispatch]);

    useEffect(() => {
        if (mainCategoryData) {
            setCategory(mainCategoryData);
        }
    }, [mainCategoryData]);

    const isEditMode = Boolean(editedData);

    // Yup Validation Schema
    const validationSchema = Yup.object({
        showcase_name: Yup.string()
            .required('Showcase Name is required')
            .min(3, 'Minimum 3 characters')
            .max(50, 'Maximum 50 characters'),
        category_id: Yup.string().required('Please select a category'),
    });

    return (
        <div
            className="modal fade"
            id="uploadTemplateModal"
            tabIndex="-1"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-lg"
                style={{ width: '462px' }}
            >
                <div className="modal-content upload-template-popup">
                    <div
                        className="modal-header upload-header"
                        style={{ justifyContent: 'space-between' }}
                    >
                        <label className="modal-heading">
                            {isEditMode ? 'Edit Showcase' : 'Add Showcase'}
                        </label>
                        <img
                            src="./images/cross-dropdown.svg"
                            className="cross-dropdown"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            style={{ cursor: 'pointer' }}
                        />
                    </div>

                    <div>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                showcase_name: editedData?.showcase_name || '',
                                category_id: editedData?.category_id || '',
                                ...(isEditMode && { id: editedData.id }),
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                                onSubmit(values);
                                resetForm();
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className="upload-dropdowns">
                                    {/* Showcase Name */}
                                    <div>
                                        <p className="upload-content-heading">
                                            Showcase Name
                                        </p>
                                        <Field
                                            type="text"
                                            name="showcase_name"
                                            placeholder="Showcase Name"
                                            className="upload-content-input"
                                        />
                                        <ErrorMessage
                                            name="showcase_name"
                                            component="div"
                                            style={{ color: 'red', fontSize: '12px' }}
                                        />
                                    </div>

                                    {/* Category Dropdown */}
                                    <div>
                                        <p className="upload-content-heading">Category</p>
                                        <Field
                                            as="select"
                                            name="category_id"
                                            className="upload-content-input"
                                        >
                                            <option value="" disabled>
                                                Select Category
                                            </option>
                                            {category &&
                                                category.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.category_name}
                                                    </option>
                                                ))}
                                        </Field>
                                        <ErrorMessage
                                            name="category_id"
                                            component="div"
                                            style={{ color: 'red', fontSize: '12px' }}
                                        />
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
                                        <button
                                            type="button"
                                            className="uploadCancel"
                                            data-bs-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="uploadSubmit"
                                            data-bs-dismiss="modal">
                                            {isEditMode ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEditShowcases;
