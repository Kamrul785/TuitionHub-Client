const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label" htmlFor="first_name">
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          className="input input-border bg-base-300 w-full"
          disabled={!isEditing}
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.first_name.message}
          </p>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="last_name">
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          className="input input-border bg-base-300 w-full"
          disabled={!isEditing}
          {...register("last_name", { required: "Last name is required" })}
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.last_name.message}
          </p>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="input input-border bg-base-300 w-full"
          disabled
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="phone_number">
          Phone
        </label>
        <input
          type="tel"
          id="phone_number"
          className="input input-border bg-base-300 w-full"
          disabled={!isEditing}
          {...register("phone_number")}
        />
        {errors.phone_number && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phone_number.message}
          </p>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          className="input input-border bg-base-300 w-full"
          disabled={!isEditing}
          {...register("address")}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>
      <div className="form-control">
        <label className="label" htmlFor="role">
          Role
        </label>
        <input
          type="text"
          id="role"
          className="input input-border bg-base-300 w-full"
          disabled
          {...register("role")}
        />
      </div>
      

    </div>
  );
};

export default ProfileForm;
