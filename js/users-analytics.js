function getUsersData() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function createAnalyticsComponent(usersData, totalUsers, totalSellers, activeUsers, pendingSellers, lastWeekValues) {
  const percentageIncrease = (currentValue, lastWeekValue) => {
    if (lastWeekValue === 0) {
      return '+100%';
    }
    const increase = ((currentValue - lastWeekValue) / lastWeekValue) * 100;
    return increase > 0 ? `+${increase.toFixed(2)}%` : `${increase.toFixed(2)}%`;
  };

  const getPercentageClass = (currentValue, lastWeekValue) => {
    const increase = ((currentValue - lastWeekValue) / lastWeekValue) * 100;
    return increase > 0 ? 'text-success' : 'text-danger';
  };

  const analyticComponent = `
  <div class="col-sm-6 col-xl-3">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-start justify-content-between">
          <div class="content-left">
            <span>Total Users</span>
            <div class="d-flex align-items-end mt-2">
              <h4 class="mb-0 me-2">${totalUsers}</h4>
              <small class="${getPercentageClass(totalUsers, lastWeekValues.totalUsers)}">${percentageIncrease(totalUsers, lastWeekValues.totalUsers)}</small>
            </div>
            <small>Last week analytics</small>
          </div>
          <span class="badge bg-label-primary rounded p-2">
            <i class="bx bx-user bx-sm"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="col-sm-6 col-xl-3">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-start justify-content-between">
          <div class="content-left">
            <span>Total Sellers</span>
            <div class="d-flex align-items-end mt-2">
              <h4 class="mb-0 me-2">${totalSellers}</h4>
              <small class="${getPercentageClass(totalSellers, lastWeekValues.totalSellers)}">${percentageIncrease(totalSellers, lastWeekValues.totalSellers)}</small>
            </div>
            <small>Last week analytics </small>
          </div>
          <span class="badge bg-label-warning rounded p-2">
            <i class="bx bx-user bx-sm"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="col-sm-6 col-xl-3">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-start justify-content-between">
          <div class="content-left">
            <span>Active Users</span>
            <div class="d-flex align-items-end mt-2">
              <h4 class="mb-0 me-2">${activeUsers}</h4>
              <small class="${getPercentageClass(activeUsers, lastWeekValues.activeUsers)}">${percentageIncrease(activeUsers, lastWeekValues.activeUsers)}</small>
            </div>
            <small>Last week analytics</small>
          </div>
          <span class="badge bg-label-success rounded p-2">
            <i class="bx bx-group bx-sm"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="col-sm-6 col-xl-3">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-start justify-content-between">
          <div class="content-left">
            <span>Pending Sellers</span>
            <div class="d-flex align-items-end mt-2">
              <h4 class="mb-0 me-2">${pendingSellers}</h4>
              <small class="${getPercentageClass(pendingSellers, lastWeekValues.pendingSellers)}">${percentageIncrease(pendingSellers, lastWeekValues.pendingSellers)}</small>
            </div>
            <small>Last week analytics</small>
          </div>
          <span class="badge bg-label-warning rounded p-2">
            <i class="bx bx-user-voice bx-sm"></i>
          </span>
        </div>
      </div>
    </div>
  </div>`;
  return analyticComponent;
}

function renderAnalyticsComponents() {
  var $analyticsContainer = $("#Analytics");

  $analyticsContainer.empty();
// Retrieve users data from local storage
var usersData = Object.values(getUsersData());

// Calculate values
const totalUsers = usersData.length;
const totalSellers = usersData.filter(user => user.role === 'Seller').length;
const activeUsers = usersData.filter(user => user.status === 2).length;
const pendingSellers = usersData.filter(user => user.role === 'Seller' && user.status === 3).length;

// Last week values
const lastWeekValues = {
  totalUsers: 14,
  totalSellers: 12,
  activeUsers: 12,
  pendingSellers: 0
};

// Create analytics components based on calculated values
$analyticsContainer.append(createAnalyticsComponent(usersData, totalUsers, totalSellers, activeUsers, pendingSellers, lastWeekValues));
}

// Call the function to render analytics components
renderAnalyticsComponents();