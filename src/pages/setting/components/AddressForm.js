import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react'
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
  city: yup.string().required('First Name is required'),
  address_line_1: yup.string().required('Last Name is required'),
});
const AddressForm = () => {
      const { register, handleSubmit, control, reset, watch } = useForm({
        resolver: yupResolver(schema),
      });

      const onSubmit = (data) => {
        console.log(data)
      }
  return (
    <form className="row g-3">
      <div className="col-md-6">
        <label htmlFor="unit_number" className="form-label">
          Unit Number
        </label>
        <input
          type="text"
          className="form-control"
          id="unit_number"
          name="unit_number"
          placeholder="Unit Number"
          {...register('unit_number')}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="street_number" className="form-label">
          Street Number
        </label>
        <input
          type="text"
          className="form-control"
          id="street_number"
          name="street_number"
          placeholder="Street Number"
          {...register('street_number')}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="address_line_1" className="form-label">
          Address Line 1
        </label>
        <textarea
          rows={4}
          type="text"
          className="form-control"
          id="address_line_1"
          name="address_line_1"
          placeholder="Address Line 1"
          {...register('address_line_1')}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="address_line_2" className="form-label">
          Address Line 1
        </label>
        <textarea
          rows={4}
          type="text"
          className="form-control"
          id="address_line_2"
          name="address_line_2"
          placeholder="Address Line 2"
          {...register('address_line_2')}
        />
      </div>
      <div className="col-md-6 ">
        <label htmlFor="city" className="form-label">
          City
        </label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          placeholder="City"
          {...register('city')}
        />
      </div>
      <div className="col-md-6 ">
        <label htmlFor="region" className="form-label">
          Region
        </label>
        <input
          type="text"
          className="form-control"
          id="region"
          name="region"
          placeholder="Region"
          {...register('region')}
        />
      </div>
      <div className="text-end">
        <button
            onClick={handleSubmit(onSubmit)}
          type="button"
          className="btn btn-common"
          // disabled={isUpdateDetailsLoading}
        >
          Update Address
        </button>
      </div>
    </form>
  );
}

export default AddressForm