const FieldError = ({ error }) =>
  error ? <p className="text-red-500 text-xs mt-1">{error.message}</p> : null;

const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="first_name">First Name</label>
          <input type="text" id="first_name" className="input input-bordered w-full" disabled={!isEditing}
            {...register("first_name", { required: "First name is required" })} />
          <FieldError error={errors.first_name} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="last_name">Last Name</label>
          <input type="text" id="last_name" className="input input-bordered w-full" disabled={!isEditing}
            {...register("last_name", { required: "Last name is required" })} />
          <FieldError error={errors.last_name} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">Email</label>
        <input type="email" id="email" className="input input-bordered w-full bg-slate-50 cursor-not-allowed" disabled {...register("email")} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="phone_number">Phone</label>
          <input type="tel" id="phone_number" className="input input-bordered w-full" disabled={!isEditing}
            {...register("phone_number")} />
          <FieldError error={errors.phone_number} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="role">Role</label>
          <input type="text" id="role" className="input input-bordered w-full bg-slate-50 cursor-not-allowed" disabled {...register("role")} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="address">Address</label>
        <input type="text" id="address" className="input input-bordered w-full" disabled={!isEditing}
          {...register("address")} />
        <FieldError error={errors.address} />
      </div>
    </div>
  );
};

export default ProfileForm;
