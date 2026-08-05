/* ACA – Autonomous Compliance Assistant Core Application Router & Enterprise Role Controller */

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  // Start on Splash Screen
  navigateTo('view-1-splash');

  // Initialize shared tables
  renderDocumentsTable();
  renderComplianceItems();
  renderReportsTable();
  renderNotificationsList();
  renderFreelancerInvoices();
  renderBusinessPayroll();
  renderCAClients();
  renderCalendarMeetings();
  renderAgencyTasks();
  renderAgencyRevenue();
  renderDirectMessages();

  // Signature canvas setup
  initSignatureCanvas();
});

// ROUTER & NAVIGATION STACK HISTORY WITH HARDWARE BACK BUTTON GESTURES
let navigationHistoryStack = [];
let currentActiveView = 'view-1-splash';

function navigateTo(viewId, isGoingBack = false) {
  if (!isGoingBack && currentActiveView && currentActiveView !== viewId) {
    navigationHistoryStack.push(currentActiveView);
    try {
      window.history.pushState({ viewId: viewId }, '', '#' + viewId);
    } catch (err) {
      console.log("History push state:", err);
    }
  }
  currentActiveView = viewId;

  const allViews = [
    'view-1-splash', 'view-2-choose-role', 'view-2-welcome', 'view-3-signup', 'view-3-signup-ca', 'view-3-signup-agency', 'view-4-idverify',
    'view-5-usertype', 'view-6-personalization', 'view-7-dashboard',
    'view-8-aichat', 'view-9-uploaddocs', 'view-10-aiprocessing',
    'view-11-results', 'view-12-compliance', 'view-13-recommendations',
    'view-14-filingreview', 'view-15-signature', 'view-16-filingsuccess',
    'view-17-reports', 'view-18-notifications', 'view-19-profile',
    'view-20-settings', 'view-21-admindash',
    'view-login-customer', 'view-login-ca', 'view-login-agency',
    'view-messages', 'view-calendar', 'view-tasks',
    'view-agency-revenue', 'view-agency-billing',
    'view-freelancer-invoices', 'view-freelancer-expenses',
    'view-business-payroll', 'view-business-employees', 'view-business-accounting',
    'view-ca-clients', 'view-ca-returns', 'view-ca-clientdetail', 'view-ca-aireview'
  ];

  // Hide all screens
  allViews.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden-screen');
  });

  // Show requested screen
  const activeEl = document.getElementById(viewId);
  if (activeEl) {
    activeEl.classList.remove('hidden-screen');
    activeEl.classList.add('fade-in');
  }

  // Header & Sidebar Visibility
  const header = document.getElementById('main-header');
  const sidebar = document.getElementById('main-sidebar');
  const onboardingViews = [
    'view-1-splash', 'view-2-choose-role', 'view-2-welcome', 'view-3-signup', 'view-3-signup-ca', 'view-3-signup-agency', 'view-4-idverify',
    'view-5-usertype', 'view-6-personalization', 'view-login-customer',
    'view-login-ca', 'view-login-agency'
  ];

  if (onboardingViews.includes(viewId)) {
    if (header) header.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';
  } else {
    if (header) header.style.display = 'flex';
    if (sidebar) sidebar.style.display = 'flex';
  }

  // Render role-specific workspace content when entering main app
  renderRoleWorkspace();

  // Trigger specialized view actions
  if (viewId === 'view-7-dashboard') {
    initDashboardChart();
  } else if (viewId === 'view-10-aiprocessing') {
    runAIScannerSequence();
  } else if (viewId === 'view-18-notifications') {
    renderNotificationsList();
  } else if (viewId === 'view-15-signature') {
    setTimeout(initSignatureCanvas, 100);
  } else if (viewId === 'view-freelancer-expenses') {
    renderFreelancerExpenses();
  } else if (viewId === 'view-business-employees') {
    renderBusinessEmployees();
  } else if (viewId === 'view-business-accounting') {
    renderBusinessAccounting();
  } else if (viewId === 'view-ca-returns') {
    renderCAReturns();
  } else if (viewId === 'view-ca-clients') {
    renderCAClients();
  } else if (viewId === 'view-messages') {
    renderDirectMessages();
  } else if (viewId === 'view-calendar') {
    renderCalendarMeetings();
  } else if (viewId === 'view-tasks') {
    renderAgencyTasks();
  } else if (viewId === 'view-agency-revenue') {
    renderAgencyRevenue();
  }

  if (window.lucide) lucide.createIcons();
  updateSidebarActiveLink(viewId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateSidebarActiveLink(viewId) {
  const links = document.querySelectorAll('.sidebar-link');
  links.forEach(l => l.classList.remove('active'));

  links.forEach(l => {
    const onclickAttr = l.getAttribute('onclick');
    if (onclickAttr && onclickAttr.includes(`'${viewId}'`)) {
      l.classList.add('active');
    }
  });
}

function goBack() {
  if (navigationHistoryStack.length > 0) {
    const prevView = navigationHistoryStack.pop();
    navigateTo(prevView, true);
  } else {
    navigateTo('view-7-dashboard', true);
  }
}

window.addEventListener('popstate', function(event) {
  if (event.state && event.state.viewId) {
    navigateTo(event.state.viewId, true);
  } else if (navigationHistoryStack.length > 0) {
    goBack();
  }
});

// COMPREHENSIVE GLOBAL KEYBOARD ENGINE
document.addEventListener('keydown', function(event) {
  const activeTag = (document.activeElement && document.activeElement.tagName) || '';
  const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag);
  const activeId = (document.activeElement && document.activeElement.id) || '';
  const key = event.key || event.code;

  if ((key === ' ' || key === 'Spacebar' || event.keyCode === 32) && !isTyping) {
    if (document.activeElement && (document.activeElement.hasAttribute('onclick') || document.activeElement.getAttribute('tabindex') === '0' || document.activeElement.classList.contains('type-card') || document.activeElement.classList.contains('sidebar-link') || document.activeElement.classList.contains('theme-card-option') || document.activeElement.classList.contains('kpi-card'))) {
      event.preventDefault();
      document.activeElement.click();
      return;
    }
  }

  if (key === 'Escape' || key === 'Esc' || event.keyCode === 27) {
    const hasOpenModal = Array.from(document.querySelectorAll('.modal-overlay')).some(m => !m.classList.contains('hidden-screen'));
    if (hasOpenModal) {
      event.preventDefault();
      closeAllModals();
    } else if (currentActiveView !== 'view-1-splash' && currentActiveView !== 'view-7-dashboard') {
      event.preventDefault();
      goBack();
    }
    return;
  }

  if (key === 'Enter' || event.keyCode === 13) {
    if (activeId === 'chat-input-field') {
      event.preventDefault();
      sendChatMessage();
      return;
    }
    if (activeId === 'direct-msg-input') {
      event.preventDefault();
      sendDirectMessage();
      return;
    }
  }
}, true);

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.add('hidden-screen');
  });
}

// AGENCY LOGIN TOGGLE HANDLER
function setAgencyLoginRole(roleKey) {
  const input = document.getElementById('agency-selected-role-input');
  const memberBtn = document.getElementById('toggle-agency-member');
  const adminBtn = document.getElementById('toggle-agency-admin');
  const btnText = document.getElementById('agency-login-btn-text');
  const emailInput = document.getElementById('agency-email-input');

  if (input) input.value = roleKey;

  if (roleKey === 'AgencyMember') {
    if (memberBtn) { memberBtn.style.background = 'var(--royal-blue)'; memberBtn.style.color = 'white'; }
    if (adminBtn) { adminBtn.style.background = 'transparent'; adminBtn.style.color = 'var(--primary-navy)'; }
    if (btnText) btnText.innerHTML = `Sign In as Agency Member <i data-lucide="arrow-right"></i>`;
    if (emailInput) emailInput.value = 'sarah.jenkins@agencyfirm.com';
  } else {
    if (adminBtn) { adminBtn.style.background = 'var(--royal-blue)'; adminBtn.style.color = 'white'; }
    if (memberBtn) { memberBtn.style.background = 'transparent'; memberBtn.style.color = 'var(--primary-navy)'; }
    if (btnText) btnText.innerHTML = `Sign In as Agency Admin <i data-lucide="arrow-right"></i>`;
    if (emailInput) emailInput.value = 'admin@globalcapartners.com';
  }

  if (window.lucide) lucide.createIcons();
}

function updateGlobalUserName(newName) {
  if (!newName || !newName.trim()) return;
  const cleanName = newName.trim();
  localStorage.setItem('aca_user_fullname', cleanName);

  const initial = cleanName.charAt(0).toUpperCase();

  ['Customer', 'CA', 'AgencyMember', 'AgencyAdmin'].forEach(rKey => {
    if (ACA_ROLES[rKey] && ACA_ROLES[rKey].user) {
      ACA_ROLES[rKey].user.name = cleanName;
      ACA_ROLES[rKey].user.avatar = initial;
    }
  });

  const headerAvatar = document.getElementById('user-avatar-letter');
  const headerName = document.getElementById('user-display-name');
  const profileAvatar = document.getElementById('profile-avatar-big');
  const profileName = document.getElementById('profile-name-big');
  const profileLegalName = document.getElementById('prof-display-fullname');

  if (headerAvatar) headerAvatar.textContent = initial;
  if (headerName) headerName.textContent = cleanName;
  if (profileAvatar) profileAvatar.textContent = initial;
  if (profileName) profileName.textContent = cleanName;
  if (profileLegalName) profileLegalName.textContent = cleanName;

  renderRoleWorkspace();
}

function handleCustomerLoginSubmit() {
  switchRole('Customer');
  navigateTo('view-7-dashboard');
}

function handleCALoginSubmit() {
  switchRole('CA');
  navigateTo('view-7-dashboard');
}

function handleAgencyLoginSubmit() {
  const roleKey = (document.getElementById('agency-selected-role-input') && document.getElementById('agency-selected-role-input').value) || 'AgencyMember';
  switchRole(roleKey);
  navigateTo('view-7-dashboard');
}

function handleSignUpSubmit() {
  const nameInput = document.getElementById('signup-fullname');
  if (nameInput && nameInput.value) {
    updateGlobalUserName(nameInput.value);
  }
  navigateTo('view-5-usertype');
}

function handleCASignUpSubmit() {
  const nameInput = document.getElementById('signup-ca-fullname');
  if (nameInput && nameInput.value) {
    updateGlobalUserName(nameInput.value);
  }
  startIdentityVerification('CA');
}

function handleAgencySignUpSubmit() {
  const nameInput = document.getElementById('signup-agency-fullname');
  if (nameInput && nameInput.value) {
    updateGlobalUserName(nameInput.value);
  }
  const roleKey = (document.getElementById('signup-agency-role') && document.getElementById('signup-agency-role').value) || 'AgencyMember';
  startIdentityVerification(roleKey);
}

function completeIdentityVerification() {
  renderRoleWorkspace();
  navigateTo('view-7-dashboard');
}

function startIdentityVerification(targetRole) {
  if (targetRole) {
    switchRole(targetRole);
  }

  const s1 = document.getElementById('id-step-1');
  const s2 = document.getElementById('id-step-2');
  const s3 = document.getElementById('id-step-3');
  const fill = document.getElementById('id-progress');
  const counter = document.getElementById('id-step-counter');

  if (s1) s1.classList.remove('hidden-screen');
  if (s2) s2.classList.add('hidden-screen');
  if (s3) s3.classList.add('hidden-screen');
  if (fill) fill.style.width = '33%';
  if (counter) counter.textContent = 'STEP 1 OF 3: GOV ID UPLOAD';

  navigateTo('view-4-idverify');
}

function handleIDFileSelected(event) {
  const file = event.target.files && event.target.files[0];
  const label = document.getElementById('id-upload-label');
  if (file && label) {
    label.innerHTML = `✓ Uploaded: <strong>${file.name}</strong> (99.8% OCR Confidence)`;
    label.style.color = 'var(--success)';
  }
}

function proceedToStep2() {
  const s1 = document.getElementById('id-step-1');
  const s2 = document.getElementById('id-step-2');
  const fill = document.getElementById('id-progress');
  const counter = document.getElementById('id-step-counter');

  if (s1) s1.classList.add('hidden-screen');
  if (s2) s2.classList.remove('hidden-screen');
  if (fill) fill.style.width = '66%';
  if (counter) counter.textContent = 'STEP 2 OF 3: BIOMETRIC SELFIE SCAN';

  if (window.lucide) lucide.createIcons();

  startCamera();
}

function startCamera() {
  const video = document.getElementById('webcam-stream');
  const fallback = document.getElementById('webcam-fallback');
  const statusMsg = document.getElementById('webcam-status-msg');

  if (statusMsg) statusMsg.textContent = "Connecting to device camera stream...";

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (video) {
          video.muted = true;
          video.srcObject = stream;
          video.style.display = 'block';
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => console.log('Video play error:', err));
          }
        }
        if (fallback) fallback.style.display = 'none';
        if (statusMsg) statusMsg.textContent = "✓ Live webcam stream connected • Align face inside frame";
      })
      .catch(err => {
        console.warn('Webcam stream permission/access note:', err);
        showSimulatedWebcamFeed("✓ Biometric Facial Scanner Active • Ready to Scan");
      });
  } else {
    showSimulatedWebcamFeed("✓ Biometric Facial Scanner Active • Ready to Scan");
  }
}

function showSimulatedWebcamFeed(message) {
  const video = document.getElementById('webcam-stream');
  const fallback = document.getElementById('webcam-fallback');
  const statusMsg = document.getElementById('webcam-status-msg');

  if (video) video.style.display = 'none';
  if (fallback) {
    fallback.style.display = 'flex';
    fallback.style.flexDirection = 'column';
    fallback.style.alignItems = 'center';
    fallback.style.justifyContent = 'center';
    fallback.innerHTML = `
      <div style="position:relative; width:90px; height:90px; border-radius:50%; background:linear-gradient(135deg, var(--royal-blue), var(--ai-accent-blue)); color:white; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:800; border:3px solid white; box-shadow:0 0 20px rgba(47,167,229,0.6);">
        D
        <div style="position:absolute; top:-2px; right:-2px; width:16px; height:16px; border-radius:50%; background:var(--success); border:2px solid white;"></div>
      </div>
      <span style="font-size:11px; font-weight:700; color:white; margin-top:10px; letter-spacing:0.5px;">BIOMETRICS ACTIVE</span>
    `;
  }
  if (statusMsg) statusMsg.textContent = message || "Biometric facial scanning active • Processing landmarks";
  if (window.lucide) lucide.createIcons();
}

function simulateSelfieMatch() {
  startCamera();

  const beam = document.getElementById('biometric-scan-beam');
  const statusMsg = document.getElementById('webcam-status-msg');
  if (beam) beam.style.display = 'block';
  if (statusMsg) statusMsg.textContent = "⚡ AI Scanning 128 biometric facial landmark points...";

  setTimeout(() => {
    const video = document.getElementById('webcam-stream');
    if (video && video.srcObject) {
      try {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
      } catch (e) {
        console.log("Camera track cleanup:", e);
      }
    }

    const s2 = document.getElementById('id-step-2');
    const s3 = document.getElementById('id-step-3');
    const fill = document.getElementById('id-progress');
    const counter = document.getElementById('id-step-counter');

    if (s2) s2.classList.add('hidden-screen');
    if (s3) s3.classList.remove('hidden-screen');
    if (fill) fill.style.width = '100%';
    if (counter) counter.textContent = 'STEP 3 OF 3: VERIFICATION COMPLETE';

    if (window.lucide) lucide.createIcons();
  }, 1800);
}

function selectAndProceedRole(roleKey) {
  if (roleKey === 'Individual' || roleKey === 'Freelancer' || roleKey === 'Business') {
    ACA_ROLES.activeRole = 'Customer';
  } else if (roleKey === 'TaxAgent') {
    ACA_ROLES.activeRole = 'CA';
  } else {
    ACA_ROLES.activeRole = roleKey;
  }
  renderPersonalizationFields(roleKey);
  navigateTo('view-6-personalization');
}

function completeRoleOnboarding() {
  startIdentityVerification(ACA_ROLES.activeRole || 'Customer');
}

function renderPersonalizationFields(roleKey) {
  const container = document.getElementById('role-dynamic-fields');
  const title = document.getElementById('role-setup-title');
  const desc = document.getElementById('role-setup-desc');
  if (!container) return;

  let fieldsHTML = '';

  if (roleKey === 'Individual' || roleKey === 'Customer') {
    if (title) title.textContent = 'Configure Individual Setup';
    if (desc) desc.textContent = "Train ACA's tax engine for your personal deductions, employment status, and T1/1040 tax claims.";
    fieldsHTML = `
      <div class="form-group">
        <label class="form-label">Employment Type</label>
        <select class="form-input">
          <option selected>Full-Time Employee (W2 / T4)</option>
          <option>Part-Time / Seasonal Filer</option>
          <option>Retired Filer (Pension / Annuity)</option>
          <option>Student Filer (Tuition Credits)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Annual Income Range</label>
        <select class="form-input">
          <option>$40,000 - $75,000 CAD/USD</option>
          <option selected>$75,000 - $150,000 CAD/USD</option>
          <option>$150,000 - $250,000 CAD/USD</option>
          <option>$250,000+ High Net Worth</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">CRA SIN / IRS SSN Authorization ID</label>
        <input type="text" class="form-input" value="•••-•••-9482" placeholder="SIN / SSN Identification" required>
      </div>
      <div class="form-group">
        <label class="form-label">Tax Filing Status</label>
        <select class="form-input">
          <option selected>Single Filer</option>
          <option>Married / Joint Return</option>
          <option>Common-Law Taxpayer</option>
          <option>Head of Household</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Dependents & Children</label>
        <select class="form-input">
          <option selected>0 Dependents</option>
          <option>1 Dependent Child</option>
          <option>2 Dependent Children</option>
          <option>3+ Dependents</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Foreign Asset Holdings</label>
        <select class="form-input">
          <option selected>No Foreign Property (> $100k)</option>
          <option>T1135 Foreign Assets (> $100k CAD)</option>
          <option>FBAR US Financial Accounts (> $10k USD)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Primary Tax Deductions</label>
        <select class="form-input">
          <option selected>RRSP / 401(k) + Home Office + Medical</option>
          <option>Childcare + Caregiver Tax Credits</option>
          <option>Tuition & Student Loan Interest</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Refund Direct Deposit Method</label>
        <select class="form-input">
          <option selected>Direct Deposit to Bank Account</option>
          <option>Paper Check via Mail</option>
          <option>Apply Refund to Next Year's Taxes</option>
        </select>
      </div>
    `;
  } else if (roleKey === 'Freelancer') {
    if (title) title.textContent = 'Configure Freelancer Setup';
    if (desc) desc.textContent = "Configure ACA's self-employment expense tracking, GST/HST registration, and quarterly tax estimates.";
    fieldsHTML = `
      <div class="form-group">
        <label class="form-label">Business Trade Name</label>
        <input type="text" class="form-input" value="Apex Digital Studio" placeholder="Trade Name or Solopreneur Name" required>
      </div>
      <div class="form-group">
        <label class="form-label">Industry Category</label>
        <select class="form-input">
          <option selected>Software Engineering & Tech Design</option>
          <option>Consulting & Advisory Services</option>
          <option>Media & Digital Content Creator</option>
          <option>E-Commerce & Online Retail</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">GST / HST / State Sales Tax ID</label>
        <input type="text" class="form-input" value="RT-884920194" placeholder="Tax Registration Number" required>
      </div>
      <div class="form-group">
        <label class="form-label">Estimated Gross Revenue</label>
        <select class="form-input">
          <option>Under $30,000 CAD/USD</option>
          <option>$30,000 - $100,000 CAD/USD</option>
          <option selected>$100,000 - $250,000 CAD/USD</option>
          <option>$250,000+ CAD/USD</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Home Office Workspace %</label>
        <select class="form-input">
          <option>10% - 20% Dedicated Space</option>
          <option selected>25% - 40% Dedicated Space</option>
          <option>50%+ Primary Studio</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Primary Expense Categories</label>
        <select class="form-input">
          <option selected>Hardware + Software Subscriptions</option>
          <option>Vehicle Mileage + Fuel Expenses</option>
          <option>Travel + Client Meals & Entertainment</option>
          <option>Subcontractor & Freelance Fees</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Quarterly Installment Tracking</label>
        <select class="form-input">
          <option selected>Auto-calculate CRA/IRS Quarterly Payments</option>
          <option>Annual Lump-Sum Filer</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Accounting Software Sync</label>
        <select class="form-input">
          <option selected>QuickBooks Online Sync</option>
          <option>Xero Accounting Integration</option>
          <option>Wave Financial Connection</option>
          <option>CSV Bank Statement Upload</option>
        </select>
      </div>
    `;
  } else if (roleKey === 'Business') {
    if (title) title.textContent = 'Configure Business Setup';
    if (desc) desc.textContent = "Set up corporate tax filing (T2 / 1120), payroll compliance, and multi-employee tax withholdings.";
    fieldsHTML = `
      <div class="form-group">
        <label class="form-label">Corporate Legal Name</label>
        <input type="text" class="form-input" value="Summit Health Tech Inc." placeholder="Full Corporate Name" required>
      </div>
      <div class="form-group">
        <label class="form-label">Legal Entity Structure</label>
        <select class="form-input">
          <option selected>Corporation (Inc. / Ltd. / C-Corp)</option>
          <option>Limited Liability Company (LLC / Partnership)</option>
          <option>Sole Proprietorship</option>
          <option>Non-Profit Organization</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Corporate BN / EIN Tax ID</label>
        <input type="text" class="form-input" value="BN-994820194-RC0001" placeholder="Business Number / EIN" required>
      </div>
      <div class="form-group">
        <label class="form-label">Employee Count (Payroll Scope)</label>
        <select class="form-input">
          <option>1 - 10 Employees</option>
          <option selected>11 - 50 Employees</option>
          <option>51 - 250 Employees</option>
          <option>250+ Enterprise</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Annual Corporate Revenue</label>
        <select class="form-input">
          <option>$250,000 - $1,000,000 CAD/USD</option>
          <option selected>$1,000,000 - $5,000,000 CAD/USD</option>
          <option>$5,000,000 - $25,000,000 CAD/USD</option>
          <option>$25,000,000+ Enterprise</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">SR&ED R&D Tax Credit Claim</label>
        <select class="form-input">
          <option selected>Claiming SR&ED R&D Tax Credits</option>
          <option>Not Claiming R&D Credits</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Multi-Jurisdiction Sales Tax</label>
        <select class="form-input">
          <option selected>GST/HST (Canada) + State Sales Tax (USA)</option>
          <option>Single Province/State Only</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Corporate Signing Authority</label>
        <select class="form-input">
          <option selected>CEO / Managing Director</option>
          <option>CFO / VP Finance</option>
          <option>Authorized Corporate Secretary</option>
        </select>
      </div>
    `;
  } else { // TaxAgent / CA
    if (title) title.textContent = 'Configure CA Firm Setup';
    if (desc) desc.textContent = "Setup firm license credentials, CRA EFILE / IRS MeF authorization, and client roster capacity.";
    fieldsHTML = `
      <div class="form-group">
        <label class="form-label">CA / CPA Firm Name</label>
        <input type="text" class="form-input" value="Apex CA & Partners" placeholder="Firm Name" required>
      </div>
      <div class="form-group">
        <label class="form-label">CA / CPA License Registration ID</label>
        <input type="text" class="form-input" value="CA-994820-ON" placeholder="License Number" required>
      </div>
      <div class="form-group">
        <label class="form-label">CRA EFILE / IRS MeF Transmitter ID</label>
        <input type="text" class="form-input" value="EFILE-CA-8849" placeholder="Transmitter Number" required>
      </div>
      <div class="form-group">
        <label class="form-label">Firm Client Roster Capacity</label>
        <select class="form-input">
          <option>1 - 25 Active Filers</option>
          <option selected>25 - 100 Active Filers</option>
          <option>100+ Corporate Portfolios</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Practice Specialties</label>
        <select class="form-input">
          <option selected>Dual Cross-Border (US/CA) + Corporate Audit</option>
          <option>Small Business & Freelancer Accounting</option>
          <option>Estate & Wealth Planning</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Staff Delegations</label>
        <select class="form-input">
          <option>Single Practitioner</option>
          <option selected>2 - 10 Associate CAs</option>
          <option>10+ Multi-Branch Staff</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Automated Document Requests</label>
        <select class="form-input">
          <option selected>Auto-request T4/W2 & Receipts via SMS/Email</option>
          <option>Manual Document Requests Only</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Secure Client Portal Access</label>
        <select class="form-input">
          <option selected>Mandatory 2FA + Watermarked PDF Sharing</option>
          <option>Standard Encrypted Portal Access</option>
        </select>
      </div>
    `;
  }

  container.innerHTML = fieldsHTML;
  if (window.lucide) lucide.createIcons();
}

function switchRole(roleKey) {
  if (roleKey === 'Individual' || roleKey === 'Freelancer' || roleKey === 'Business') {
    ACA_ROLES.activeRole = 'Customer';
  } else if (roleKey === 'TaxAgent') {
    ACA_ROLES.activeRole = 'CA';
  } else {
    ACA_ROLES.activeRole = roleKey;
  }

  renderRoleWorkspace();
  renderRecommendations();
  if (window.lucide) lucide.createIcons();
}

function switchCountry(code) {
  const countryMap = {
    dual: { name: "Canada & USA (Dual Tax Engine)", currency: "CAD / USD", flag: "🌐" },
    ca: { name: "Canada (CRA Tax Engine)", currency: "CAD ($)", flag: "🇨🇦" },
    us: { name: "USA (IRS Tax Engine)", currency: "USD ($)", flag: "🇺🇸" },
    in: { name: "India (Income Tax Dept Engine)", currency: "INR (₹)", flag: "🇮🇳" }
  };

  const selected = countryMap[code] || countryMap['dual'];
  ACA_ROLES.activeCountry = code;
  localStorage.setItem('aca_selected_country', code);

  const headerSelect = document.getElementById('header-country-select');
  if (headerSelect) headerSelect.value = code;

  alert(`✓ Tax Jurisdiction switched to ${selected.flag} ${selected.name}!\nPrimary filing currency set to ${selected.currency}.`);
  renderRoleWorkspace();
}

// RENDER ADAPTIVE SIDEBAR & WORKSPACE DASHBOARD
function renderRoleWorkspace() {
  const roleKey = ACA_ROLES.activeRole || 'Customer';
  const roleObj = ACA_ROLES[roleKey] || ACA_ROLES.Customer;
  if (!roleObj) return;

  const select = document.getElementById('header-role-select');
  if (select) select.value = roleKey;

  const avatar = document.getElementById('user-avatar-letter');
  const name = document.getElementById('user-display-name');
  const subtitle = document.getElementById('user-role-subtitle');

  if (avatar) avatar.textContent = roleObj.user.avatar;
  if (name) name.textContent = roleObj.user.name;
  if (subtitle) subtitle.textContent = roleObj.user.subtitle;

  const profAv = document.getElementById('profile-avatar-big');
  const profName = document.getElementById('profile-name-big');
  const profSub = document.getElementById('profile-subtitle-big');
  if (profAv) profAv.textContent = roleObj.user.avatar;
  if (profName) profName.textContent = roleObj.user.name;
  if (profSub) profSub.textContent = roleObj.user.subtitle;

  // Render Sidebar Links dynamically
  const sidebarNav = document.getElementById('sidebar-nav-container');
  if (sidebarNav) {
    sidebarNav.innerHTML = roleObj.sidebar.map(item => `
      <a class="sidebar-link" id="${item.id}" onclick="navigateTo('${item.targetView}')">
        <i data-lucide="${item.icon}" style="width:20px; height:20px;"></i>
        <span>${item.name}</span>
        ${item.badge ? `<span class="sidebar-badge">${item.badge}</span>` : ''}
      </a>
    `).join('');
  }

  // Render DYNAMIC ROLE WORKSPACE DASHBOARD PAGE
  const workspaceContainer = document.getElementById('role-dashboard-workspace-container');
  if (workspaceContainer) {
    workspaceContainer.innerHTML = buildWorkspaceDashboardHTML(roleKey, roleObj);
  }

  if (window.lucide) lucide.createIcons();
  updateSidebarActiveLink(currentActiveView);
}

function getKPIRouteTarget(title) {
  if (!title) return 'view-7-dashboard';
  const t = title.toLowerCase();
  if (t.includes('refund') || t.includes('tax owed') || t.includes('score')) return 'view-11-results';
  if (t.includes('deadline') || t.includes('calendar') || t.includes('meeting')) return 'view-calendar';
  if (t.includes('doc') || t.includes('file') || t.includes('slip')) return 'view-9-uploaddocs';
  if (t.includes('client') || t.includes('roster')) return 'view-ca-clients';
  if (t.includes('return')) return 'view-ca-returns';
  if (t.includes('compliance')) return 'view-12-compliance';
  if (t.includes('task') || t.includes('sla') || t.includes('workload')) return 'view-tasks';
  if (t.includes('revenue') || t.includes('fee') || t.includes('income') || t.includes('billing')) return 'view-agency-revenue';
  return 'view-7-dashboard';
}

// BUILD FULL DYNAMIC WORKSPACE DASHBOARD FOR EACH ROLE
function buildWorkspaceDashboardHTML(roleKey, roleObj) {
  let html = '';

  // HEADER BANNER FOR ALL WORKSPACES
  html += `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 24px;">
      <div>
        <div style="display:inline-flex; align-items:center; gap:8px; padding:4px 12px; border-radius:14px; background:rgba(30,90,146,0.12); color:var(--royal-blue); font-size:12px; font-weight:700; margin-bottom:8px;">
          <i data-lucide="shield-check" style="width:14px;"></i> ${roleObj.title.toUpperCase()} WORKSPACE
        </div>
        <h1 class="h1-text" style="color: var(--primary-navy);">${roleObj.user.name} 👋</h1>
        <p class="body-text" style="color: var(--secondary-text);">${roleObj.user.subtitle} • Real-time ACA Compliance Engine Active</p>
      </div>
      <div style="display:flex; align-items:center; gap:14px; background: white; padding: 10px 18px; border-radius: var(--radius-lg); border: 1px solid var(--borders); cursor:pointer;" onclick="navigateTo('view-12-compliance')">
        <div style="text-align:right;">
          <div class="caption-text">COMPLIANCE HEALTH</div>
          <div style="font-size:22px; font-weight:800; color:var(--royal-blue);">92%</div>
        </div>
        <div class="gauge-circle" style="width:44px; height:44px;">
          <svg width="44" height="44">
            <circle class="gauge-circle-bg" cx="22" cy="22" r="17" stroke-width="4" />
            <circle class="gauge-circle-fill" cx="22" cy="22" r="17" stroke-width="4" style="stroke-dasharray:110; stroke-dashoffset:16;" />
          </svg>
        </div>
      </div>
    </div>

    <!-- ROLE DASHBOARD KPI GRID -->
    <div class="kpi-grid" style="margin-bottom: 28px;">
      ${roleObj.kpis.map(k => `
        <div class="kpi-card" tabindex="0" role="button" style="cursor:pointer; transition:all 200ms ease;" onclick="navigateTo('${getKPIRouteTarget(k.title)}')" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 20px rgba(30,90,146,0.14)';" onmouseout="this.style.transform='none'; this.style.boxShadow='none';" title="Open ${k.title}">
          <div class="kpi-header">
            <span>${k.title}</span>
            <div class="kpi-icon-wrap" style="background:${k.bg}; color:${k.color};">
              <i data-lucide="${k.icon}" style="width:18px;"></i>
            </div>
          </div>
          <div class="kpi-value" style="color:${k.color};">${k.value}</div>
          <div class="caption-text">${k.desc}</div>
          <div style="text-align:right; margin-top:8px;">
            <span class="caption-text" style="color:var(--royal-blue); font-weight:700;">Inspect & Action →</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // ROLE-SPECIFIC CAPABILITIES ACTION TOOLBAR & CONTENT
  if (roleKey === 'Customer') {
    html += `
      <!-- CUSTOMER ACTIONS TOOLBAR -->
      <div class="aca-card" style="padding:24px; margin-bottom:28px; background:linear-gradient(135deg, rgba(30,90,146,0.06) 0%, rgba(47,167,229,0.06) 100%);">
        <h3 class="section-title" style="margin-bottom:16px;">Customer Actions</h3>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px;">
          <button class="btn-primary" style="height:44px; font-size:13px;" onclick="navigateTo('view-9-uploaddocs')"><i data-lucide="upload-cloud"></i> Upload Tax Docs</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-11-results')"><i data-lucide="search"></i> View AI Analysis</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-8-aichat')"><i data-lucide="sparkles"></i> Chat with AI</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-messages')"><i data-lucide="message-square"></i> Chat with Accountant</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-14-filingreview')"><i data-lucide="check-square"></i> Approve Tax Return</button>
          <button class="btn-primary" style="height:44px; font-size:13px; background:var(--success);" onclick="navigateTo('view-15-signature')"><i data-lucide="file-signature"></i> Digitally Sign Returns</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-17-reports')"><i data-lucide="download"></i> Download Reports</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-16-filingsuccess')"><i data-lucide="clock"></i> Track Filing Status</button>
        </div>
      </div>

      <!-- SPLIT GRID: RECENT ACTIVITY & AI SUGGESTIONS -->
      <div style="display:grid; grid-template-columns: 2fr 1fr; gap: 24px;">
        <div class="aca-card">
          <h3 class="section-title" style="margin-bottom:16px;">Recent Tax Filing Activity</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="padding:14px; background:var(--light-bg); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:700; color:var(--primary-navy);">T4 Statement of Remuneration Verified</div>
                <div class="caption-text" style="color:var(--secondary-text);">Extracted by ACA OCR • Matched CRA Gateway</div>
              </div>
              <span style="color:var(--success); font-weight:700; font-size:12px;">✓ Verified</span>
            </div>
            <div style="padding:14px; background:var(--light-bg); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:700; color:var(--primary-navy);">Signed Tax Return T1 / 1040 Ready</div>
                <div class="caption-text" style="color:var(--secondary-text);">Assigned to Senior CA Apex Services</div>
              </div>
              <button class="btn-secondary" style="height:30px; font-size:12px;" onclick="navigateTo('view-15-signature')">Sign Now</button>
            </div>
          </div>
        </div>
        
        <div class="aca-card">
          <h3 class="section-title" style="margin-bottom:16px;">AI Tax Hints</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${roleObj.aiSuggestions.map(s => `
              <div style="padding:12px; border-radius:var(--radius-md); background:var(--light-bg); border-left:4px solid var(--royal-blue); cursor:pointer;" onclick="openHintDetail('${s.id}')">
                <div style="font-weight:600; font-size:13px; color:var(--primary-navy);">${s.title}</div>
                <div class="caption-text" style="color:var(--success); font-weight:700; margin-top:2px;">+$${s.savings} Savings</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (roleKey === 'CA') {
    html += `
      <!-- CA CAPABILITIES TOOLBAR -->
      <div class="aca-card" style="padding:24px; margin-bottom:28px; background:linear-gradient(135deg, rgba(47,167,229,0.08) 0%, rgba(30,90,146,0.08) 100%);">
        <h3 class="section-title" style="margin-bottom:16px;">Chartered Accountant Capabilities</h3>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px;">
          <button class="btn-primary" style="height:44px; font-size:13px;" onclick="navigateTo('view-ca-clients')"><i data-lucide="users"></i> Manage Clients</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-9-uploaddocs')"><i data-lucide="file-search"></i> Review Uploaded Docs</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-11-results')"><i data-lucide="cpu"></i> AI Tax Review</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="sendDirectMessagePrompt()"><i data-lucide="send"></i> Request Additional Docs</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-17-reports')"><i data-lucide="bar-chart-2"></i> Generate Tax Reports</button>
          <button class="btn-primary" style="height:44px; font-size:13px; background:var(--success);" onclick="navigateTo('view-ca-returns')"><i data-lucide="send-check"></i> Submit Tax Returns (EFILE)</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-12-compliance')"><i data-lucide="shield-alert"></i> Monitor Compliance</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-messages')"><i data-lucide="lock"></i> Secure Client Chat</button>
        </div>
      </div>

      <!-- ACTIVE CLIENTS & MEETINGS SPLIT -->
      <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
        <div class="aca-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 class="section-title">Client Returns In Progress</h3>
            <button class="btn-secondary" style="height:32px; font-size:12px;" onclick="navigateTo('view-ca-clients')">View All Clients →</button>
          </div>
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr style="text-align:left; border-bottom:1px solid var(--borders); font-size:12px; color:var(--secondary-text);">
                <th style="padding:10px;">CLIENT</th>
                <th style="padding:10px;">FORM</th>
                <th style="padding:10px;">DUE</th>
                <th style="padding:10px; text-align:right;">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--borders);">
                <td style="padding:10px; font-weight:600;">Dhanush (Individual)</td>
                <td style="padding:10px;">T1 / 1040 Dual</td>
                <td style="padding:10px;">Apr 30</td>
                <td style="padding:10px; text-align:right;"><span style="padding:4px 8px; border-radius:10px; font-size:11px; font-weight:700; background:rgba(244,183,64,0.15); color:var(--warning);">Ready for Signature</span></td>
              </tr>
              <tr style="border-bottom:1px solid var(--borders);">
                <td style="padding:10px; font-weight:600;">Summit Health Tech Inc.</td>
                <td style="padding:10px;">T2 Corporate</td>
                <td style="padding:10px;">Aug 30</td>
                <td style="padding:10px; text-align:right;"><span style="padding:4px 8px; border-radius:10px; font-size:11px; font-weight:700; background:rgba(47,191,113,0.15); color:var(--success);">Filing Ready</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="aca-card">
          <h3 class="section-title" style="margin-bottom:16px;">Today's Client Consultations</h3>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="padding:12px; background:var(--light-bg); border-radius:var(--radius-md); border-left:4px solid var(--royal-blue);">
              <div style="font-weight:700; font-size:13px; color:var(--primary-navy);">10:00 AM • Dhanush</div>
              <div class="caption-text">Cross-Border Foreign Property T1135 Audit Review</div>
            </div>
            <div style="padding:12px; background:var(--light-bg); border-radius:var(--radius-md); border-left:4px solid var(--royal-blue);">
              <div style="font-weight:700; font-size:13px; color:var(--primary-navy);">02:30 PM • Summit Health</div>
              <div class="caption-text">T2 Corporate SRED Tax Credit Election</div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (roleKey === 'AgencyMember') {
    html += `
      <!-- AGENCY MEMBER CAPABILITIES TOOLBAR -->
      <div class="aca-card" style="padding:24px; margin-bottom:28px; background:linear-gradient(135deg, rgba(47,191,113,0.08) 0%, rgba(30,90,146,0.08) 100%);">
        <h3 class="section-title" style="margin-bottom:16px;">Agency Member Workload Capabilities</h3>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">
          <button class="btn-primary" style="height:44px; font-size:13px;" onclick="navigateTo('view-ca-clients')"><i data-lucide="user-check"></i> Assigned Clients Only</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-tasks')"><i data-lucide="check-square"></i> Process Daily Tasks</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-9-uploaddocs')"><i data-lucide="file-text"></i> Review Pending Slips</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-messages')"><i data-lucide="message-square"></i> Staff Messaging</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-8-aichat')"><i data-lucide="sparkles"></i> Task AI Assistant</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-17-reports')"><i data-lucide="award"></i> Performance Report</button>
        </div>
      </div>

      <!-- WORKLOAD TABLE & TASKS -->
      <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
        <div class="aca-card">
          <h3 class="section-title" style="margin-bottom:16px;">Assigned Client Queue (Restricted Access)</h3>
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr style="text-align:left; border-bottom:1px solid var(--borders); font-size:12px; color:var(--secondary-text);">
                <th style="padding:10px;">CLIENT</th>
                <th style="padding:10px;">TASK</th>
                <th style="padding:10px;">PRIORITY</th>
                <th style="padding:10px; text-align:right;">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--borders);">
                <td style="padding:10px; font-weight:600;">Dhanush (Individual)</td>
                <td style="padding:10px;">OCR Slip Verification</td>
                <td style="padding:10px;"><span style="color:var(--error); font-weight:700; font-size:11px;">High</span></td>
                <td style="padding:10px; text-align:right;"><span style="padding:4px 8px; border-radius:10px; font-size:11px; font-weight:700; background:rgba(30,90,146,0.15); color:var(--royal-blue);">In Progress</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="aca-card">
          <h3 class="section-title" style="margin-bottom:16px;">Daily Workload SLA</h3>
          <div style="padding:16px; background:var(--light-bg); border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:28px; font-weight:800; color:var(--success);">98%</div>
            <div class="caption-text" style="color:var(--secondary-text); margin-top:4px;">On-Time Client Task SLA Rate</div>
          </div>
        </div>
      </div>
    `;
  } else if (roleKey === 'AgencyAdmin') {
    html += `
      <!-- AGENCY ADMIN CAPABILITIES TOOLBAR -->
      <div class="aca-card" style="padding:24px; margin-bottom:28px; background:linear-gradient(135deg, rgba(30,90,146,0.1) 0%, rgba(47,191,113,0.1) 100%);">
        <h3 class="section-title" style="margin-bottom:16px;">Agency Administrator Capabilities</h3>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px;">
          <button class="btn-primary" style="height:44px; font-size:13px;" onclick="openAddEmployeeModal()"><i data-lucide="user-plus"></i> Invite Employee</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="openAddEmployeeModal()"><i data-lucide="user-minus"></i> Add Member</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-ca-clients')"><i data-lucide="user-check"></i> Assign Clients</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-agency-revenue')"><i data-lucide="trending-up"></i> View Staff Performance</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-tasks')"><i data-lucide="activity"></i> Monitor Workload</button>
          <button class="btn-primary" style="height:44px; font-size:13px; background:var(--success);" onclick="navigateTo('view-agency-revenue')"><i data-lucide="pie-chart"></i> Firm Analytics</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-agency-billing')"><i data-lucide="credit-card"></i> Subscription & Seats</button>
          <button class="btn-secondary" style="height:44px; font-size:13px;" onclick="navigateTo('view-21-admindash')"><i data-lucide="shield-check"></i> System Audit</button>
        </div>
      </div>

      <!-- STAFF ROSTER & FIRM FINANCIALS -->
      <div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;">
        <div class="aca-card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 class="section-title">Active Firm Accountants (${(ACA_DATA.agencyEmployees || []).length} Staff Members)</h3>
            <button class="btn-primary" style="height:32px; font-size:12px;" onclick="openAddEmployeeModal()">+ Invite Member</button>
          </div>
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr style="text-align:left; border-bottom:1px solid var(--borders); font-size:12px; color:var(--secondary-text);">
                <th style="padding:10px;">STAFF MEMBER</th>
                <th style="padding:10px;">ROLE</th>
                <th style="padding:10px;">CLIENTS</th>
                <th style="padding:10px; text-align:right;">ACTION</th>
              </tr>
            </thead>
            <tbody>
              ${(ACA_DATA.agencyEmployees || []).map(emp => `
                <tr style="border-bottom:1px solid var(--borders);">
                  <td style="padding:10px; font-weight:600; color:var(--primary-navy);">${emp.name}</td>
                  <td style="padding:10px;">${emp.role}</td>
                  <td style="padding:10px; font-weight:700; color:var(--royal-blue);">${emp.clientsAssigned} Clients</td>
                  <td style="padding:10px; text-align:right;">
                    <button class="btn-secondary" style="height:28px; font-size:11px;" onclick="navigateTo('view-ca-clients')">Assign</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="aca-card">
          <h3 class="section-title" style="margin-bottom:16px;">Firm Revenue Overview</h3>
          <div style="padding:16px; background:var(--light-bg); border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:28px; font-weight:800; color:var(--success);">$485,000.00</div>
            <div class="caption-text" style="color:var(--secondary-text); margin-top:4px;">YTD Fee Income (+18.4% YoY)</div>
          </div>
          <button class="btn-secondary" style="width:100%; height:36px; margin-top:16px; font-size:12px;" onclick="navigateTo('view-agency-revenue')">Open Revenue Analytics →</button>
        </div>
      </div>
    `;
  }

  return html;
}

// ROLE-ADAPTIVE AI ASSISTANT QUERY HANDLER
function sendChatMessage() {
  const input = document.getElementById('chat-input-field');
  const chatBox = document.getElementById('chat-messages-box');
  if (!input || !chatBox) return;

  const query = input.value.trim();
  if (!query) return;

  const userBubble = document.createElement('div');
  userBubble.className = 'message-bubble user';
  userBubble.textContent = query;
  chatBox.appendChild(userBubble);
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  const roleKey = ACA_ROLES.activeRole || 'Customer';

  setTimeout(() => {
    let replyText = "";
    if (roleKey === 'Customer') {
      replyText = `ACA Tax Assistant (Customer Mode):\n\nBased on CRA (Canada) and IRS (USA) statutory codes for your taxpayer profile:\n• Unclaimed RRSP / 401(k) deduction room identified: Up to $8,500.00.\n• Home office deduction under Schedule 8829 / Form T777S yields $2,450.00 in tax write-offs.\n• Your current estimated refund is $4,280.50 CAD/USD.`;
    } else if (roleKey === 'CA') {
      replyText = `ACA Tax Assistant (Chartered Accountant Mode):\n\nClient Audit Summary:\n• 14 active returns in queue; 5 returns ready for CRA EFILE / IRS MeF submission.\n• Form T1135 foreign property risk flag detected on Client #302 (US holding > $10,000 CAD).\n• Auto-generated client request sent for missing RRSP contribution receipts.`;
    } else if (roleKey === 'AgencyMember') {
      replyText = `ACA Tax Assistant (Agency Member Mode):\n\nStaff Workflow Insights:\n• 8 daily tasks pending (5 high priority for Dhanush & Acme Corp).\n• OCR Slip indexing complete for 5 assigned client slips with 99.8% confidence.\n• Workload efficiency current rate: 98% on-time completion.`;
    } else if (roleKey === 'AgencyAdmin') {
      replyText = `ACA Tax Assistant (Agency Admin Mode):\n\nFirm Analytics & Revenue Insights:\n• Agency YTD Fee Income: $485,000.00 (+18.4% YoY growth).\n• Staff Bandwidth Optimization: Associate #3 has 15% available capacity for corporate return routing.\n• Projected Q4 revenue estimated at $185,000.00.`;
    } else {
      replyText = `ACA AI Assistant: Verified statutory tax rules for ${roleKey}. All calculations active.`;
    }

    const aiBubble = document.createElement('div');
    aiBubble.className = 'message-bubble aca';
    aiBubble.style.whiteSpace = 'pre-wrap';
    aiBubble.textContent = replyText;
    chatBox.appendChild(aiBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);
}

function clearChat() {
  const chatBox = document.getElementById('chat-messages-box');
  if (chatBox) {
    chatBox.innerHTML = `<div class="message-bubble aca">Hello! I am your ACA AI Assistant. How can I assist your compliance today?</div>`;
  }
}

// SHARED ECOSYSTEM RENDER FUNCTIONS
function renderDirectMessages() {
  const threadsContainer = document.getElementById('direct-messages-threads-list');
  const box = document.getElementById('direct-messages-box');
  const recipientTitle = document.getElementById('msg-active-recipient');

  if (!ACA_DATA.threads || ACA_DATA.threads.length === 0) return;

  const activeThread = ACA_DATA.threads.find(t => t.id === ACA_DATA.activeThreadId) || ACA_DATA.threads[0];

  // 1. Render left conversations list
  if (threadsContainer) {
    threadsContainer.innerHTML = ACA_DATA.threads.map(t => {
      const isActive = t.id === activeThread.id;
      const lastMsg = t.messages[t.messages.length - 1];
      return `
        <div style="padding:14px; border-radius:var(--radius-md); cursor:pointer; transition:all 200ms ease; background:${isActive ? 'white' : 'transparent'}; border:2px solid ${isActive ? 'var(--royal-blue)' : 'transparent'}; box-shadow:${isActive ? 'var(--shadow-sm)' : 'none'}; border-left:${isActive ? '4px solid var(--royal-blue)' : '2px solid transparent'};" onclick="selectMessageThread('${t.id}')">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <div style="font-weight:700; font-size:14px; color:var(--primary-navy);">${t.name}</div>
            ${t.unread ? `<span style="padding:2px 8px; border-radius:10px; background:var(--royal-blue); color:white; font-size:10px; font-weight:700;">NEW</span>` : ''}
          </div>
          <div class="caption-text" style="color:var(--royal-blue); font-weight:600; font-size:12px;">${t.role}</div>
          <div class="caption-text" style="color:var(--secondary-text); margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:220px;">
            "${lastMsg ? lastMsg.text : ''}"
          </div>
        </div>
      `;
    }).join('');
  }

  // 2. Render Active Thread Header
  if (recipientTitle) {
    recipientTitle.textContent = `${activeThread.name} (${activeThread.role})`;
  }

  // 3. Render Active Thread Messages
  if (box) {
    const roleKey = ACA_ROLES.activeRole || 'Customer';
    box.innerHTML = activeThread.messages.map(m => {
      const isMe = m.sender.includes(roleKey) || m.sender.includes('Customer') || m.sender.includes('Dhanush');
      return `
        <div style="max-width:80%; align-self:${isMe ? 'flex-end' : 'flex-start'}; background:${isMe ? 'var(--royal-blue)' : 'var(--light-bg)'}; color:${isMe ? 'white' : 'var(--primary-navy)'}; padding:14px 18px; border-radius:var(--radius-lg); border:${isMe ? 'none' : '1px solid var(--borders)'};">
          <div style="font-size:12px; opacity:0.85; margin-bottom:4px; font-weight:700;">${m.sender} • ${m.time}</div>
          <div style="font-size:14px; line-height:1.5;">${m.text}</div>
        </div>
      `;
    }).join('');
    box.scrollTop = box.scrollHeight;
  }
}

function selectMessageThread(threadId) {
  ACA_DATA.activeThreadId = threadId;
  const thread = ACA_DATA.threads.find(t => t.id === threadId);
  if (thread) thread.unread = false;
  renderDirectMessages();
}

function sendDirectMessage() {
  const input = document.getElementById('direct-msg-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;

  const activeThread = ACA_DATA.threads.find(t => t.id === ACA_DATA.activeThreadId) || ACA_DATA.threads[0];
  const roleKey = ACA_ROLES.activeRole || 'Customer';

  const newMsg = {
    sender: `${roleKey === 'Customer' ? 'Dhanush (Customer)' : roleKey === 'CA' ? 'Apex CA Services (CA)' : 'Sarah (Agency Staff)'}`,
    time: 'Just now',
    text: val
  };

  activeThread.messages.push(newMsg);
  input.value = '';
  renderDirectMessages();

  setTimeout(() => {
    let reply = roleKey === 'Customer' ? `${activeThread.name}: Thank you Dhanush! I have reviewed your message and updated your tax portfolio.` : "Dhanush (Customer): Thank you for the update! Checking in my workspace now.";
    activeThread.messages.push({
      sender: activeThread.name,
      time: 'Just now',
      text: reply
    });
    renderDirectMessages();
  }, 1000);
}

function sendDirectMessagePrompt() {
  const text = prompt("Enter secure message to send to accountant / firm:");
  if (text) {
    document.getElementById('direct-msg-input').value = text;
    sendDirectMessage();
  }
}

// INTERACTIVE RETURNS TAB FOR AGENCY WORKER & CAS
let activeCAReturnStatusFilter = 'All';

function renderCAReturns(filterQuery = '', statusFilter = null) {
  if (statusFilter !== null) activeCAReturnStatusFilter = statusFilter;

  const tbody = document.getElementById('ca-returns-tbody');
  if (!tbody) return;

  let returns = ACA_DATA.caReturns || [];

  if (activeCAReturnStatusFilter !== 'All') {
    returns = returns.filter(r => r.status === activeCAReturnStatusFilter || r.efileStatus.includes(activeCAReturnStatusFilter));
  }

  if (filterQuery) {
    const q = filterQuery.toLowerCase();
    returns = returns.filter(r => r.client.toLowerCase().includes(q) || r.form.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
  }

  tbody.innerHTML = returns.map(r => `
    <tr style="border-bottom:1px solid var(--borders);">
      <td style="padding:12px; font-weight:700; color:var(--royal-blue);">${r.id}</td>
      <td style="padding:12px; font-weight:600; color:var(--primary-navy);">${r.client}</td>
      <td style="padding:12px;">${r.form}</td>
      <td style="padding:12px;">${r.due}</td>
      <td style="padding:12px; font-weight:700; color:var(--success);">${r.refund}</td>
      <td style="padding:12px;">
        <span style="padding:4px 10px; border-radius:12px; font-size:11px; font-weight:700; background:${r.efileStatus.includes('Filed') ? 'rgba(47,191,113,0.15)' : 'rgba(244,183,64,0.15)'}; color:${r.efileStatus.includes('Filed') ? 'var(--success)' : 'var(--warning)'};">
          ${r.efileStatus}
        </span>
      </td>
      <td style="padding:12px; text-align:right;">
        <button class="btn-secondary" style="height:32px; font-size:12px; margin-right:6px;" onclick="navigateTo('view-ca-clientdetail')">Audit Return</button>
        ${r.efileStatus.includes('Filed') ? 
          `<button class="btn-primary" style="height:32px; font-size:12px; background:var(--success);" onclick="alert('Return already E-filed with CRA/IRS! Transmission ID: EFILE-994820')">✓ E-Filed</button>` :
          `<button class="btn-primary" style="height:32px; font-size:12px; background:var(--royal-blue);" onclick="submitEfileReturn('${r.id}')">Submit EFILE</button>`
        }
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function filterCAReturns(status, btnElement) {
  if (btnElement) {
    const parent = btnElement.parentElement;
    if (parent) {
      const btns = parent.querySelectorAll('button');
      btns.forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--primary-navy)';
        b.style.border = '1px solid var(--borders)';
      });
      btnElement.style.background = 'var(--royal-blue)';
      btnElement.style.color = 'white';
      btnElement.style.border = 'none';
    }
  }
  renderCAReturns('', status);
}

function submitEfileReturn(retId) {
  const item = ACA_DATA.caReturns.find(r => r.id === retId);
  if (item) {
    item.status = "E-Filed";
    item.efileStatus = "Filed (EFILE Confirmed)";
    alert(`✓ Return ${retId} (${item.client}) successfully E-Filed with CRA & IRS gateways!\nConfirmation Code: CRA-EFILE-994820-ON.`);
    renderCAReturns();
    renderRoleWorkspace();
  }
}

// AGENCY ADMIN ADD EMPLOYEE MODAL
function openAddEmployeeModal() {
  const modal = document.getElementById('modal-add-employee');
  if (modal) modal.classList.remove('hidden-screen');
}

function closeAddEmployeeModal() {
  const modal = document.getElementById('modal-add-employee');
  if (modal) modal.classList.add('hidden-screen');
}

function submitAddEmployee(event) {
  if (event) event.preventDefault();
  const nameInput = document.getElementById('new-emp-name');
  const roleInput = document.getElementById('new-emp-role');
  const emailInput = document.getElementById('new-emp-email');
  const clientsInput = document.getElementById('new-emp-clients');

  if (!nameInput || !nameInput.value) return;

  const newEmp = {
    empId: `EMP-${Math.floor(100 + Math.random() * 900)}`,
    name: nameInput.value.trim(),
    role: roleInput ? roleInput.value : 'Senior CA',
    clientsAssigned: clientsInput ? parseInt(clientsInput.value) || 10 : 10,
    returnsFiled: 0,
    efficiency: "100%",
    status: "Active"
  };

  if (!ACA_DATA.agencyEmployees) ACA_DATA.agencyEmployees = [];
  ACA_DATA.agencyEmployees.unshift(newEmp);

  alert(`✓ Employee ${newEmp.name} (${newEmp.role}) successfully added to agency roster!`);
  closeAddEmployeeModal();
  renderRoleWorkspace();
}

// INTERACTIVE AGENCY REVENUE & BILLING ANALYTICS
function renderAgencyRevenue(timePeriod = 'YTD', btnElement = null) {
  if (btnElement) {
    const parent = btnElement.parentElement;
    if (parent) {
      const btns = parent.querySelectorAll('button');
      btns.forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--primary-navy)';
        b.style.border = '1px solid var(--borders)';
      });
      btnElement.style.background = 'var(--royal-blue)';
      btnElement.style.color = 'white';
      btnElement.style.border = 'none';
    }
  }

  const periodTitle = document.getElementById('rev-period-title');
  const totalVal = document.getElementById('rev-total-val');
  const retainersVal = document.getElementById('rev-retainers-val');
  const pendingVal = document.getElementById('rev-pending-val');
  const breakdownList = document.getElementById('agency-revenue-breakdown-list');

  const periodData = {
    'YTD': { title: "YTD 2025 Revenue & Analytics", total: "$485,000.00", retainers: "$42,500.00", pending: "$18,200.00" },
    'Q1': { title: "Q1 2025 Revenue & Analytics", total: "$124,000.00", retainers: "$38,000.00", pending: "$4,200.00" },
    'Q2': { title: "Q2 2025 Revenue & Analytics", total: "$142,500.00", retainers: "$40,000.00", pending: "$6,500.00" },
    'Q3': { title: "Q3 2025 Revenue & Analytics", total: "$118,500.00", retainers: "$42,500.00", pending: "$7,500.00" },
    'FY2024': { title: "Full Year 2024 Revenue & Analytics", total: "$420,000.00", retainers: "$36,000.00", pending: "$0.00" }
  };

  const data = periodData[timePeriod] || periodData['YTD'];

  if (periodTitle) periodTitle.textContent = data.title;
  if (totalVal) totalVal.textContent = data.total;
  if (retainersVal) retainersVal.textContent = data.retainers;
  if (pendingVal) pendingVal.textContent = data.pending;

  if (breakdownList) {
    breakdownList.innerHTML = ACA_DATA.agencyRevenue.breakdown.map((item, idx) => `
      <div style="padding:16px; background:var(--light-bg); border-radius:var(--radius-md); border-left:4px solid ${idx === 0 ? 'var(--royal-blue)' : idx === 1 ? 'var(--success)' : 'var(--warning)'}; cursor:pointer;" onclick="alert('Auditing transaction ledger for ${item.category}... Total: ${item.amount}')">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="font-weight:700; color:var(--primary-navy);">${item.category}</div>
          <div style="font-size:18px; font-weight:800; color:var(--royal-blue);">${item.amount}</div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="width:75%; height:8px; background:white; border-radius:4px; overflow:hidden;">
            <div style="width:${item.percentage}; height:100%; background:${idx === 0 ? 'var(--royal-blue)' : idx === 1 ? 'var(--success)' : 'var(--warning)'};"></div>
          </div>
          <span class="caption-text" style="font-weight:700; color:var(--royal-blue);">${item.percentage} of Total →</span>
        </div>
      </div>
    `).join('');
  }
}

function openInvoiceModal() {
  const modal = document.getElementById('modal-create-invoice');
  if (modal) modal.classList.remove('hidden-screen');
}

function closeInvoiceModal() {
  const modal = document.getElementById('modal-create-invoice');
  if (modal) modal.classList.add('hidden-screen');
}

function submitCreateInvoice(event) {
  if (event) event.preventDefault();
  const clientInput = document.getElementById('inv-client-name');
  const amountInput = document.getElementById('inv-amount');
  const serviceInput = document.getElementById('inv-service');

  if (!clientInput || !amountInput) return;

  alert(`✓ Billing Invoice of $${amountInput.value} issued to ${clientInput.value} for ${serviceInput ? serviceInput.value : 'Tax Services'}!\nAutomated payment link sent via email & SMS.`);
  closeInvoiceModal();
  renderAgencyRevenue();
}

function submitSignatureAndFile() {
  alert(`🎉 TAX RETURN OFFICIALLY SUBMITTED!\n\nConfirmation ID: CRA-2025-${Math.floor(100000 + Math.random() * 900000)}\nSigned by Taxpayer Dhanush.\n\nAssigned CA Apex CA Services and Agency Administrator notified.`);
  navigateTo('view-16-filingsuccess');
}

function renderDocumentsTable() {
  const tbody = document.getElementById('doc-table-body');
  if (!tbody) return;

  tbody.innerHTML = ACA_DATA.documents.map(d => `
    <tr style="border-bottom:1px solid var(--borders);">
      <td style="padding:12px; font-weight:600; color:var(--primary-navy);"><i data-lucide="file-text" style="width:16px; margin-right:8px; color:var(--royal-blue);"></i> ${d.name}</td>
      <td style="padding:12px; color:var(--secondary-text);">${d.type}</td>
      <td style="padding:12px; color:var(--muted-text); font-size:13px;">${d.size}</td>
      <td style="padding:12px;"><span style="padding:4px 10px; border-radius:12px; font-size:12px; font-weight:700; background:rgba(47,191,113,0.15); color:var(--success);">${d.status}</span></td>
      <td style="padding:12px; font-weight:700; color:var(--royal-blue);">${d.confidence}%</td>
      <td style="padding:12px; text-align:right;"><button class="btn-secondary" style="height:30px; padding:0 12px; font-size:12px;" onclick="alert('Viewing parsed document detail for ${d.name}...')">View OCR</button></td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function renderComplianceItems() {
  const list = document.getElementById('compliance-list');
  if (!list) return;

  list.innerHTML = ACA_DATA.complianceItems.map(c => `
    <div style="padding:16px; border-radius:var(--radius-md); background:var(--light-bg); border-left:4px solid ${c.type === 'warning' ? 'var(--warning)' : 'var(--success)'}; margin-bottom:12px; cursor:pointer;" onclick="openAuditShieldModal('${c.id}')">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-weight:700; color:var(--primary-navy);">${c.title}</span>
        <span style="padding:2px 8px; border-radius:10px; font-size:11px; font-weight:700; background:${c.type === 'warning' ? 'rgba(244,183,64,0.15)' : 'rgba(47,191,113,0.15)'}; color:${c.type === 'warning' ? 'var(--warning)' : 'var(--success)'};">${c.status}</span>
      </div>
      <p class="caption-text" style="margin-top:6px;">${c.detail}</p>
    </div>
  `).join('');
}

function renderReportsTable() {
  const tbody = document.getElementById('reports-table-body');
  if (!tbody) return;

  tbody.innerHTML = ACA_DATA.reportsHistory.map(r => `
    <tr style="border-bottom:1px solid var(--borders);">
      <td style="padding:12px; font-weight:800; color:var(--primary-navy);">${r.year}</td>
      <td style="padding:12px;">${r.country}</td>
      <td style="padding:12px;"><span style="padding:4px 10px; border-radius:12px; font-size:12px; font-weight:700; background:rgba(47,191,113,0.15); color:var(--success);">${r.status}</span></td>
      <td style="padding:12px; font-weight:700; color:var(--success);">${r.refund}</td>
      <td style="padding:12px; text-align:right;"><button class="btn-secondary" style="height:30px; padding:0 12px; font-size:12px;" onclick="alert('Downloading PDF report package for ${r.year}...')"><i data-lucide="download"></i> PDF</button></td>
    </tr>
  `).join('');
}

function renderNotificationsList() {
  const box = document.getElementById('notifications-list-box');
  if (!box) return;

  box.innerHTML = ACA_DATA.notifications.map(n => `
    <div style="padding:16px; border-radius:var(--radius-md); background:white; border:1px solid var(--borders); display:flex; justify-content:space-between; align-items:center;">
      <div>
        <div style="font-weight:700; color:var(--primary-navy);">${n.title} <span class="caption-text" style="color:var(--muted-text); margin-left:8px;">${n.time}</span></div>
        <p class="caption-text" style="margin-top:4px;">${n.desc}</p>
      </div>
      ${n.unread ? `<span style="width:10px; height:10px; border-radius:50%; background:var(--error);"></span>` : ''}
    </div>
  `).join('');
}

function renderFreelancerInvoices() {
  const tbody = document.getElementById('freelancer-invoices-tbody');
  if (!tbody) return;

  tbody.innerHTML = ACA_DATA.freelancerInvoices.map(inv => `
    <tr style="border-bottom:1px solid var(--borders);">
      <td style="padding:12px; font-weight:700; color:var(--royal-blue);">${inv.id}</td>
      <td style="padding:12px; font-weight:600;">${inv.client}</td>
      <td style="padding:12px; font-weight:700;">${inv.amount}</td>
      <td style="padding:12px;"><span style="padding:4px 10px; border-radius:12px; font-size:12px; font-weight:700; background:rgba(47,191,113,0.15); color:var(--success);">${inv.status}</span></td>
      <td style="padding:12px; color:var(--muted-text); font-size:13px;">${inv.date}</td>
      <td style="padding:12px; text-align:right;"><button class="btn-secondary" style="height:30px; padding:0 12px; font-size:12px;" onclick="alert('Viewing Invoice ${inv.id}...')">View Invoice</button></td>
    </tr>
  `).join('');
}

function renderBusinessPayroll() {
  const tbody = document.getElementById('business-payroll-tbody');
  if (!tbody) return;

  tbody.innerHTML = ACA_DATA.businessPayroll.map(emp => `
    <tr style="border-bottom:1px solid var(--borders);">
      <td style="padding:12px; font-weight:700; color:var(--royal-blue);">${emp.empId}</td>
      <td style="padding:12px; font-weight:600;">${emp.name}</td>
      <td style="padding:12px;">${emp.role}</td>
      <td style="padding:12px; font-weight:700;">${emp.salary}</td>
      <td style="padding:12px; color:var(--warning); font-weight:700;">${emp.taxDeducted}</td>
      <td style="padding:12px; text-align:right;"><span style="padding:4px 10px; border-radius:12px; font-size:12px; font-weight:700; background:rgba(47,191,113,0.15); color:var(--success);">${emp.status}</span></td>
    </tr>
  `).join('');
}

function renderCAClients() {
  const tbody = document.getElementById('ca-clients-tbody');
  if (!tbody) return;

  tbody.innerHTML = ACA_DATA.caClients.map(c => `
    <tr style="border-bottom:1px solid var(--borders);">
      <td style="padding:14px 16px; font-weight:700; color:var(--primary-navy);">${c.name}</td>
      <td style="padding:14px 16px;"><span style="padding:4px 10px; border-radius:12px; font-size:12px; font-weight:700; background:${c.status === 'Filing Ready' || c.status === 'Ready for Signature' ? 'rgba(47,191,113,0.15)' : 'rgba(244,183,64,0.15)'}; color:${c.status === 'Filing Ready' || c.status === 'Ready for Signature' ? 'var(--success)' : 'var(--warning)'};">${c.status}</span></td>
      <td style="padding:14px 16px; font-weight:600;">${c.taxYear}</td>
      <td style="padding:14px 16px; font-weight:700; color:${c.riskScore.includes('Low') || c.riskScore.includes('Passed') ? 'var(--success)' : 'var(--warning)'};">${c.riskScore}</td>
      <td style="padding:14px 16px; font-weight:600; color:var(--royal-blue);">${c.assignedDocs}</td>
      <td style="padding:14px 16px; color:var(--secondary-text); font-size:13px;">${c.lastUpdated}</td>
      <td style="padding:14px 16px;"><span style="padding:2px 8px; border-radius:10px; font-size:11px; font-weight:700; background:rgba(30,90,146,0.12); color:var(--royal-blue);">${c.complianceStatus}</span></td>
      <td style="padding:14px 16px; text-align:right;">
        <div style="display:flex; gap:6px; justify-content:flex-end;">
          <button class="btn-primary" style="height:32px; padding:0 10px; font-size:12px;" onclick="openClientProfileDetail('${c.id}')">View Client</button>
          <button class="btn-secondary" style="height:32px; padding:0 10px; font-size:12px;" onclick="sendDirectMessagePrompt()">Request Docs</button>
          <button class="btn-secondary" style="height:32px; padding:0 10px; font-size:12px;" onclick="navigateTo('view-ca-aireview')">Review</button>
        </div>
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function openClientProfileDetail(clientId) {
  const client = ACA_DATA.caClients.find(c => c.id === clientId) || ACA_DATA.caClients[0];
  const nameEl = document.getElementById('client-detail-name');
  const statusEl = document.getElementById('client-detail-status');
  const riskEl = document.getElementById('client-detail-risk');

  if (nameEl) nameEl.textContent = `${client.name}`;
  if (statusEl) statusEl.textContent = client.status;
  if (riskEl) riskEl.textContent = client.riskScore;

  navigateTo('view-ca-clientdetail');
}

function renderFreelancerExpenses() {
  const tbody = document.getElementById('freelancer-expenses-tbody');
  if (tbody) {
    tbody.innerHTML = `
      <tr style="border-bottom:1px solid var(--borders);"><td style="padding:12px; font-weight:700;">EXP-901</td><td style="padding:12px;">Apple Store</td><td style="padding:12px;">Hardware & Tech</td><td style="padding:12px; font-weight:700;">$2,850.00</td><td style="padding:12px; color:var(--success); font-weight:700;">100% Class 50</td><td style="padding:12px;">Feb 02</td><td style="padding:12px; text-align:right;"><button class="btn-secondary" style="height:28px; font-size:11px;">Receipt</button></td></tr>
      <tr style="border-bottom:1px solid var(--borders);"><td style="padding:12px; font-weight:700;">EXP-902</td><td style="padding:12px;">Rogers Fiber Net</td><td style="padding:12px;">Utilities / Internet</td><td style="padding:12px; font-weight:700;">$180.00</td><td style="padding:12px; color:var(--success); font-weight:700;">80% Allocation</td><td style="padding:12px;">Feb 05</td><td style="padding:12px; text-align:right;"><button class="btn-secondary" style="height:28px; font-size:11px;">Receipt</button></td></tr>
    `;
  }
}

function renderBusinessEmployees() {
  const tbody = document.getElementById('business-employees-tbody');
  if (tbody) {
    tbody.innerHTML = `
      <tr style="border-bottom:1px solid var(--borders);"><td style="padding:12px; font-weight:700;">EMP-01</td><td style="padding:12px; font-weight:600;">Sarah Jenkins</td><td style="padding:12px;">Engineering</td><td style="padding:12px; font-weight:700;">$115,000.00</td><td style="padding:12px; color:var(--success); font-weight:700;">T4 Issued</td><td style="padding:12px; text-align:right;"><button class="btn-secondary" style="height:28px; font-size:11px;">Edit</button></td></tr>
      <tr style="border-bottom:1px solid var(--borders);"><td style="padding:12px; font-weight:700;">EMP-02</td><td style="padding:12px; font-weight:600;">Alex Rivera</td><td style="padding:12px;">UI/UX Design</td><td style="padding:12px; font-weight:700;">$95,000.00</td><td style="padding:12px; color:var(--success); font-weight:700;">T4 Issued</td><td style="padding:12px; text-align:right;"><button class="btn-secondary" style="height:28px; font-size:11px;">Edit</button></td></tr>
    `;
  }
}

function renderBusinessAccounting() {
  const tbody = document.getElementById('business-accounting-tbody');
  if (tbody) {
    tbody.innerHTML = `
      <tr style="border-bottom:1px solid var(--borders);"><td style="padding:12px; font-weight:700;">GL-4001</td><td style="padding:12px; font-weight:600;">Software Subscription Sales</td><td style="padding:12px;">Revenue</td><td style="padding:12px; font-weight:700; color:var(--success);">$145,000.00 CR</td><td style="padding:12px;">Schedule 125</td><td style="padding:12px; text-align:right;"><button class="btn-secondary" style="height:28px; font-size:11px;">View</button></td></tr>
      <tr style="border-bottom:1px solid var(--borders);"><td style="padding:12px; font-weight:700;">GL-5002</td><td style="padding:12px; font-weight:600;">R&D Server Operations</td><td style="padding:12px;">Expense</td><td style="padding:12px; font-weight:700; color:var(--warning);">$28,500.00 DR</td><td style="padding:12px;">SRED Tax Credit</td><td style="padding:12px; text-align:right;"><button class="btn-secondary" style="height:28px; font-size:11px;">View</button></td></tr>
    `;
  }
}

function renderCAReturns() {
  const tbody = document.getElementById('ca-returns-tbody');
  if (tbody) {
    tbody.innerHTML = `
      <tr style="border-bottom:1px solid var(--borders);"><td style="padding:12px; font-weight:700; color:var(--royal-blue);">RET-801</td><td style="padding:12px; font-weight:600;">Summit Health Tech</td><td style="padding:12px;">T2 Corporate</td><td style="padding:12px;">Aug 30</td><td style="padding:12px; font-weight:700; color:var(--success);">95% Complete</td><td style="padding:12px; text-align:right;"><span style="padding:4px 10px; border-radius:12px; font-size:12px; font-weight:700; background:rgba(47,191,113,0.15); color:var(--success);">Ready for EFILE</span></td></tr>
      <tr style="border-bottom:1px solid var(--borders);"><td style="padding:12px; font-weight:700; color:var(--royal-blue);">RET-802</td><td style="padding:12px; font-weight:600;">Dhanush (Taxpayer)</td><td style="padding:12px;">T1 Personal / 1040</td><td style="padding:12px;">Apr 30</td><td style="padding:12px; font-weight:700; color:var(--warning);">Ready for Signature</td><td style="padding:12px; text-align:right;"><span style="padding:4px 10px; border-radius:12px; font-size:12px; font-weight:700; background:rgba(244,183,64,0.15); color:var(--warning);">Awaiting Signature</span></td></tr>
    `;
  }
}

function renderRecommendations() {
  const container = document.getElementById('recommendations-container');
  if (!container) return;

  const roleKey = ACA_ROLES.activeRole || 'Customer';
  const roleObj = ACA_ROLES[roleKey] || ACA_ROLES.Customer;

  container.innerHTML = roleObj.aiSuggestions.map(s => `
    <div class="aca-card" style="padding:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 class="section-title" style="fontSize:16px;">${s.title}</h3>
        ${s.savings > 0 ? `<span style="font-weight:800; color:var(--success); font-size:16px;">+$${s.savings}</span>` : ''}
      </div>
      <p class="small-text" style="color:var(--secondary-text); margin-bottom:16px;">${s.desc}</p>
      <button class="btn-primary" style="height:36px; padding:0 18px; font-size:13px;" onclick="openHintDetail('${s.id}')">Review & Apply</button>
    </div>
  `).join('');
}

function setAppTheme(themeMode) {
  localStorage.setItem('aca_theme_mode', themeMode);
  document.querySelectorAll('.theme-card-option').forEach(c => {
    c.style.border = '2px solid var(--borders)';
  });

  const activeCard = document.getElementById(`theme-card-${themeMode}`);
  if (activeCard) activeCard.style.border = '2.5px solid var(--royal-blue)';

  if (themeMode === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (themeMode === 'light') {
    document.body.classList.remove('dark-mode');
  } else if (themeMode === 'system') {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }
}

(function initThemeOnBoot() {
  const savedTheme = localStorage.getItem('aca_theme_mode') || 'light';
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');
})();

// CUSTOMER TAX CALCULATION STATE & INTERACTIVE BREAKDOWN ENGINE
let customerTaxData = {
  employmentIncome: 120000.00,
  usConsultingIncome: 25000.00,
  rrspDeduction: 8500.00,
  homeOfficeDeduction: 2450.00,
  movingExpense: 3550.00,
  foreignTaxCredit: 3450.00,
  includeRRSP: true,
  includeHomeOffice: true,
  includeMoving: true,
  includeForeignCredit: true
};

function getCalculatedCustomerTotals() {
  const totalIncome = customerTaxData.employmentIncome + customerTaxData.usConsultingIncome;
  
  let deductions = 0;
  if (customerTaxData.includeRRSP) deductions += customerTaxData.rrspDeduction;
  if (customerTaxData.includeHomeOffice) deductions += customerTaxData.homeOfficeDeduction;
  if (customerTaxData.includeMoving) deductions += customerTaxData.movingExpense;

  let foreignCredit = customerTaxData.includeForeignCredit ? customerTaxData.foreignTaxCredit : 0;

  const grossTaxOwed = totalIncome * 0.22;
  const netTaxOwed = Math.max(0, grossTaxOwed - foreignCredit);
  const estimatedRefund = Math.max(0, deductions * 0.35 + foreignCredit * 0.35);

  return {
    totalIncome,
    deductions,
    foreignCredit,
    grossTaxOwed,
    netTaxOwed,
    estimatedRefund
  };
}

function updateCustomerDashboardValues() {
  const totals = getCalculatedCustomerTotals();

  const formattedInc = `$${totals.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  const formattedTax = `$${totals.netTaxOwed.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  const formattedRefund = `$${totals.estimatedRefund.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  // Find calculation cards on view-11-results
  const resCards = document.querySelectorAll('#view-11-results .aca-card .h1-text');
  if (resCards && resCards.length >= 3) {
    resCards[0].textContent = formattedInc;
    resCards[1].textContent = formattedTax;
    resCards[2].textContent = formattedRefund;
  }

  // Update table rows on view-11-results
  const tableRows = document.querySelectorAll('#view-11-results table tr td:nth-child(2)');
  if (tableRows && tableRows.length >= 4) {
    tableRows[0].textContent = `$${customerTaxData.employmentIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    tableRows[1].textContent = `$${customerTaxData.usConsultingIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    tableRows[2].textContent = `-$${totals.deductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    tableRows[3].textContent = `-$${totals.foreignCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  }

  // Update KPI card on view-7-dashboard if active role is Customer
  const dashCards = document.querySelectorAll('#view-7-dashboard .kpi-value');
  if (dashCards && dashCards.length > 0) {
    dashCards[0].textContent = formattedRefund;
  }
}

function openTaxBreakdownModal(category) {
  const modal = document.getElementById('tax-item-detail-modal');
  if (!modal) return;

  const modalTitle = document.getElementById('tax-modal-title');
  const modalAmount = document.getElementById('tax-modal-amount');
  const modalCode = document.getElementById('tax-modal-code');
  const modalDesc = document.getElementById('tax-modal-desc');

  const totals = getCalculatedCustomerTotals();

  if (category === 'employment') {
    if (modalTitle) modalTitle.textContent = "Employment & Business Income Audit";
    if (modalAmount) modalAmount.textContent = `$${customerTaxData.employmentIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (modalCode) modalCode.textContent = "CRA Income Tax Act Sec 56(1) & IRS Code Sec 61";
    if (modalDesc) modalDesc.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">
        <div style="padding:12px; background:white; border-radius:8px; border:1px solid var(--borders); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700; color:var(--primary-navy);">T4 Slip #1 - Senior Software Architect Salary</div>
            <div class="caption-text">Employer: Enterprise Tech Corp • CRA RepID Sync</div>
          </div>
          <input type="number" class="form-input" style="width:130px; text-align:right; font-weight:700;" value="${customerTaxData.employmentIncome}" onchange="customerTaxData.employmentIncome = parseFloat(this.value)||0; updateCustomerDashboardValues();">
        </div>
      </div>
    `;
  } else if (category === 'us_consulting') {
    if (modalTitle) modalTitle.textContent = "US Consulting W2 / 1099-NEC Income";
    if (modalAmount) modalAmount.textContent = `$${customerTaxData.usConsultingIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (modalCode) modalCode.textContent = "IRS Internal Revenue Code Sec 871 & CRA Foreign Income";
    if (modalDesc) modalDesc.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">
        <div style="padding:12px; background:white; border-radius:8px; border:1px solid var(--borders); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700; color:var(--primary-navy);">W2 / 1099 Form - US Consulting Services</div>
            <div class="caption-text">Payer: Acme Corp US • Converted @ 1.3650 CAD/USD</div>
          </div>
          <input type="number" class="form-input" style="width:130px; text-align:right; font-weight:700;" value="${customerTaxData.usConsultingIncome}" onchange="customerTaxData.usConsultingIncome = parseFloat(this.value)||0; updateCustomerDashboardValues();">
        </div>
      </div>
    `;
  } else if (category === 'deductions') {
    if (modalTitle) modalTitle.textContent = "Tax Deductions & Write-Offs Audit";
    if (modalAmount) modalAmount.textContent = `-$${totals.deductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (modalCode) modalCode.textContent = "CRA Sub-Subsections 146(5) & Form T777S Home Office";
    if (modalDesc) modalDesc.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
        <label style="padding:12px; background:white; border-radius:8px; border:1px solid var(--borders); display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
          <div>
            <div style="font-weight:700; color:var(--primary-navy);">[RRSP Deduction] Sec 146 Contribution</div>
            <div class="caption-text" style="color:var(--success);">Verified RRSP Contribution Receipt</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-weight:700; color:var(--success);">$8,500.00</span>
            <input type="checkbox" ${customerTaxData.includeRRSP ? 'checked' : ''} onchange="customerTaxData.includeRRSP = this.checked; updateCustomerDashboardValues(); document.getElementById('tax-modal-amount').textContent = '-$' + getCalculatedCustomerTotals().deductions.toLocaleString('en-US', {minimumFractionDigits: 2});">
          </div>
        </label>

        <label style="padding:12px; background:white; border-radius:8px; border:1px solid var(--borders); display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
          <div>
            <div style="font-weight:700; color:var(--primary-navy);">[Home Office Write-Off] Form T777S / Sec 8829</div>
            <div class="caption-text" style="color:var(--royal-blue);">Flat-Rate Work Space in Home</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-weight:700; color:var(--royal-blue);">$2,450.00</span>
            <input type="checkbox" ${customerTaxData.includeHomeOffice ? 'checked' : ''} onchange="customerTaxData.includeHomeOffice = this.checked; updateCustomerDashboardValues(); document.getElementById('tax-modal-amount').textContent = '-$' + getCalculatedCustomerTotals().deductions.toLocaleString('en-US', {minimumFractionDigits: 2});">
          </div>
        </label>

        <label style="padding:12px; background:white; border-radius:8px; border:1px solid var(--borders); display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
          <div>
            <div style="font-weight:700; color:var(--primary-navy);">[Job Relocation] Moving Expenses</div>
            <div class="caption-text" style="color:var(--secondary-text);">Eligible 40km Relocation Claim</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-weight:700; color:var(--primary-navy);">$3,550.00</span>
            <input type="checkbox" ${customerTaxData.includeMoving ? 'checked' : ''} onchange="customerTaxData.includeMoving = this.checked; updateCustomerDashboardValues(); document.getElementById('tax-modal-amount').textContent = '-$' + getCalculatedCustomerTotals().deductions.toLocaleString('en-US', {minimumFractionDigits: 2});">
          </div>
        </label>
      </div>
    `;
  } else if (category === 'foreign_treaty') {
    if (modalTitle) modalTitle.textContent = "Foreign Tax Credit Offset (Article XXIV Treaty)";
    if (modalAmount) modalAmount.textContent = `-$${totals.foreignCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (modalCode) modalCode.textContent = "Canada-US Income Tax Convention Article XXIV & Sec 126";
    if (modalDesc) modalDesc.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
        <label style="padding:12px; background:white; border-radius:8px; border:1px solid var(--borders); display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
          <div>
            <div style="font-weight:700; color:var(--primary-navy);">US Federal Foreign Withholding Tax Credit</div>
            <div class="caption-text" style="color:var(--royal-blue);">Direct offset against CRA Canadian tax liability</div>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-weight:700; color:var(--royal-blue);">$3,450.00</span>
            <input type="checkbox" ${customerTaxData.includeForeignCredit ? 'checked' : ''} onchange="customerTaxData.includeForeignCredit = this.checked; updateCustomerDashboardValues(); document.getElementById('tax-modal-amount').textContent = '-$' + getCalculatedCustomerTotals().foreignCredit.toLocaleString('en-US', {minimumFractionDigits: 2});">
          </div>
        </label>
      </div>
    `;
  }

  modal.classList.remove('hidden-screen');
}

function closeTaxBreakdownModal() {
  const modal = document.getElementById('tax-item-detail-modal');
  if (modal) modal.classList.add('hidden-screen');
}

function autoPopulateCustomerTaxReturn() {
  const btn = document.getElementById('auto-populate-tax-btn');
  if (btn) btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Auto-Populating Slips...`;

  setTimeout(() => {
    customerTaxData.employmentIncome = 120000.00;
    customerTaxData.usConsultingIncome = 25000.00;
    customerTaxData.rrspDeduction = 8500.00;
    customerTaxData.homeOfficeDeduction = 2450.00;
    customerTaxData.movingExpense = 3550.00;
    customerTaxData.foreignTaxCredit = 3450.00;
    customerTaxData.includeRRSP = true;
    customerTaxData.includeHomeOffice = true;
    customerTaxData.includeMoving = true;
    customerTaxData.includeForeignCredit = true;

    updateCustomerDashboardValues();

    if (btn) btn.innerHTML = `<i data-lucide="check-circle"></i> Slips Auto-Populated!`;
    alert("✓ All T4, W2, and RRSP tax slips successfully parsed and auto-populated into your tax return calculation!");
    if (window.lucide) lucide.createIcons();
  }, 800);
}

// STATUTORY TAX CALCULATOR MODAL HANDLERS
function openTaxCalculatorModal() {
  const modal = document.getElementById('modal-tax-calculator');
  if (!modal) return;

  updateTaxCalcStateOptions();
  runTaxCalculatorExecution();
  modal.classList.remove('hidden-screen');
}

function closeTaxCalculatorModal() {
  const modal = document.getElementById('modal-tax-calculator');
  if (modal) modal.classList.add('hidden-screen');
}

function updateTaxCalcStateOptions() {
  const countrySelect = document.getElementById('tax-calc-country');
  const stateSelect = document.getElementById('tax-calc-state');
  const stateGroup = document.getElementById('tax-calc-state-group');
  const stateLabel = document.getElementById('tax-calc-state-label');

  if (!countrySelect || !stateSelect) return;

  const country = countrySelect.value;

  if (country === 'INDIA') {
    if (stateGroup) stateGroup.style.opacity = '0.5';
    if (stateLabel) stateLabel.textContent = "Region / Tax Slab";
    stateSelect.innerHTML = `<option value="ALL">Nationwide 18% GST (9% CGST + 9% SGST)</option>`;
    stateSelect.disabled = true;
  } else {
    if (stateGroup) stateGroup.style.opacity = '1';
    stateSelect.disabled = false;

    if (country === 'USA') {
      if (stateLabel) stateLabel.textContent = "USA State";
      const states = ACA_TAX_RATES['USA'];
      const nameMap = ACA_STATE_NAMES['USA'];

      const codeToName = {};
      Object.keys(nameMap).forEach(k => {
        const code = nameMap[k];
        if (!codeToName[code] || k.length > codeToName[code].length) {
          codeToName[code] = k;
        }
      });

      const options = Object.keys(states).sort().map(code => {
        const rate = (states[code] * 100).toFixed(2);
        const name = codeToName[code] || code;
        return `<option value="${code}" ${code === 'CA' ? 'selected' : ''}>${name} (${code}) - ${rate}%</option>`;
      }).join('');

      stateSelect.innerHTML = options;
    } else if (country === 'CANADA') {
      if (stateLabel) stateLabel.textContent = "Canadian Province / Territory";
      const states = ACA_TAX_RATES['CANADA'];
      const nameMap = ACA_STATE_NAMES['CANADA'];

      const codeToName = {};
      Object.keys(nameMap).forEach(k => {
        const code = nameMap[k];
        if (!codeToName[code] || k.length > codeToName[code].length) {
          codeToName[code] = k;
        }
      });

      const options = Object.keys(states).sort().map(code => {
        const rate = (states[code] * 100).toFixed(2);
        const name = codeToName[code] || code;
        const type = (code === 'ON' || code === 'NB' || code === 'NL' || code === 'NS' || code === 'PE') ? 'HST' : (code === 'QC') ? 'GST+QST' : (code === 'BC' || code === 'MB' || code === 'SK') ? 'GST+PST' : 'GST';
        return `<option value="${code}" ${code === 'ON' ? 'selected' : ''}>${name} (${code}) - ${rate}% (${type})</option>`;
      }).join('');

      stateSelect.innerHTML = options;
    }
  }

  runTaxCalculatorExecution();
}

async function runTaxCalculatorExecution() {
  const countrySelect = document.getElementById('tax-calc-country');
  const stateSelect = document.getElementById('tax-calc-state');
  const amountInput = document.getElementById('tax-calc-amount');

  if (!countrySelect || !amountInput) return;

  const country = countrySelect.value;
  const state = country === 'INDIA' ? null : (stateSelect ? stateSelect.value : null);
  const amount = parseFloat(amountInput.value) || 0;

  try {
    let res = null;

    // Attempt live REST API fetch call to Python backend server on port 8000
    try {
      const apiResp = await fetch('http://localhost:8000/api/calculate-tax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, amount, state })
      });
      if (apiResp.ok) {
        const json = await apiResp.json();
        if (json && json.status === 'success') {
          res = json.data;
        }
      }
    } catch (e) {
      // Fallback seamlessly to local JS calculation engine
    }

    if (!res) {
      res = calculate_tax(country, amount, state);
    }

    const titleEl = document.getElementById('tax-calc-result-title');
    const badgeEl = document.getElementById('tax-calc-rate-badge');
    const baseValEl = document.getElementById('tax-calc-base-val');
    const taxValEl = document.getElementById('tax-calc-tax-val');
    const totalValEl = document.getElementById('tax-calc-total-val');
    const splitEl = document.getElementById('tax-calc-split-details');

    const symbol = country === 'INDIA' ? '₹' : '$';

    if (titleEl) titleEl.textContent = `STATUTORY ${res.country} ${res.state ? '(' + res.state + ')' : ''} TAX ASSESSMENT`;
    if (badgeEl) badgeEl.textContent = `Tax Rate: ${(res.tax_rate * 100).toFixed(2)}% (Python REST API Connected)`;
    if (baseValEl) baseValEl.textContent = `${symbol}${res.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (taxValEl) taxValEl.textContent = `${symbol}${res.tax_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (totalValEl) totalValEl.textContent = `${symbol}${res.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    if (splitEl) {
      if (country === 'INDIA') {
        const cgst = res.tax_amount / 2;
        const sgst = res.tax_amount / 2;
        splitEl.style.display = 'block';
        splitEl.innerHTML = `
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span>CGST (9.00% Central GST):</span> <strong>₹${cgst.toFixed(2)}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>SGST (9.00% State GST):</span> <strong>₹${sgst.toFixed(2)}</strong>
          </div>
        `;
      } else if (country === 'CANADA') {
        splitEl.style.display = 'block';
        let breakdownText = "";
        if (res.state === 'ON' || res.state === 'NS' || res.state === 'NB' || res.state === 'NL' || res.state === 'PE') {
          breakdownText = `Harmonized Sales Tax (HST 15% / 13%) combined federal + provincial tax rate.`;
        } else if (res.state === 'QC') {
          breakdownText = `GST (5%) + QST (9.975%) Quebec Sales Tax combined.`;
        } else {
          breakdownText = `GST (5%) + Provincial Sales Tax (PST) combined rate.`;
        }
        splitEl.innerHTML = `<div>${breakdownText}</div>`;
      } else {
        splitEl.style.display = 'none';
      }
    }
  } catch (err) {
    console.warn("Tax Calc Error:", err);
  }
}

function applyTaxCalcToReturn() {
  const amountInput = document.getElementById('tax-calc-amount');
  const countrySelect = document.getElementById('tax-calc-country');
  const stateSelect = document.getElementById('tax-calc-state');

  const country = countrySelect ? countrySelect.value : 'USA';
  const state = stateSelect ? stateSelect.value : 'CA';
  const amount = parseFloat(amountInput.value) || 0;

  const res = calculate_tax(country, amount, state);

  alert(`✓ Statutory Tax Calculation (${res.country} ${res.state || ''}) Applied to Return!\nBase: $${res.amount.toFixed(2)} | Tax (${(res.tax_rate*100).toFixed(2)}%): $${res.tax_amount.toFixed(2)} | Total: $${res.total_amount.toFixed(2)}`);

  closeTaxCalculatorModal();
  updateCustomerDashboardValues();
}
