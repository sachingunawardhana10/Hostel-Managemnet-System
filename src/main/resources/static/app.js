const API_BASE = "";

const modules = {
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
      { key: "address", label: "Address" }
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
      { key: "status", label: "Status", type: "select", required: true, options: ["Available", "Occupied", "Maintenance"] }
    ]
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
      { key: "paymentMethod", label: "Payment Method", type: "select", required: true, options: ["Cash", "Card", "Bank Transfer", "Online"] },
      { key: "status", label: "Status", type: "select", required: true, options: ["Paid", "Pending", "Failed"] }
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
      { key: "priority", label: "Priority", type: "select", required: true, options: ["Low", "Medium", "High"] },
      { key: "status", label: "Status", type: "select", required: true, options: ["Open", "In Progress", "Completed"] }
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
      { key: "type", label: "Type", type: "select", required: true, options: ["General", "Payment", "Maintenance", "Room"] },
      { key: "sentAt", label: "Sent At", type: "date", required: true }
    ]
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
  bindEvents();
  loadDashboard();
  checkApi();
});

function bindEvents() {
  document.querySelectorAll(".nav-link").forEach(button => {
    button.addEventListener("click", () => setModule(button.dataset.module));
  });

  document.querySelectorAll("[data-jump]").forEach(button => {
    button.addEventListener("click", () => setModule(button.dataset.jump));
  });

  openFormBtn.addEventListener("click", () => openForm());
  refreshBtn.addEventListener("click", () => currentModule === "dashboard" ? loadDashboard() : loadModule(currentModule));
  document.getElementById("closeModalBtn").addEventListener("click", closeForm);
  document.getElementById("cancelBtn").addEventListener("click", closeForm);

  formModal.addEventListener("click", event => {
    if (event.target === formModal) closeForm();
  });

  dataForm.addEventListener("submit", handleSubmit);

  searchInput.addEventListener("input", () => renderTable(filterRows(currentRows)));
}

async function checkApi() {
  const status = document.getElementById("apiStatus");
  try {
    await api("/api/residents");
    status.textContent = "Connected";
    document.querySelector(".status-dot").style.background = "#22c55e";
  } catch (error) {
    status.textContent = "Offline";
    document.querySelector(".status-dot").style.background = "#ef4444";
  }
}

function setModule(moduleName) {
  currentModule = moduleName;

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.module === moduleName);
  });

  if (moduleName === "dashboard") {
    openFormBtn.classList.add("hidden");
    searchInput.classList.add("hidden");
    loadDashboard();
    return;
  }

  openFormBtn.classList.remove("hidden");
  searchInput.classList.remove("hidden");
  searchInput.value = "";
  loadModule(moduleName);
}

async function loadDashboard() {
  currentModule = "dashboard";
  pageTitle.textContent = "Dashboard";
  tableTitle.textContent = "Overview";
  tableSubtitle.textContent = "Use the sidebar to manage hostel services.";
  dashboardView.classList.remove("hidden");
  tableWrap.classList.add("hidden");
  openFormBtn.classList.add("hidden");
  searchInput.classList.add("hidden");

  try {
    const [residents, rooms, payments, maintenances, notifications] = await Promise.all([
      safeList("residents"),
      safeList("rooms"),
      safeList("payments"),
      safeList("maintenances"),
      safeList("notifications")
    ]);

    document.getElementById("residentCount").textContent = residents.length;
    document.getElementById("roomCount").textContent = rooms.length;
    document.getElementById("paymentCount").textContent = payments.length;
    document.getElementById("maintenanceCount").textContent = maintenances.length;
    document.getElementById("notificationCount").textContent = notifications.length;
  } catch (error) {
    showToast("Could not load dashboard counts.");
  }
}

async function safeList(moduleName) {
  try {
    return await api(modules[moduleName].endpoint);
  } catch {
    return [];
  }
}

async function loadModule(moduleName) {
  const config = modules[moduleName];

  pageTitle.textContent = config.title;
  tableTitle.textContent = `${config.title} List`;
  tableSubtitle.textContent = config.subtitle;
  dashboardView.classList.add("hidden");
  tableWrap.classList.remove("hidden");

  try {
    currentRows = await api(config.endpoint);
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
      const value = row[column.key] ?? "-";
      if (column.badge) return `<td>${badge(value)}</td>`;
      return `<td>${escapeHtml(String(value))}</td>`;
    }).join("");

    const id = row[config.id];
    const actionButtons = id
      ? `<div class="actions">
          <button class="btn btn-light btn-small" onclick='editRow(${JSON.stringify(row)})'>Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteRow(${id})">Delete</button>
        </div>`
      : `<span class="badge danger">Missing ID getter</span>`;

    return `<tr>${cells}<td>${actionButtons}</td></tr>`;
  }).join("");
}

function badge(value) {
  const text = escapeHtml(String(value ?? "-"));
  const lower = text.toLowerCase();

  let cls = "";
  if (["paid", "available", "completed", "low", "general"].includes(lower)) cls = "success";
  if (["pending", "maintenance", "medium", "in progress", "payment"].includes(lower)) cls = "warning";
  if (["failed", "occupied", "high", "open"].includes(lower)) cls = "danger";

  return `<span class="badge ${cls}">${text}</span>`;
}

function filterRows(rows) {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) return rows;

  return rows.filter(row =>
    Object.values(row).some(value =>
      String(value ?? "").toLowerCase().includes(q)
    )
  );
}

function openForm(row = null) {
  const config = modules[currentModule];
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

async function loadDashboardCountsOnly() {
  try {
    const [residents, rooms, payments, maintenances, notifications] = await Promise.all([
      safeList("residents"),
      safeList("rooms"),
      safeList("payments"),
      safeList("maintenances"),
      safeList("notifications")
    ]);

    document.getElementById("residentCount").textContent = residents.length;
    document.getElementById("roomCount").textContent = rooms.length;
    document.getElementById("paymentCount").textContent = payments.length;
    document.getElementById("maintenanceCount").textContent = maintenances.length;
    document.getElementById("notificationCount").textContent = notifications.length;
  } catch {}
}

window.editRow = function(row) {
  openForm(row);
};

window.deleteRow = async function(id) {
  const config = modules[currentModule];

  if (!confirm(`Delete this ${config.title} record?`)) return;

  try {
    await api(`${config.endpoint}/${id}`, { method: "DELETE" });
    showToast(`${config.title} deleted successfully.`);
    await loadModule(currentModule);
    await loadDashboardCountsOnly();
  } catch (error) {
    showToast(error.message);
  }
};

async function api(path, options = {}) {
  const response = await fetch(API_BASE + path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = response.headers.get("content-type") || "";

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
