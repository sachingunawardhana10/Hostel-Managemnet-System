const API_BASE = "";

function getToken() {
  return localStorage.getItem("token");
}

function getRole() {
  return localStorage.getItem("role");
}

function getFullName() {
  return localStorage.getItem("fullName") || "User";
}

function isLoggedIn() {
  return !!getToken();
}

function redirectToLogin() {
  window.location.href = "login.html";
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("fullName");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("residentId");

  window.location.href = "login.html";
}

const modules = {
  dashboard: {
    title: "Dashboard"
  },

  residents: {
    title: "Residents",
    subtitle: "Manage resident profiles and contact details.",
    endpoint: "/api/residents",
    id: "id",
    columns: [
      { key: "id", label: "ID" },
      { key: "fullName", label: "Full Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "address", label: "Address" },
      { key: "status", label: "Status", badge: true }
    ],
    fields: [
      { key: "fullName", label: "Full Name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "phone", label: "Phone", type: "text", required: true },
      { key: "address", label: "Address", type: "textarea", required: true, full: true }
    ]
  },

  rooms: {
    title: "Rooms",
    subtitle: "Manage room capacity, occupancy, and status.",
    endpoint: "/api/rooms",
    id: "id",
    columns: [
      { key: "id", label: "ID" },
      { key: "roomNumber", label: "Room No" },
      { key: "capacity", label: "Capacity" },
      { key: "occupiedBeds", label: "Occupied Beds" },
      { key: "status", label: "Status", badge: true }
    ],
    fields: [
      { key: "roomNumber", label: "Room Number", type: "text", required: true },
      { key: "capacity", label: "Capacity", type: "number", required: true },
      { key: "occupiedBeds", label: "Occupied Beds", type: "number", required: true },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: ["AVAILABLE", "FULL", "MAINTENANCE"]
      }
    ]
  },

  allocations: {
    title: "Room Allocations",
    subtitle: "Assign residents to rooms and manage active allocations.",
    endpoint: "/api/allocations",
    id: "id",
    columns: [
      { key: "id", label: "ID" },
      { key: "resident.fullName", label: "Resident" },
      { key: "room.roomNumber", label: "Room No" },
      { key: "bedNumber", label: "Bed No" },
      { key: "startDate", label: "Start Date" },
      { key: "endDate", label: "End Date" },
      { key: "status", label: "Status", badge: true }
    ],
    fields: [
      { key: "residentId", label: "Resident ID", type: "number", required: true },
      { key: "roomId", label: "Room ID", type: "number", required: true },
      { key: "bedNumber", label: "Bed Number", type: "text", required: true }
    ],
    noEdit: true
  },

  payments: {
    title: "Payments",
    subtitle: "Track resident payments and payment status.",
    endpoint: "/api/payments",
    id: "id",
    columns: [
      { key: "id", label: "ID" },
      { key: "residentId", label: "Resident ID" },
      { key: "amount", label: "Amount" },
      { key: "paymentDate", label: "Date" },
      { key: "paymentMethod", label: "Method" },
      { key: "status", label: "Status", badge: true }
    ],
    fields: [
      { key: "residentId", label: "Resident ID", type: "text", required: true },
      { key: "amount", label: "Amount", type: "number", required: true },
      { key: "paymentDate", label: "Payment Date", type: "date", required: true },
      {
        key: "paymentMethod",
        label: "Payment Method",
        type: "select",
        required: true,
        options: ["CASH", "CARD", "BANK_TRANSFER", "ONLINE"]
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: ["PAID", "PENDING", "OVERDUE", "CANCELLED"]
      }
    ]
  },

  maintenances: {
    title: "Maintenance",
    subtitle: "Manage maintenance requests from residents.",
    endpoint: "/api/maintenances",
    id: "id",
    columns: [
      { key: "id", label: "ID" },
      { key: "residentId", label: "Resident ID" },
      { key: "issueType", label: "Issue Type" },
      { key: "description", label: "Description" },
      { key: "priority", label: "Priority", badge: true },
      { key: "status", label: "Status", badge: true }
    ],
    fields: [
      { key: "residentId", label: "Resident ID", type: "text", required: true },
      { key: "issueType", label: "Issue Type", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true, full: true },
      {
        key: "priority",
        label: "Priority",
        type: "select",
        required: true,
        options: ["LOW", "MEDIUM", "HIGH", "URGENT"]
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: ["OPEN", "IN_PROGRESS", "RESOLVED", "CANCELLED"]
      }
    ]
  },

  notifications: {
    title: "Notifications",
    subtitle: "Send and manage notifications.",
    endpoint: "/api/notifications",
    id: "id",
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "message", label: "Message" },
      { key: "recipientId", label: "Recipient ID" },
      { key: "type", label: "Type", badge: true },
      { key: "sentAt", label: "Sent At" }
    ],
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "message", label: "Message", type: "textarea", required: true, full: true },
      { key: "recipientId", label: "Recipient ID", type: "text", required: true },
      {
        key: "type",
        label: "Type",
        type: "select",
        required: true,
        options: ["GENERAL", "PAYMENT", "MAINTENANCE", "ROOM"]
      },
      { key: "sentAt", label: "Sent At", type: "date", required: true }
    ]
  }
};

const rolePermissions = {
  ADMIN: {
    view: ["dashboard", "residents", "rooms", "allocations", "payments", "maintenances", "notifications"],
    create: ["residents", "rooms", "allocations", "payments", "maintenances", "notifications"],
    edit: ["residents", "rooms", "payments", "maintenances", "notifications"],
    delete: ["residents", "rooms", "payments", "maintenances", "notifications"],
    endAllocation: true
  },

  WARDEN: {
    view: ["dashboard", "residents", "rooms", "allocations", "payments", "maintenances", "notifications"],
    create: ["residents", "rooms", "allocations", "payments", "maintenances", "notifications"],
    edit: ["residents", "rooms", "payments", "maintenances", "notifications"],
    delete: ["residents", "rooms", "payments", "maintenances", "notifications"],
    endAllocation: true
  },

  RESIDENT: {
    view: ["dashboard", "payments", "maintenances", "notifications"],
    create: ["maintenances"],
    edit: [],
    delete: [],
    endAllocation: false
  }
};

let currentModule = "dashboard";
let currentRows = [];
let editingId = null;

const pageTitle = document.getElementById("pageTitle");
const tableTitle = document.getElementById("tableTitle");
const tableSubtitle = document.getElementById("tableSubtitle");
const tableHead = document.getElementById("tableHead");
const tableBody = document.getElementById("tableBody");
const tableWrap = document.getElementById("tableWrap");
const dashboardView = document.getElementById("dashboardView");
const formModal = document.getElementById("formModal");
const dataForm = document.getElementById("dataForm");
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const searchInput = document.getElementById("searchInput");
const openFormBtn = document.getElementById("openFormBtn");
const refreshBtn = document.getElementById("refreshBtn");
const toast = document.getElementById("toast");

document.addEventListener("DOMContentLoaded", () => {
  if (!isLoggedIn()) {
    redirectToLogin();
    return;
  }

  showLoggedUser();
  applyRoleBasedUI();
  bindEvents();
  loadDashboard();
  checkApi();
});

function getPermissions() {
  const role = getRole();
  return rolePermissions[role] || rolePermissions.RESIDENT;
}

function canViewModule(moduleName) {
  return getPermissions().view.includes(moduleName);
}

function canCreateCurrentModule() {
  return getPermissions().create.includes(currentModule);
}

function canEditCurrentModule() {
  return getPermissions().edit.includes(currentModule);
}

function canDeleteCurrentModule() {
  return getPermissions().delete.includes(currentModule);
}

function showLoggedUser() {
  const nameElement = document.getElementById("loggedUserName");
  const roleElement = document.getElementById("loggedUserRole");

  if (nameElement) {
    nameElement.textContent = getFullName();
  }

  if (roleElement) {
    roleElement.textContent = getRole();
  }
}

function applyRoleBasedUI() {
  document.querySelectorAll(".nav-link").forEach(button => {
    const moduleName = button.dataset.module;

    if (!canViewModule(moduleName)) {
      button.classList.add("hidden");
    } else {
      button.classList.remove("hidden");
    }
  });

  document.querySelectorAll("[data-jump]").forEach(button => {
    const moduleName = button.dataset.jump;

    if (!canViewModule(moduleName)) {
      button.classList.add("hidden");
    } else {
      button.classList.remove("hidden");
    }
  });
}

function bindEvents() {
  document.querySelectorAll(".nav-link").forEach(button => {
    button.addEventListener("click", () => setModule(button.dataset.module));
  });

  document.querySelectorAll("[data-jump]").forEach(button => {
    button.addEventListener("click", () => setModule(button.dataset.jump));
  });

  if (openFormBtn) {
    openFormBtn.addEventListener("click", () => openForm());
  }

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      currentModule === "dashboard" ? loadDashboard() : loadModule(currentModule);
    });
  }

  const closeModalBtn = document.getElementById("closeModalBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeForm);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeForm);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  if (formModal) {
    formModal.addEventListener("click", event => {
      if (event.target === formModal) closeForm();
    });
  }

  if (dataForm) {
    dataForm.addEventListener("submit", handleSubmit);
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => renderTable(filterRows(currentRows)));
  }
}

async function checkApi() {
  const status = document.getElementById("apiStatus");
  const dot = document.querySelector(".status-dot");

  try {
    await api("/api/auth/profile");

    if (status) status.textContent = "Connected";
    if (dot) dot.style.background = "#22c55e";
  } catch (error) {
    if (status) status.textContent = "Offline";
    if (dot) dot.style.background = "#ef4444";
  }
}

function setModule(moduleName) {
  if (!canViewModule(moduleName)) {
    showToast("Access denied. Your role does not have permission.");
    return;
  }

  currentModule = moduleName;

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.module === moduleName);
  });

  if (moduleName === "dashboard") {
    if (openFormBtn) openFormBtn.classList.add("hidden");
    if (searchInput) searchInput.classList.add("hidden");

    loadDashboard();
    return;
  }

  if (canCreateCurrentModule()) {
    openFormBtn.classList.remove("hidden");
  } else {
    openFormBtn.classList.add("hidden");
  }

  searchInput.classList.remove("hidden");
  searchInput.value = "";

  loadModule(moduleName);
}

async function loadDashboard() {
  currentModule = "dashboard";

  if (pageTitle) pageTitle.textContent = "Dashboard";
  if (tableTitle) tableTitle.textContent = "Overview";
  if (tableSubtitle) tableSubtitle.textContent = "Use the sidebar to manage hostel services.";

  if (dashboardView) dashboardView.classList.remove("hidden");
  if (tableWrap) tableWrap.classList.add("hidden");
  if (openFormBtn) openFormBtn.classList.add("hidden");
  if (searchInput) searchInput.classList.add("hidden");

  const role = getRole();

  if (role === "ADMIN" || role === "WARDEN") {
    try {
      const summary = await api("/api/dashboard/summary");

      setText("residentCount", summary.totalResidents ?? 0);
      setText("roomCount", summary.totalRooms ?? 0);
      setText("allocationCount", summary.totalAllocations ?? 0);
      setText("paymentCount", summary.totalPayments ?? 0);
      setText("maintenanceCount", summary.totalMaintenanceRequests ?? 0);
      setText("notificationCount", summary.totalNotifications ?? 0);

      return;
    } catch (error) {
      console.log("Dashboard summary failed. Loading fallback counts.");
    }
  }

  await loadDashboardCountsOnly();
}

async function loadDashboardCountsOnly() {
  const role = getRole();

  if (role === "RESIDENT") {
    const [payments, maintenances, notifications] = await Promise.all([
      safeList("payments"),
      safeList("maintenances"),
      safeList("notifications")
    ]);

    setText("residentCount", 0);
    setText("roomCount", 0);
    setText("allocationCount", 0);
    setText("paymentCount", payments.length);
    setText("maintenanceCount", maintenances.length);
    setText("notificationCount", notifications.length);

    return;
  }

  const [residents, rooms, allocations, payments, maintenances, notifications] = await Promise.all([
    safeList("residents"),
    safeList("rooms"),
    safeList("allocations"),
    safeList("payments"),
    safeList("maintenances"),
    safeList("notifications")
  ]);

  setText("residentCount", residents.length);
  setText("roomCount", rooms.length);
  setText("allocationCount", allocations.length);
  setText("paymentCount", payments.length);
  setText("maintenanceCount", maintenances.length);
  setText("notificationCount", notifications.length);
}

async function safeList(moduleName) {
  try {
    if (!canViewModule(moduleName)) {
      return [];
    }

    return await api(modules[moduleName].endpoint);
  } catch {
    return [];
  }
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

async function loadModule(moduleName) {
  const config = modules[moduleName];

  if (!config) {
    showToast("Module not found.");
    return;
  }

  if (!canViewModule(moduleName)) {
    showToast("Access denied. Your role does not have permission.");
    return;
  }

  pageTitle.textContent = config.title;
  tableTitle.textContent = `${config.title} List`;
  tableSubtitle.textContent = config.subtitle;

  dashboardView.classList.add("hidden");
  tableWrap.classList.remove("hidden");

  try {
    currentRows = await api(config.endpoint);

    if (!Array.isArray(currentRows)) {
      currentRows = [];
    }

    renderTable(currentRows);
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="20" class="empty">Failed to load ${config.title}. Check backend and endpoint.</td></tr>`;
    showToast(error.message);
  }
}

function renderTable(rows) {
  const config = modules[currentModule];

  tableHead.innerHTML = `
    <tr>
      ${config.columns.map(column => `<th>${column.label}</th>`).join("")}
      <th>Actions</th>
    </tr>
  `;

  if (!rows || rows.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="${config.columns.length + 1}" class="empty">No records found.</td></tr>`;
    return;
  }

  tableBody.innerHTML = rows.map(row => {
    const cells = config.columns.map(column => {
      const value = column.key.includes(".")
        ? getNestedValue(row, column.key) ?? "-"
        : row[column.key] ?? "-";

      if (column.badge) {
        return `<td>${badge(value)}</td>`;
      }

      return `<td>${escapeHtml(String(value))}</td>`;
    }).join("");

    const id = row[config.id];
    const actionButtons = getActionButtons(id);

    return `<tr>${cells}<td>${actionButtons}</td></tr>`;
  }).join("");
}

function getActionButtons(id) {
  if (!id) {
    return `<span class="badge danger">Missing ID getter</span>`;
  }

  if (currentModule === "allocations") {
    if (getPermissions().endAllocation) {
      return `
        <div class="actions">
          <button class="btn btn-light btn-small" onclick="endAllocation(${id})">End</button>
        </div>
      `;
    }

    return `<span class="badge">View Only</span>`;
  }

  let buttons = "";

  if (canEditCurrentModule()) {
    buttons += `<button class="btn btn-light btn-small" onclick="editRowById(${id})">Edit</button>`;
  }

  if (canDeleteCurrentModule()) {
    buttons += `<button class="btn btn-danger btn-small" onclick="deleteRow(${id})">Delete</button>`;
  }

  if (!buttons) {
    return `<span class="badge">View Only</span>`;
  }

  return `<div class="actions">${buttons}</div>`;
}

function getNestedValue(object, path) {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, object);
}

function badge(value) {
  const text = escapeHtml(String(value ?? "-"));
  const lower = text.toLowerCase();

  let cls = "";

  if (["paid", "available", "resolved", "low", "general", "active"].includes(lower)) {
    cls = "success";
  }

  if (["pending", "maintenance", "medium", "in_progress", "payment"].includes(lower)) {
    cls = "warning";
  }

  if (["failed", "full", "high", "urgent", "open", "overdue", "cancelled", "ended", "left"].includes(lower)) {
    cls = "danger";
  }

  return `<span class="badge ${cls}">${text}</span>`;
}

function filterRows(rows) {
  const q = searchInput.value.trim().toLowerCase();

  if (!q) return rows;

  return rows.filter(row =>
    JSON.stringify(row).toLowerCase().includes(q)
  );
}

function openForm(row = null) {
  const config = modules[currentModule];

  if (!config) {
    showToast("Module not found.");
    return;
  }

  if (!row && !canCreateCurrentModule()) {
    showToast("Access denied. Your role cannot create this record.");
    return;
  }

  if (row && !canEditCurrentModule()) {
    showToast("Access denied. Your role cannot edit this record.");
    return;
  }

  editingId = row ? row[config.id] : null;

  formTitle.textContent = editingId ? `Edit ${config.title}` : `Add ${config.title}`;
  formSubtitle.textContent = editingId ? `Updating record ID ${editingId}` : "Fill the form and save.";

  dataForm.innerHTML = config.fields.map(field => fieldTemplate(field, row)).join("");

  formModal.classList.remove("hidden");
}

function fieldTemplate(field, row) {
  const value = row ? (row[field.key] ?? "") : "";
  const required = field.required ? "required" : "";
  const groupClass = field.full ? "form-group full" : "form-group";

  if (field.type === "textarea") {
    return `
      <div class="${groupClass}">
        <label for="${field.key}">${field.label}</label>
        <textarea id="${field.key}" name="${field.key}" rows="4" ${required}>${escapeHtml(String(value))}</textarea>
      </div>
    `;
  }

  if (field.type === "select") {
    return `
      <div class="${groupClass}">
        <label for="${field.key}">${field.label}</label>
        <select id="${field.key}" name="${field.key}" ${required}>
          <option value="">Select ${field.label}</option>
          ${field.options.map(option =>
            `<option value="${option}" ${String(value) === option ? "selected" : ""}>${option}</option>`
          ).join("")}
        </select>
      </div>
    `;
  }

  return `
    <div class="${groupClass}">
      <label for="${field.key}">${field.label}</label>
      <input id="${field.key}" name="${field.key}" type="${field.type}" value="${escapeHtml(String(value))}" ${required} />
    </div>
  `;
}

function closeForm() {
  formModal.classList.add("hidden");
  dataForm.innerHTML = "";
  editingId = null;
}

async function handleSubmit(event) {
  event.preventDefault();

  const config = modules[currentModule];

  if (editingId && !canEditCurrentModule()) {
    showToast("Access denied. Your role cannot edit this record.");
    return;
  }

  if (!editingId && !canCreateCurrentModule()) {
    showToast("Access denied. Your role cannot create this record.");
    return;
  }

  const formData = new FormData(dataForm);
  const payload = {};

  config.fields.forEach(field => {
    let value = formData.get(field.key);

    if (field.type === "number") {
      value = value === "" ? null : Number(value);
    }

    payload[field.key] = value;
  });

  try {
    if (editingId) {
      await api(`${config.endpoint}/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      });

      showToast(`${config.title} updated successfully.`);
    } else {
      await api(config.endpoint, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      showToast(`${config.title} created successfully.`);
    }

    closeForm();
    await loadModule(currentModule);
    await loadDashboardCountsOnly();
  } catch (error) {
    showToast(error.message);
  }
}

window.editRowById = function(id) {
  const config = modules[currentModule];
  const row = currentRows.find(item => item[config.id] === id);

  if (!row) {
    showToast("Record not found.");
    return;
  }

  openForm(row);
};

window.deleteRow = async function(id) {
  const config = modules[currentModule];

  if (!canDeleteCurrentModule()) {
    showToast("Access denied. Your role cannot delete this record.");
    return;
  }

  if (!confirm(`Delete this ${config.title} record?`)) {
    return;
  }

  try {
    await api(`${config.endpoint}/${id}`, {
      method: "DELETE"
    });

    showToast(`${config.title} deleted successfully.`);
    await loadModule(currentModule);
    await loadDashboardCountsOnly();
  } catch (error) {
    showToast(error.message);
  }
};

window.endAllocation = async function(id) {
  if (!getPermissions().endAllocation) {
    showToast("Access denied. Your role cannot end allocations.");
    return;
  }

  if (!confirm("End this room allocation?")) {
    return;
  }

  try {
    await api(`/api/allocations/${id}/end`, {
      method: "PUT"
    });

    showToast("Room allocation ended successfully.");
    await loadModule("allocations");
    await loadDashboardCountsOnly();
  } catch (error) {
    showToast(error.message);
  }
};

async function api(path, options = {}) {
  const token = getToken();

  const response = await fetch(API_BASE + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": "Bearer " + token } : {}),
      ...(options.headers || {})
    }
  });

  const contentType = response.headers.get("content-type") || "";

  if (response.status === 401) {
    logout();
    throw new Error("Session expired. Please login again.");
  }

  if (response.status === 403) {
    throw new Error("Access denied. Your role does not have permission.");
  }

  if (!response.ok) {
    const errorText = contentType.includes("application/json")
      ? JSON.stringify(await response.json())
      : await response.text();

    throw new Error(errorText || `Request failed: ${response.status}`);
  }

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function showToast(message) {
  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2800);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}