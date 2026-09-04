const STORAGE_KEY = "smeRecommendationProductState";
const categories = ["Funding", "Tax", "Marketing", "Compliance", "Operations", "Technology"];
const stageLabels = ["Starting", "Growing", "Scaling"];

const defaultArticles = [
  {
    id: 1,
    title: "Funding options for South African startups",
    summary: "A practical guide to grants, loans, angel investment, and preparing documents investors expect.",
    category: "Funding",
    stage: "Starting",
    readTime: "6 min",
    image: "assets/funding.png",
    trending: 78
  },
  {
    id: 2,
    title: "Small business tax deadlines and records",
    summary: "Organise invoices, provisional tax dates, VAT documents, and SARS-ready monthly records.",
    category: "Tax",
    stage: "Growing",
    readTime: "5 min",
    image: "assets/tax.png",
    trending: 64
  },
  {
    id: 3,
    title: "Marketing channels that work on a tight budget",
    summary: "Compare email, WhatsApp, local search, partnerships, and social campaigns for SME growth.",
    category: "Marketing",
    stage: "Growing",
    readTime: "7 min",
    image: "assets/marketing.png",
    trending: 91
  },
  {
    id: 4,
    title: "POPIA compliance checklist for customer data",
    summary: "A simple checklist for consent, storage, deletion, and privacy notices on digital platforms.",
    category: "Compliance",
    stage: "Scaling",
    readTime: "8 min",
    image: "assets/compliance.png",
    trending: 72
  },
  {
    id: 5,
    title: "Operations dashboard metrics for owner-managers",
    summary: "Track cash flow, lead sources, conversion rates, support issues, and repeat customers.",
    category: "Operations",
    stage: "Scaling",
    readTime: "4 min",
    image: "assets/operations.png",
    trending: 59
  },
  {
    id: 6,
    title: "Choosing digital tools for a lean team",
    summary: "A buying guide for websites, CRM, email, accounting, analytics, and support integrations.",
    category: "Technology",
    stage: "Starting",
    readTime: "6 min",
    image: "assets/technology.png",
    trending: 84
  },
  {
    id: 7,
    title: "How to improve customer retention with email",
    summary: "Turn newsletter signups into repeat visits using segmented campaigns and article recommendations.",
    category: "Marketing",
    stage: "Scaling",
    readTime: "5 min",
    image: "assets/marketing.png",
    trending: 68
  },
  {
    id: 8,
    title: "Tender readiness checklist for service businesses",
    summary: "Prepare company documents, compliance files, pricing schedules, and capability statements.",
    category: "Compliance",
    stage: "Growing",
    readTime: "9 min",
    image: "assets/compliance.png",
    trending: 74
  }
];

const defaultCmsQueue = [
  { id: 101, title: "Export readiness guide for product businesses", category: "Operations", summary: "A guide for SMEs preparing to sell into regional markets.", status: "Pending" },
  { id: 102, title: "How to prepare for a lender meeting", category: "Funding", summary: "A short checklist for bank or development finance meetings.", status: "Pending" },
  { id: 103, title: "Newsletter template for local service firms", category: "Marketing", summary: "Reusable email blocks for driving repeat visits.", status: "Approved" }
];

const defaultCampaigns = [
  { id: 201, name: "Local CRM starter bundle", category: "Technology", budget: 1850, impressions: 4200, status: "Active" },
  { id: 202, name: "SME lending partner spotlight", category: "Funding", budget: 2400, impressions: 5100, status: "Active" },
  { id: 203, name: "Tax season consultation offer", category: "Tax", budget: 1250, impressions: 2900, status: "Paused" }
];

const defaultState = {
  profileName: "Tino M.",
  profileEmail: "tino@sme-demo.co.za",
  authStatus: "Logged in",
  businessName: "Moko Digital Studio",
  sector: "Digital services",
  selectedCategories: ["Funding", "Marketing", "Tax"],
  stage: "Growing",
  selectedArticleId: 1,
  searchTerm: "",
  categoryFilter: "All",
  stageFilter: "All",
  recommendationRefreshes: 0,
  newsletterLeads: 248,
  savedArticleIds: [3],
  ratings: {},
  articles: defaultArticles,
  cmsQueue: defaultCmsQueue,
  campaigns: defaultCampaigns,
  events: [
    "System generated a personalised feed from preferences and article metadata.",
    "User profile loaded from the Users and Preferences tables."
  ]
};

let state = loadState();

const elements = {
  profileName: document.querySelector("#profileName"),
  profileSummary: document.querySelector("#profileSummary"),
  openProfile: document.querySelector("#openProfile"),
  openAuth: document.querySelector("#openAuth"),
  resetDemo: document.querySelector("#resetDemo"),
  profileDialog: document.querySelector("#profileDialog"),
  profileForm: document.querySelector("#profileForm"),
  cancelProfile: document.querySelector("#cancelProfile"),
  closeProfile: document.querySelector("#closeProfile"),
  profileNameInput: document.querySelector("#profileNameInput"),
  profileEmailInput: document.querySelector("#profileEmailInput"),
  authDialog: document.querySelector("#authDialog"),
  authForm: document.querySelector("#authForm"),
  cancelAuth: document.querySelector("#cancelAuth"),
  closeAuth: document.querySelector("#closeAuth"),
  authNameInput: document.querySelector("#authNameInput"),
  authEmailInput: document.querySelector("#authEmailInput"),
  authPasswordInput: document.querySelector("#authPasswordInput"),
  businessName: document.querySelector("#businessName"),
  sectorInput: document.querySelector("#sectorInput"),
  preferenceChips: document.querySelector("#preferenceChips"),
  selectedCount: document.querySelector("#selectedCount"),
  stageRange: document.querySelector("#stageRange"),
  stageLabel: document.querySelector("#stageLabel"),
  searchInput: document.querySelector("#searchInput"),
  searchForm: document.querySelector("#searchForm"),
  categoryFilter: document.querySelector("#categoryFilter"),
  stageFilter: document.querySelector("#stageFilter"),
  recommendationFeed: document.querySelector("#recommendationFeed"),
  articleGrid: document.querySelector("#articleGrid"),
  articleDetail: document.querySelector("#articleDetail"),
  resultCount: document.querySelector("#resultCount"),
  savedGrid: document.querySelector("#savedGrid"),
  clearSaved: document.querySelector("#clearSaved"),
  analyticsChart: document.querySelector("#analyticsChart"),
  eventLog: document.querySelector("#eventLog"),
  recommendationCount: document.querySelector("#recommendationCount"),
  averageScore: document.querySelector("#averageScore"),
  newsletterLeads: document.querySelector("#newsletterLeads"),
  newsletterForm: document.querySelector("#newsletterForm"),
  newsletterStatus: document.querySelector("#newsletterStatus"),
  emailInput: document.querySelector("#emailInput"),
  refreshRecommendations: document.querySelector("#refreshRecommendations"),
  cmsForm: document.querySelector("#cmsForm"),
  cmsTitle: document.querySelector("#cmsTitle"),
  cmsCategory: document.querySelector("#cmsCategory"),
  cmsSummary: document.querySelector("#cmsSummary"),
  editorialQueue: document.querySelector("#editorialQueue"),
  approveTop: document.querySelector("#approveTop"),
  exportReport: document.querySelector("#exportReport"),
  campaignForm: document.querySelector("#campaignForm"),
  campaignName: document.querySelector("#campaignName"),
  campaignCategory: document.querySelector("#campaignCategory"),
  campaignBudget: document.querySelector("#campaignBudget"),
  campaignList: document.querySelector("#campaignList"),
  activeCampaigns: document.querySelector("#activeCampaigns")
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(defaultState);
    return {
      ...structuredClone(defaultState),
      ...saved,
      articles: saved.articles?.length ? saved.articles : defaultArticles,
      cmsQueue: saved.cmsQueue?.length ? saved.cmsQueue : defaultCmsQueue,
      campaigns: saved.campaigns?.length ? saved.campaigns : defaultCampaigns,
      events: saved.events?.length ? saved.events : defaultState.events
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function scoreArticle(article) {
  const selected = new Set(state.selectedCategories);
  const text = `${article.title} ${article.summary} ${article.category}`.toLowerCase();
  let score = Math.round(article.trending * 0.32);
  if (selected.has(article.category)) score += 38;
  if (article.stage === state.stage) score += 17;
  if (state.sector.toLowerCase().includes("digital") && article.category === "Technology") score += 8;
  if (state.searchTerm && text.includes(state.searchTerm)) score += 24;
  if (state.savedArticleIds.includes(article.id)) score += 5;
  if (state.ratings[article.id]) score += Number(state.ratings[article.id]) * 2;
  return Math.min(99, score);
}

function getRecommendations() {
  return [...state.articles]
    .map((article) => ({ ...article, score: scoreArticle(article) }))
    .sort((a, b) => b.score - a.score || b.trending - a.trending)
    .slice(0, 5);
}

function getFilteredArticles() {
  return state.articles.filter((article) => {
    const text = `${article.title} ${article.summary} ${article.category}`.toLowerCase();
    const matchesSearch = !state.searchTerm || text.includes(state.searchTerm);
    const matchesCategory = state.categoryFilter === "All" || article.category === state.categoryFilter;
    const matchesStage = state.stageFilter === "All" || article.stage === state.stageFilter;
    return matchesSearch && matchesCategory && matchesStage;
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function logEvent(message) {
  state.events.unshift(`${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${message}`);
  state.events = state.events.slice(0, 10);
  persist();
  renderEvents();
}

function renderSelectOptions() {
  if (elements.categoryFilter.children.length === 1) {
    categories.forEach((category) => {
      elements.categoryFilter.append(new Option(category, category));
      elements.cmsCategory.append(new Option(category, category));
      elements.campaignCategory.append(new Option(category, category));
    });
  }
  elements.categoryFilter.value = state.categoryFilter;
  elements.stageFilter.value = state.stageFilter;
  elements.cmsCategory.value = "Funding";
  elements.campaignCategory.value = "Technology";
}

function renderProfile() {
  elements.profileName.textContent = state.profileName;
  elements.profileSummary.textContent = `${state.authStatus} - ${state.stage} ${state.sector.toLowerCase()} owner focused on ${state.selectedCategories.slice(0, 3).join(", ").toLowerCase() || "business growth"}.`;
  elements.profileNameInput.value = state.profileName;
  elements.profileEmailInput.value = state.profileEmail;
  elements.authNameInput.value = state.profileName;
  elements.authEmailInput.value = state.profileEmail;
  elements.businessName.value = state.businessName;
  elements.sectorInput.value = state.sector;
  elements.stageRange.value = stageLabels.indexOf(state.stage);
  elements.stageLabel.textContent = state.stage;
}

function renderPreferences() {
  elements.preferenceChips.innerHTML = "";
  categories.forEach((category) => {
    const selected = state.selectedCategories.includes(category);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip ${selected ? "selected" : ""}`;
    button.setAttribute("aria-pressed", String(selected));
    button.textContent = category;
    button.addEventListener("click", () => {
      state.selectedCategories = selected
        ? state.selectedCategories.filter((item) => item !== category)
        : [...state.selectedCategories, category];
      logEvent(`Preference updated: ${category}.`);
      render();
    });
    elements.preferenceChips.append(button);
  });
  elements.selectedCount.textContent = `${state.selectedCategories.length} selected`;
}

function articleCardHtml(article, options = {}) {
  const rating = state.ratings[article.id] || 0;
  const saved = state.savedArticleIds.includes(article.id);
  return `
    <img class="thumb" src="${article.image}" alt="${escapeHtml(article.category)} article thumbnail">
    <div class="card-body">
      <h3 class="card-title">${escapeHtml(article.title)}</h3>
      <p class="card-copy">${escapeHtml(article.summary)}</p>
      <div class="meta">
        <span class="tag">${escapeHtml(article.category)}</span>
        <span class="tag">${escapeHtml(article.stage)}</span>
        <span class="tag">${escapeHtml(article.readTime)}</span>
      </div>
      <div class="card-actions">
        <button type="button" data-action="open" data-id="${article.id}" class="secondary-button">Open</button>
        <button type="button" data-action="save" data-id="${article.id}" class="secondary-button">${saved ? "Saved" : "Save"}</button>
        <button type="button" data-action="rate" data-id="${article.id}" class="secondary-button">Rate ${rating || ""}</button>
      </div>
    </div>
    ${options.score ? `<strong class="score">${options.score}% match</strong>` : ""}
  `;
}

function renderRecommendations() {
  const recommendations = getRecommendations();
  elements.recommendationFeed.innerHTML = "";
  recommendations.forEach((article) => {
    const card = document.createElement("article");
    card.className = "recommendation";
    card.innerHTML = articleCardHtml(article, { score: article.score });
    elements.recommendationFeed.append(card);
  });

  const average = recommendations.length
    ? Math.round(recommendations.reduce((sum, item) => sum + item.score, 0) / recommendations.length)
    : 0;
  elements.recommendationCount.textContent = recommendations.length + state.recommendationRefreshes;
  elements.averageScore.textContent = `${average}%`;
}

function renderArticles() {
  const filtered = getFilteredArticles();
  elements.articleGrid.innerHTML = "";
  elements.resultCount.textContent = `${filtered.length} results`;

  if (!filtered.length) {
    elements.articleGrid.innerHTML = `<p class="empty-state">No articles match the current filters.</p>`;
    return;
  }

  filtered.forEach((article) => {
    const card = document.createElement("article");
    card.className = "article-card";
    card.innerHTML = articleCardHtml(article);
    elements.articleGrid.append(card);
  });
}

function renderDetail() {
  const article = state.articles.find((item) => item.id === state.selectedArticleId) || state.articles[0];
  if (!article) return;
  const saved = state.savedArticleIds.includes(article.id);
  const rating = state.ratings[article.id] || 0;
  elements.articleDetail.innerHTML = `
    <img class="detail-image" src="${article.image}" alt="${escapeHtml(article.category)} feature image">
    <h2>${escapeHtml(article.title)}</h2>
    <p>${escapeHtml(article.summary)}</p>
    <div class="meta">
      <span class="tag">${escapeHtml(article.category)}</span>
      <span class="tag">${escapeHtml(article.stage)}</span>
      <span class="tag">${escapeHtml(article.readTime)}</span>
      <span class="tag">${scoreArticle(article)}% match</span>
      ${rating ? `<span class="tag">Rated ${rating}/5</span>` : ""}
    </div>
    <div class="detail-actions">
      <button type="button" data-action="save" data-id="${article.id}">${saved ? "Saved" : "Save resource"}</button>
      <button type="button" data-action="rate" data-id="${article.id}" class="secondary-button">Rate quality</button>
    </div>
  `;
}

function renderSaved() {
  const savedArticles = state.articles.filter((article) => state.savedArticleIds.includes(article.id));
  if (!savedArticles.length) {
    elements.savedGrid.innerHTML = `<p class="empty-state">Saved articles will appear here after users bookmark resources.</p>`;
    return;
  }
  elements.savedGrid.innerHTML = "";
  savedArticles.forEach((article) => {
    const card = document.createElement("article");
    card.className = "saved-card";
    card.innerHTML = `
      <strong>${escapeHtml(article.title)}</strong>
      <span>${escapeHtml(article.category)} - ${escapeHtml(article.readTime)}</span>
      <button type="button" data-action="open" data-id="${article.id}" class="secondary-button">Open</button>
    `;
    elements.savedGrid.append(card);
  });
}

function renderQueue() {
  elements.editorialQueue.innerHTML = "";
  state.cmsQueue.forEach((item) => {
    const row = document.createElement("article");
    row.className = `queue-item ${item.status.toLowerCase()}`;
    row.innerHTML = `
      <div>
        <h3 class="card-title">${escapeHtml(item.title)}</h3>
        <p class="card-copy">${escapeHtml(item.summary)}</p>
        <div class="meta"><span class="tag">${escapeHtml(item.category)}</span></div>
      </div>
      <span class="status-pill">${escapeHtml(item.status)}</span>
    `;
    elements.editorialQueue.append(row);
  });
}

function renderCampaigns() {
  const activeCount = state.campaigns.filter((campaign) => campaign.status === "Active").length;
  elements.activeCampaigns.textContent = `${activeCount} active`;
  elements.campaignList.innerHTML = "";
  state.campaigns.forEach((campaign) => {
    const row = document.createElement("article");
    row.className = `campaign-card ${campaign.status.toLowerCase()}`;
    row.innerHTML = `
      <div>
        <h3 class="card-title">${escapeHtml(campaign.name)}</h3>
        <p class="card-copy">${escapeHtml(campaign.category)} campaign - R${Number(campaign.budget).toLocaleString("en-ZA")} budget - ${Number(campaign.impressions).toLocaleString("en-ZA")} impressions</p>
      </div>
      <div class="campaign-actions">
        <span class="status-pill">${escapeHtml(campaign.status)}</span>
        <button type="button" data-action="campaign" data-id="${campaign.id}" class="secondary-button">${campaign.status === "Active" ? "Pause" : "Activate"}</button>
      </div>
    `;
    elements.campaignList.append(row);
  });
}

function renderAnalytics() {
  const rows = categories.map((category) => {
    const categoryArticles = state.articles.filter((article) => article.category === category);
    const campaignLift = state.campaigns
      .filter((campaign) => campaign.category === category && campaign.status === "Active")
      .reduce((sum, campaign) => sum + campaign.impressions / 180, 0);
    const views = categoryArticles.reduce((sum, article) => sum + article.trending + (state.ratings[article.id] || 0) * 3, 0) + campaignLift;
    const score = Math.min(99, Math.round(views / Math.max(1, categoryArticles.length)));
    return { category, score };
  });
  elements.analyticsChart.innerHTML = rows
    .map((row) => `
      <div class="bar-row">
        <strong>${row.category}</strong>
        <div class="bar-track"><span class="bar-fill" style="width: ${row.score}%"></span></div>
        <span>${row.score}%</span>
      </div>
    `)
    .join("");
  elements.newsletterLeads.textContent = state.newsletterLeads;
}

function renderEvents() {
  elements.eventLog.innerHTML = state.events.map((event) => `<p>${escapeHtml(event)}</p>`).join("");
}

function render() {
  renderSelectOptions();
  renderProfile();
  renderPreferences();
  renderRecommendations();
  renderArticles();
  renderDetail();
  renderSaved();
  renderQueue();
  renderCampaigns();
  renderAnalytics();
  renderEvents();
  persist();
}

function openArticle(id) {
  const article = state.articles.find((item) => item.id === id);
  if (!article) return;
  state.selectedArticleId = id;
  logEvent(`Read event captured for "${article.title}".`);
  renderDetail();
}

function toggleSave(id) {
  const article = state.articles.find((item) => item.id === id);
  if (!article) return;
  const saved = state.savedArticleIds.includes(id);
  state.savedArticleIds = saved
    ? state.savedArticleIds.filter((articleId) => articleId !== id)
    : [...state.savedArticleIds, id];
  logEvent(`${saved ? "Removed saved resource" : "Bookmarked resource"}: "${article.title}".`);
  render();
}

function rateArticle(id) {
  const current = Number(state.ratings[id] || 0);
  const next = current >= 5 ? 1 : current + 1;
  const article = state.articles.find((item) => item.id === id);
  state.ratings[id] = next;
  logEvent(`Recommendation feedback stored for "${article?.title || "article"}": ${next}/5.`);
  render();
}

function toggleCampaign(id) {
  const campaign = state.campaigns.find((item) => item.id === id);
  if (!campaign) return;
  campaign.status = campaign.status === "Active" ? "Paused" : "Active";
  logEvent(`Advertiser campaign ${campaign.status.toLowerCase()}: "${campaign.name}".`);
  render();
}

function handleAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "open") openArticle(id);
  if (button.dataset.action === "save") toggleSave(id);
  if (button.dataset.action === "rate") rateArticle(id);
  if (button.dataset.action === "campaign") toggleCampaign(id);
}

document.addEventListener("click", handleAction);

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.searchTerm = elements.searchInput.value.trim().toLowerCase();
  logEvent(state.searchTerm ? `Search query processed: "${state.searchTerm}".` : "Search cleared.");
  render();
});

elements.categoryFilter.addEventListener("change", () => {
  state.categoryFilter = elements.categoryFilter.value;
  logEvent(`Library filtered by ${state.categoryFilter}.`);
  render();
});

elements.stageFilter.addEventListener("change", () => {
  state.stageFilter = elements.stageFilter.value;
  logEvent(`Stage filter changed to ${state.stageFilter}.`);
  render();
});

elements.stageRange.addEventListener("input", () => {
  state.stage = stageLabels[Number(elements.stageRange.value)];
  logEvent(`Business stage changed to ${state.stage}.`);
  render();
});

elements.businessName.addEventListener("change", () => {
  state.businessName = elements.businessName.value.trim() || defaultState.businessName;
  logEvent(`Business profile updated for ${state.businessName}.`);
  render();
});

elements.sectorInput.addEventListener("change", () => {
  state.sector = elements.sectorInput.value;
  logEvent(`Sector changed to ${state.sector}.`);
  render();
});

elements.openProfile.addEventListener("click", () => elements.profileDialog.showModal());
elements.cancelProfile.addEventListener("click", () => elements.profileDialog.close());
elements.closeProfile.addEventListener("click", () => elements.profileDialog.close());
elements.openAuth.addEventListener("click", () => elements.authDialog.showModal());
elements.cancelAuth.addEventListener("click", () => elements.authDialog.close());
elements.closeAuth.addEventListener("click", () => elements.authDialog.close());
elements.resetDemo.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(defaultState);
  elements.newsletterStatus.textContent = "";
  render();
});

elements.profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.profileName = elements.profileNameInput.value.trim() || defaultState.profileName;
  state.profileEmail = elements.profileEmailInput.value.trim() || defaultState.profileEmail;
  logEvent(`Profile saved for ${state.profileName}.`);
  elements.profileDialog.close();
  render();
});

elements.authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fullName = elements.authNameInput.value.trim();
  state.profileName = fullName ? fullName.split(" ")[0] : defaultState.profileName;
  state.profileEmail = elements.authEmailInput.value.trim() || defaultState.profileEmail;
  state.authStatus = "Logged in";
  logEvent(`Registration/login session stored for ${state.profileEmail}.`);
  elements.authDialog.close();
  render();
});

elements.newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = elements.emailInput.value.trim();
  state.newsletterLeads += 1;
  elements.newsletterStatus.textContent = `Subscribed ${email}.`;
  logEvent(`Newsletter subscription stored for ${email}.`);
  elements.newsletterForm.reset();
  render();
});

elements.campaignForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const campaign = {
    id: Date.now(),
    name: elements.campaignName.value.trim(),
    category: elements.campaignCategory.value,
    budget: Number(elements.campaignBudget.value || 0),
    impressions: 0,
    status: "Active"
  };
  state.campaigns.unshift(campaign);
  logEvent(`Advertiser campaign created for ${campaign.category}: "${campaign.name}".`);
  elements.campaignForm.reset();
  elements.campaignBudget.value = 1250;
  render();
});

elements.refreshRecommendations.addEventListener("click", () => {
  state.recommendationRefreshes += 1;
  logEvent("Recommendation model refreshed using behaviour logs and current preferences.");
  render();
});

elements.approveTop.addEventListener("click", () => {
  const nextPending = state.cmsQueue.find((item) => item.status === "Pending");
  if (!nextPending) {
    logEvent("Editorial queue has no pending content.");
    return;
  }
  nextPending.status = "Approved";
  const newArticle = {
    id: Math.max(...state.articles.map((article) => article.id)) + 1,
    title: nextPending.title,
    summary: nextPending.summary,
    category: nextPending.category,
    stage: state.stage,
    readTime: "5 min",
    image: `assets/${nextPending.category.toLowerCase()}.png`,
    trending: 52
  };
  state.articles.push(newArticle);
  logEvent(`CMS approval published "${nextPending.title}" to the article database.`);
  render();
});

elements.cmsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = {
    id: Date.now(),
    title: elements.cmsTitle.value.trim(),
    category: elements.cmsCategory.value,
    summary: elements.cmsSummary.value.trim(),
    status: "Pending"
  };
  state.cmsQueue.unshift(item);
  logEvent(`Content writer submitted "${item.title}" for editorial review.`);
  elements.cmsForm.reset();
  render();
});

elements.clearSaved.addEventListener("click", () => {
  state.savedArticleIds = [];
  logEvent("Saved resources cleared.");
  render();
});

elements.exportReport.addEventListener("click", () => {
  const report = {
    generatedAt: new Date().toISOString(),
    profile: {
      name: state.profileName,
      email: state.profileEmail,
      businessName: state.businessName,
      sector: state.sector,
      stage: state.stage,
      preferences: state.selectedCategories
    },
    recommendations: getRecommendations().map(({ title, category, score }) => ({ title, category, score })),
    campaigns: state.campaigns,
    savedArticleIds: state.savedArticleIds,
    newsletterLeads: state.newsletterLeads,
    recentEvents: state.events
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "sme-recommendation-report.json";
  link.click();
  URL.revokeObjectURL(url);
  logEvent("Analytics report exported as JSON.");
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".main-nav a").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

function setActiveMobileScreen(screen) {
  const screenMap = {
    home: "home",
    search: "home",
    saved: "home",
    profile: "profile",
    article: "article"
  };
  const target = screenMap[screen] || "home";
  document.querySelectorAll(".phone-shell").forEach((shell) => {
    shell.classList.toggle("active", shell.dataset.mobileScreen === target);
  });
  document.querySelectorAll(".bottom-tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screen);
  });
}

document.querySelectorAll(".bottom-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    const screen = button.dataset.screen;
    setActiveMobileScreen(screen);
    logEvent(`Mobile app ${screen} tab selected in the design preview.`);
  });
});

document.querySelectorAll(".phone-card").forEach((card) => {
  card.addEventListener("click", () => {
    setActiveMobileScreen("article");
    logEvent("Mobile article card tap opens the article detail screen.");
  });
});

render();
