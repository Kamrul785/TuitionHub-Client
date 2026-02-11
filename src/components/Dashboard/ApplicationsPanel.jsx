const ApplicationsPanel = ({ role, activityTitle, activityColumns }) => {

  return (
    <div className="mt-6 card bg-white/90 backdrop-blur shadow-sm border border-slate-200">
      <div className="card-body">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Recent Activity
            </p>
            <h3 className="card-title text-lg">{activityTitle}</h3>
          </div>
          <div className="join join-horizontal">
            <button className="btn btn-ghost btn-sm join-item">
              Last 30 days
            </button>
            <button className="btn btn-outline btn-sm join-item">
              Quarter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-slate-500 text-xs uppercase">
              <tr>
                {activityColumns.map((col) => (
                  <th key={col} className="bg-slate-50">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {role === "Tutor" ? (
                <>
                  <tr>
                    <td>#APP-2042</td>
                    <td>John Smith</td>
                    <td>Physics (Class 9)</td>
                    <td>
                      <div className="border border-warning w-1/2 rounded-2xl text-center text-warning">
                        PENDING
                      </div>
                    </td>
                    <td>Feb 9, 2026</td>
                  </tr>
                  <tr>
                    <td>#APP-2037</td>
                    <td>Sarah Johnson</td>
                    <td>Math (Class 10)</td>
                    <td>
                      <div className="border border-success w-1/2 rounded-2xl text-center text-success">
                        ACCEPTED
                      </div>
                    </td>
                    <td>Feb 8, 2026</td>
                  </tr>
                  <tr>
                    <td>#APP-2033</td>
                    <td>Michael Brown</td>
                    <td>English (Class 8)</td>
                    <td>
                      <div className="border border-error w-1/2 rounded-2xl text-center text-error">
                        REJECTED
                      </div>
                    </td>
                    <td>Feb 7, 2026</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <td>#APP-1042</td>
                    <td>Physics (Class 9)</td>
                    <td>Sara Collins</td>
                    <td>
                      <div className="border border-warning w-1/2 rounded-2xl text-center text-warning">
                        PENDING
                      </div>
                    </td>
                    <td>Feb 9, 2026</td>
                  </tr>
                  <tr>
                    <td>#APP-1037</td>
                    <td>Math (Class 10)</td>
                    <td>Daniel Green</td>
                    <td>
                      <div className="border border-success w-1/2 rounded-2xl text-center text-success">
                        ACCEPTED
                      </div>
                    </td>
                    <td>Feb 8, 2026</td>
                  </tr>
                  <tr>
                    <td>#APP-1033</td>
                    <td>English (Class 8)</td>
                    <td>Ivy Hart</td>
                    <td>
                      <div className="border border-error w-1/2 rounded-2xl text-center text-error">
                        REJECTED
                      </div>
                    </td>
                    <td>Feb 7, 2026</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPanel;
