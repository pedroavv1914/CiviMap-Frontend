const BASE = "/api/v1";
function authHeader() {
  const t = localStorage.getItem("token");
  return t ? { Authorization: "Bearer " + t } : {};
}
export async function signup({ name, email, password }) {
  const r = await fetch(BASE + "/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
  if (!r.ok) throw new Error("signup_failed");
  return r.json();
}
export async function login({ email, password }) {
  const r = await fetch(BASE + "/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  if (!r.ok) throw new Error("login_failed");
  return r.json();
}
export async function getIssues(params = {}) {
  const q = new URLSearchParams(params).toString();
  const r = await fetch(BASE + "/issues" + (q ? "?" + q : ""));
  if (!r.ok) throw new Error("issues_failed");
  return r.json();
}
export async function getIssue(id) {
  const r = await fetch(BASE + "/issues/" + id);
  if (!r.ok) throw new Error("issue_failed");
  return r.json();
}
export async function createIssue(payload) {
  const r = await fetch(BASE + "/issues", { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify(payload) });
  if (!r.ok) throw new Error("create_failed");
  return r.json();
}
export async function uploadIssuePhotos(id, files) {
  const fd = new FormData();
  for (const f of files) fd.append("photos", f);
  const r = await fetch(BASE + "/issues/" + id + "/photos", { method: "POST", headers: { ...authHeader() }, body: fd });
  if (!r.ok) throw new Error("upload_failed");
  return r.json();
}
export async function toggleVote(id) {
  const r = await fetch(BASE + "/issues/" + id + "/votes", { method: "POST", headers: { ...authHeader() } });
  if (!r.ok) throw new Error("vote_failed");
  return r.json();
}
export async function getComments(id) {
  const r = await fetch(BASE + "/issues/" + id + "/comments");
  if (!r.ok) throw new Error("comments_failed");
  return r.json();
}
export async function postComment(id, content) {
  const r = await fetch(BASE + "/issues/" + id + "/comments", { method: "POST", headers: { "Content-Type": "application/json", ...authHeader() }, body: JSON.stringify({ content }) });
  if (!r.ok) throw new Error("comment_failed");
  return r.json();
}
