function apiFetch(url, options = {}) {
  return fetch(url, options).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}

export function getCaseStudies() {
  return apiFetch("https://ftk-api.pages.dev/case-studies");
}

export function getTeamMembers() {
  return apiFetch("https://ftk-api.pages.dev/team");
}

export function getFinancial() {
  return apiFetch("https://ftk-api.pages.dev/financial-projections");
}

export function getExperience() {
  return apiFetch("https://ftk-api.pages.dev/experience");
}

export function getValue() {
  return apiFetch("https://ftk-api.pages.dev/core-values");
}

export function getFaq() {
  return apiFetch("https://ftk-api.pages.dev/faq");
}
