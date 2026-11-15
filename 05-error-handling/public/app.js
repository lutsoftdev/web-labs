import { fetchWithResilience } from "./lib/http.js";
import { getOrReuseKey } from "./lib/idempotency.js";

const out = document.getElementById("out");
const banner = document.getElementById("banner");
const submitBtn = document.getElementById("submit");
const doubleBtn = document.getElementById("double");
let fails = 0;

function setDegraded(on) {
  banner.style.display = on ? "block" : "none";
  submitBtn.disabled = on;
  doubleBtn.disabled = on;
}

async function createOrder(title) {
  const payload = { title };
  const idemKey = await getOrReuseKey(payload);
  const res = await fetchWithResilience("http://localhost:8081/orders", {
    method: "POST",
    body: JSON.stringify(payload),
    idempotencyKey: idemKey,
    retry: { retries: 2, baseDelayMs: 300, timeoutMs: 3500, jitter: true },
  });
  if (!res.ok) {
    fails += 1;
    if (fails >= 3) setDegraded(true);
  } else {
    fails = 0;
    setDegraded(false);
  }
  return res.json();
}

submitBtn.onclick = async () => {
  const title = document.getElementById("title").value;
  try {
    const data = await createOrder(title);
    out.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    fails += 1;
    if (fails >= 3) setDegraded(true);
    out.textContent = String(e);
  }
};

doubleBtn.onclick = async () => {
  const title = document.getElementById("title").value;
  const payload = { title };
  const key = await getOrReuseKey(payload);
  const opts = {
    method: "POST",
    body: JSON.stringify(payload),
    idempotencyKey: key,
    retry: { retries: 2, baseDelayMs: 300, timeoutMs: 3500, jitter: true },
  };
  const [a, b] = await Promise.all([
    fetchWithResilience("http://localhost:8081/orders", opts),
    fetchWithResilience("http://localhost:8081/orders", opts),
  ]);
  const ja = await a.json();
  const jb = await b.json();
  out.textContent = JSON.stringify({ a: ja, b: jb, sameId: ja.id === jb.id }, null, 2);
};
