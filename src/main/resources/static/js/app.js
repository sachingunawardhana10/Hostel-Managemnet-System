const API_BASE = window.location.protocol.startsWith('http') && window.location.port === '8080'
    ? `${window.location.origin}/api`
    : 'http://localhost:8080/api';

const modules = {
    residents: {
        endpoint: 'residents',
        title: 'Residents',
        singular: 'Resident',
        icon: '👥',
        description: 'Manage student and boarder information',
        columns: [
            { key: 'id', label: 'ID' },
            { key: 'fullName', label: 'Full Name' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'address', label: 'Address' }
        ],
        fields: [
            { key: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Example: Sachin Dilhare' },
            { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'name@email.com' },
            { key: 'phone', label: 'Phone', type: 'text', required: true, placeholder: '0771234567' },
            { key: 'address', label: 'Address', type: 'textarea', required: true, full: true, placeholder: 'Resident address' }
        ]
    },
    rooms: {
        endpoint: 'rooms',
        title: 'Rooms',
        singular: 'Room',
        icon: '🛏️',
        description: 'Track room capacity and availability',
        columns: [
            { key: 'id', label: 'ID' },
            { key: 'roomNumber', label: 'Room No' },
            { key: 'capacity', label: 'Capacity' },
            { key: 'occupiedBeds', label: 'Occupied' },
            { key: 'status', label: 'Status', status: true }
        ],
        fields: [
            { key: 'roomNumber', label: 'Room Number', type: 'text', required: true, placeholder: 'A-101' },
            { key: 'capacity', label: 'Capacity', type: 'number', required: true, min: 1, placeholder: '4' },
            { key: 'occupiedBeds', label: 'Occupied Beds', type: 'number', required: true, min: 0, placeholder: '2' },
            { key: 'status', label: 'Status', type: 'select', required: true, options: ['Available', 'Occupied', 'Full', 'Maintenance'] }
        ]
    },
    payments: {
        endpoint: 'payments',
        title: 'Payments',
        singular: 'Payment',
        icon: '💳',
        description: 'Manage fees and payment status',
        columns: [
            { key: 'id', label: 'ID' },
            { key: 'residentId', label: 'Resident ID' },
            { key: 'amount', label: 'Amount', money: true },
            { key: 'paymentDate', label: 'Date' },
            { key: 'paymentMethod', label: 'Method' },
            { key: 'status', label: 'Status', status: true }
        ],
        fields: [
            { key: 'residentId', label: 'Resident ID', type: 'text', required: true, placeholder: '1' },
            { key: 'amount', label: 'Amount', type: 'number', required: true, min: 0, placeholder: '25000' },
            { key: 'paymentDate', label: 'Payment Date', type: 'date', required: true },
            { key: 'paymentMethod', label: 'Payment Method', type: 'select', required: true, options: ['Cash', 'Card', 'Bank Transfer', 'Online'] },
            { key: 'status', label: 'Status', type: 'select', required: true, options: ['Paid', 'Pending', 'Failed', 'Refunded'] }
        ]
    },
    maintenances: {
        endpoint: 'maintenances',
        title: 'Maintenance',
        singular: 'Maintenance Request',
        icon: '🛠️',
        description: 'Monitor repair requests and priorities',
        columns: [
            { key: 'id', label: 'ID' },
            { key: 'residentId', label: 'Resident ID' },
            { key: 'issueType', label: 'Issue Type' },
            { key: 'priority', label: 'Priority', status: true },
            { key: 'status', label: 'Status', status: true },
            { key: 'description', label: 'Description' }
        ],
        fields: [
            { key: 'residentId', label: 'Resident ID', type: 'text', required: true, placeholder: '1' },
            { key: 'issueType', label: 'Issue Type', type: 'select', required: true, options: ['Electrical', 'Plumbing', 'Furniture', 'Cleaning', 'Internet', 'Other'] },
            { key: 'priority', label: 'Priority', type: 'select', required: true, options: ['Low', 'Medium', 'High', 'Urgent'] },
            { key: 'status', label: 'Status', type: 'select', required: true, options: ['Open', 'In Progress', 'Resolved', 'Closed'] },
            { key: 'description', label: 'Description', type: 'textarea', required: true, full: true, placeholder: 'Explain the maintenance issue' }
        ]
    },
    notifications: {
        endpoint: 'notifications',
        title: 'Notifications',
        singular: 'Notification',
        icon: '🔔',
        description: 'Send and manage resident notices',
        columns: [
            { key: 'id', label: 'ID' },
            { key: 'title', label: 'Title' },
            { key: 'recipientId', label: 'Recipient ID' },
            { key: 'type', label: 'Type', status: true },
            { key: 'sentAt', label: 'Sent At' },
            { key: 'message', label: 'Message' }
        ],
        fields: [
            { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Monthly Fee Reminder' },
            { key: 'recipientId', label: 'Recipient ID', type: 'text', required: true, placeholder: '1 or ALL' },
            { key: 'type', label: 'Type', type: 'select', required: true, options: ['General', 'Payment', 'Maintenance', 'Room', 'Emergency'] },
            { key: 'sentAt', label: 'Sent Date', type: 'date', required: true },
            { key: 'message', label: 'Message', type: 'textarea', required: true, full: true, placeholder: 'Write notification message' }
        ]
    }
};

const state = {
    currentModule: 'overview',
    data: {},
    editingId: null,
    search: ''
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const pageTitle = $('#pageTitle');
const overviewView = $('#overviewView');
const moduleView = $('#moduleView');
const statsGrid = $('#statsGrid');
const tableHead = $('#tableHead');
const tableBody = $('#tableBody');
const emptyState = $('#emptyState');
const recordCount = $('#recordCount');
const moduleTitle = $('#moduleTitle');
const moduleEyebrow = $('#moduleEyebrow');
const addBtn = $('#addBtn');
const refreshBtn = $('#refreshBtn');
const searchInput = $('#globalSearch');
const modalBackdrop = $('#modalBackdrop');
const recordForm = $('#recordForm');
const modalTitle = $('#modalTitle');
const modalEyebrow = $('#modalEyebrow');
const toast = $('#toast');

window.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    switchModule('overview');
    loadOverview();
});

function bindEvents() {
    $$('.nav-link').forEach((button) => {
        button.addEventListener('click', () => switchModule(button.dataset.module));
    });

    addBtn.addEventListener('click', () => openRecordModal('create'));
    refreshBtn.addEventListener('click', () => refreshCurrentView());
    $('#closeModal').addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) closeModal();
    });

    searchInput.addEventListener('input', (event) => {
        state.search = event.target.value.trim().toLowerCase();
        if (state.currentModule !== 'overview') renderModuleTable();
    });
}

function switchModule(moduleName) {
    state.currentModule = moduleName;
    state.search = '';
    searchInput.value = '';

    $$('.nav-link').forEach((button) => {
        button.classList.toggle('active', button.dataset.module === moduleName);
    });

    if (moduleName === 'overview') {
        overviewView.classList.add('active-view');
        moduleView.classList.remove('active-view');
        pageTitle.textContent = 'Dashboard Overview';
        addBtn.style.display = 'none';
        searchInput.disabled = true;
        searchInput.placeholder = 'Open a section to search...';
        loadOverview();
        return;
    }

    const config = modules[moduleName];
    overviewView.classList.remove('active-view');
    moduleView.classList.add('active-view');
    pageTitle.textContent = config.title;
    moduleTitle.textContent = `${config.icon} ${config.title}`;
    moduleEyebrow.textContent = config.description;
    addBtn.textContent = `+ Add ${config.singular}`;
    addBtn.style.display = 'inline-flex';
    searchInput.disabled = false;
    searchInput.placeholder = `Search ${config.title.toLowerCase()}...`;
    loadModule(moduleName);
}

async function refreshCurrentView() {
    if (state.currentModule === 'overview') {
        await loadOverview(true);
    } else {
        await loadModule(state.currentModule, true);
    }
}

async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options
    });

    const contentType = response.headers.get('content-type') || '';
    const body = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const message = typeof body === 'string' && body ? body : `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    return body;
}

async function loadOverview(showMessage = false) {
    setConnection('Checking...', false);
    try {
        const entries = await Promise.all(
            Object.entries(modules).map(async ([key, config]) => [key, await apiRequest(config.endpoint)])
        );
        state.data = Object.fromEntries(entries);
        setConnection('Connected', true);
        renderOverview();
        if (showMessage) showToast('Dashboard refreshed', 'success');
    } catch (error) {
        setConnection('Offline', false);
        renderOfflineOverview();
        showToast(`Backend connection failed. Start Spring Boot on port 8080.`, 'error');
        console.error(error);
    }
}

async function loadModule(moduleName, showMessage = false) {
    const config = modules[moduleName];
    tableBody.innerHTML = loadingRow(config.columns.length + 1);
    emptyState.classList.remove('show');

    try {
        const records = await apiRequest(config.endpoint);
        state.data[moduleName] = Array.isArray(records) ? records : [];
        setConnection('Connected', true);
        renderModuleTable();
        if (showMessage) showToast(`${config.title} refreshed`, 'success');
    } catch (error) {
        setConnection('Offline', false);
        tableBody.innerHTML = '';
        tableHead.innerHTML = '';
        emptyState.classList.add('show');
        recordCount.textContent = '0 records';
        showToast(`Could not load ${config.title}. Check backend.`, 'error');
        console.error(error);
    }
}

function renderOverview() {
    const residents = state.data.residents || [];
    const rooms = state.data.rooms || [];
    const payments = state.data.payments || [];
    const maintenances = state.data.maintenances || [];

    const totalRevenue = payments
        .filter((payment) => String(payment.status || '').toLowerCase() === 'paid')
        .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

    const availableRooms = rooms.filter((room) => String(room.status || '').toLowerCase() === 'available').length;
    const pendingMaintenance = maintenances.filter((item) => !['resolved', 'closed'].includes(String(item.status || '').toLowerCase())).length;

    statsGrid.innerHTML = [
        statCard('👥', 'Total Residents', residents.length),
        statCard('🛏️', 'Available Rooms', availableRooms),
        statCard('🛠️', 'Open Maintenance', pendingMaintenance),
        statCard('💳', 'Paid Revenue', formatMoney(totalRevenue))
    ].join('');

    renderRoomBreakdown(rooms);
    renderMaintenancePreview(maintenances);
}

function renderOfflineOverview() {
    statsGrid.innerHTML = [
        statCard('⚠️', 'Backend Status', 'Offline'),
        statCard('🧭', 'API Base', '8080'),
        statCard('📁', 'Frontend', 'Ready'),
        statCard('🔄', 'Action', 'Refresh')
    ].join('');
    $('#occupancyBadge').textContent = '0%';
    $('#occupancyFill').style.width = '0%';
    $('#roomBreakdown').innerHTML = emptyMiniRow('Start backend to view room occupancy.');
    $('#maintenancePreview').innerHTML = emptyMiniRow('No backend data loaded yet.');
}

function renderRoomBreakdown(rooms) {
    const totalCapacity = rooms.reduce((sum, room) => sum + Number(room.capacity || 0), 0);
    const occupied = rooms.reduce((sum, room) => sum + Number(room.occupiedBeds || 0), 0);
    const percentage = totalCapacity ? Math.round((occupied / totalCapacity) * 100) : 0;

    $('#occupancyBadge').textContent = `${percentage}%`;
    $('#occupancyFill').style.width = `${Math.min(percentage, 100)}%`;

    const statuses = rooms.reduce((acc, room) => {
        const key = room.status || 'Unknown';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    $('#roomBreakdown').innerHTML = Object.keys(statuses).length
        ? Object.entries(statuses).map(([status, count]) => `
            <div class="mini-row">
                <strong>${escapeHtml(status)}</strong>
                <span>${count} room${count === 1 ? '' : 's'}</span>
            </div>
        `).join('')
        : emptyMiniRow('No rooms added yet.');
}

function renderMaintenancePreview(maintenances) {
    const priority = maintenances
        .filter((item) => ['urgent', 'high', 'open', 'in progress'].includes(String(item.priority || item.status || '').toLowerCase()))
        .slice(0, 4);

    $('#maintenancePreview').innerHTML = priority.length
        ? priority.map((item) => `
            <div class="mini-row">
                <div>
                    <strong>${escapeHtml(item.issueType || 'Maintenance')}</strong><br />
                    <span>${escapeHtml(item.description || 'No description')}</span>
                </div>
                ${statusPill(item.priority || item.status)}
            </div>
        `).join('')
        : emptyMiniRow('No urgent maintenance requests.');
}

function renderModuleTable() {
    const config = modules[state.currentModule];
    const records = state.data[state.currentModule] || [];
    const filtered = filterRecords(records);

    recordCount.textContent = `${filtered.length} record${filtered.length === 1 ? '' : 's'}`;

    tableHead.innerHTML = `
        <tr>
            ${config.columns.map((column) => `<th>${column.label}</th>`).join('')}
            <th>Actions</th>
        </tr>
    `;

    if (!filtered.length) {
        tableBody.innerHTML = '';
        emptyState.classList.add('show');
        return;
    }

    emptyState.classList.remove('show');
    tableBody.innerHTML = filtered.map((record, index) => {
        const id = getRecordId(record);
        return `
            <tr>
                ${config.columns.map((column) => `<td>${formatCell(record[column.key], column)}</td>`).join('')}
                <td>
                    <div class="actions">
                        <button class="mini-btn" onclick="editRecord(${escapeAttribute(id)}, ${index})" ${id == null ? 'disabled title="ID getter missing in backend entity"' : ''}>Edit</button>
                        <button class="mini-btn delete" onclick="deleteRecord(${escapeAttribute(id)})" ${id == null ? 'disabled title="ID getter missing in backend entity"' : ''}>Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filterRecords(records) {
    if (!state.search) return records;
    return records.filter((record) => Object.values(record).some((value) =>
        String(value ?? '').toLowerCase().includes(state.search)
    ));
}

function openRecordModal(mode, record = null) {
    if (state.currentModule === 'overview') return;

    const config = modules[state.currentModule];
    state.editingId = mode === 'edit' ? getRecordId(record) : null;

    modalEyebrow.textContent = mode === 'edit' ? 'Update Record' : 'Create Record';
    modalTitle.textContent = `${mode === 'edit' ? 'Edit' : 'Add'} ${config.singular}`;

    recordForm.innerHTML = config.fields.map((field) => renderField(field, record)).join('') + `
        <div class="form-actions">
            <button type="button" class="ghost-btn" onclick="closeModal()">Cancel</button>
            <button type="submit" class="primary-btn">${mode === 'edit' ? 'Save Changes' : 'Create Record'}</button>
        </div>
    `;

    recordForm.onsubmit = submitRecordForm;
    modalBackdrop.classList.add('show');
    modalBackdrop.setAttribute('aria-hidden', 'false');
}

function renderField(field, record) {
    const value = record ? record[field.key] ?? '' : defaultValue(field);
    const required = field.required ? 'required' : '';
    const full = field.full || field.type === 'textarea' ? ' full' : '';
    const min = field.min !== undefined ? `min="${field.min}"` : '';
    const placeholder = field.placeholder ? `placeholder="${escapeHtml(field.placeholder)}"` : '';

    if (field.type === 'select') {
        return `
            <div class="form-field${full}">
                <label for="${field.key}">${field.label}</label>
                <select id="${field.key}" name="${field.key}" ${required}>
                    <option value="">Select ${field.label}</option>
                    ${field.options.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}
                </select>
            </div>
        `;
    }

    if (field.type === 'textarea') {
        return `
            <div class="form-field${full}">
                <label for="${field.key}">${field.label}</label>
                <textarea id="${field.key}" name="${field.key}" ${required} ${placeholder}>${escapeHtml(value)}</textarea>
            </div>
        `;
    }

    return `
        <div class="form-field${full}">
            <label for="${field.key}">${field.label}</label>
            <input id="${field.key}" name="${field.key}" type="${field.type}" value="${escapeHtml(value)}" ${required} ${min} ${placeholder} />
        </div>
    `;
}

function defaultValue(field) {
    if (field.type === 'date') return new Date().toISOString().slice(0, 10);
    if (field.key === 'occupiedBeds') return '0';
    if (field.type === 'select') return '';
    return '';
}

async function submitRecordForm(event) {
    event.preventDefault();

    const config = modules[state.currentModule];
    const formData = new FormData(recordForm);
    const payload = {};

    config.fields.forEach((field) => {
        let value = formData.get(field.key);
        if (field.type === 'number') value = Number(value);
        payload[field.key] = value;
    });

    const isEdit = state.editingId != null;
    const endpoint = isEdit ? `${config.endpoint}/${state.editingId}` : config.endpoint;
    const method = isEdit ? 'PUT' : 'POST';

    try {
        await apiRequest(endpoint, {
            method,
            body: JSON.stringify(payload)
        });
        closeModal();
        await loadModule(state.currentModule);
        showToast(`${config.singular} ${isEdit ? 'updated' : 'created'} successfully`, 'success');
    } catch (error) {
        showToast(`Save failed: ${error.message}`, 'error');
        console.error(error);
    }
}

window.editRecord = function editRecord(id, visibleIndex) {
    const records = filterRecords(state.data[state.currentModule] || []);
    const record = records.find((item) => String(getRecordId(item)) === String(id)) || records[visibleIndex];
    if (!record) {
        showToast('Record not found in current table', 'error');
        return;
    }
    openRecordModal('edit', record);
};

window.deleteRecord = async function deleteRecord(id) {
    const config = modules[state.currentModule];
    if (id == null || id === 'null' || id === 'undefined') {
        showToast('Cannot delete because backend did not return an ID.', 'error');
        return;
    }

    const confirmed = confirm(`Delete this ${config.singular.toLowerCase()}?`);
    if (!confirmed) return;

    try {
        await apiRequest(`${config.endpoint}/${id}`, { method: 'DELETE' });
        await loadModule(state.currentModule);
        showToast(`${config.singular} deleted successfully`, 'success');
    } catch (error) {
        showToast(`Delete failed: ${error.message}`, 'error');
        console.error(error);
    }
};

window.closeModal = closeModal;

function closeModal() {
    modalBackdrop.classList.remove('show');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    state.editingId = null;
    recordForm.reset();
}

function setConnection(text, online) {
    $('#connectionStatus').textContent = text;
    $('.pulse-dot').classList.toggle('online', online);
}

function statCard(icon, label, value) {
    return `
        <article class="stat-card">
            <div class="stat-icon">${icon}</div>
            <div>
                <p>${label}</p>
                <strong>${value}</strong>
            </div>
        </article>
    `;
}

function formatCell(value, column) {
    if (value === undefined || value === null || value === '') return '<span style="color:#94a3b8">—</span>';
    if (column.status) return statusPill(value);
    if (column.money) return formatMoney(value);
    const text = String(value);
    return escapeHtml(text.length > 72 ? `${text.slice(0, 72)}...` : text);
}

function statusPill(value) {
    const text = String(value || 'Unknown');
    const key = text.toLowerCase();
    let className = 'status-pill';

    if (['available', 'paid', 'resolved', 'closed', 'low', 'general'].includes(key)) className += ' success';
    else if (['pending', 'open', 'in progress', 'medium', 'maintenance', 'payment'].includes(key)) className += ' warning';
    else if (['failed', 'urgent', 'high', 'emergency', 'full'].includes(key)) className += ' danger';
    else if (['occupied', 'room', 'online', 'card', 'cash'].includes(key)) className += ' info';

    return `<span class="${className}">${escapeHtml(text)}</span>`;
}

function formatMoney(value) {
    return `Rs. ${Number(value || 0).toLocaleString('en-LK')}`;
}

function getRecordId(record) {
    return record?.id ?? record?.ID ?? record?._id ?? null;
}

function loadingRow(colspan) {
    return `<tr><td colspan="${colspan}" style="text-align:center;padding:42px;color:#64748b">Loading records...</td></tr>`;
}

function emptyMiniRow(text) {
    return `<div class="mini-row"><strong>${escapeHtml(text)}</strong><span>—</span></div>`;
}

function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
        toast.className = 'toast';
    }, 3400);
}

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'number') return value;
    return `'${String(value).replaceAll("'", "\\'")}'`;
}
