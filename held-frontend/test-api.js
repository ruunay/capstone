/**
 * Held API Test Runner
 * Run from the held-frontend directory: node test-api.js
 * Requires Node 18+ (uses built-in fetch).
 */

const BASE = "http://localhost:8080";

// Unique test user so runs don't conflict
const ts = Date.now();
const TEST_USER = {
  username: `testuser_${ts}`,
  email:    `test_${ts}@held.test`,
  password: "Password123!",
};

let token   = null;
let userId  = null;
let entryId = null;

const results = [];

// ── Helpers ────────────────────────────────────────────────────────────────

const clr = {
  green:  (s) => `\x1b[32m${s}\x1b[0m`,
  red:    (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan:   (s) => `\x1b[36m${s}\x1b[0m`,
  grey:   (s) => `\x1b[90m${s}\x1b[0m`,
  bold:   (s) => `\x1b[1m${s}\x1b[0m`,
};

async function request(method, path, body, auth = true) {
  const headers = { "Content-Type": "application/json" };
  if (auth && token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }

  if (!res.ok) {
    const msg = typeof data === "object" ? JSON.stringify(data) : data;
    throw new Error(`HTTP ${res.status} — ${msg}`);
  }
  return { status: res.status, data };
}

async function run(name, fn) {
  try {
    const result = await fn();
    results.push({ name, pass: true });
    const preview = result != null
      ? clr.grey(JSON.stringify(result).slice(0, 100) + (JSON.stringify(result).length > 100 ? "…" : ""))
      : "";
    console.log(`  ${clr.green("✓ PASS")}  ${name}`);
    if (preview) console.log(`         ${preview}`);
    return result;
  } catch (err) {
    results.push({ name, pass: false, error: err.message });
    console.log(`  ${clr.red("✗ FAIL")}  ${name}`);
    console.log(`         ${clr.red(err.message.slice(0, 160))}`);
    return null;
  }
}

function skip(name, reason) {
  results.push({ name, pass: null });
  console.log(`  ${clr.yellow("⏭ SKIP")}  ${name} ${clr.grey(`(${reason})`)}`);
}

function section(title) {
  console.log(`\n${clr.cyan(clr.bold(`── ${title} ─────────────────────────────────────`))}`);
}

// ── Tests ──────────────────────────────────────────────────────────────────

async function main() {
  console.log(clr.bold("\n🌸 Held API Test Runner"));
  console.log(clr.grey(`   Base URL : ${BASE}`));
  console.log(clr.grey(`   Test user: ${TEST_USER.email}\n`));

  // ── Auth ──────────────────────────────────────────────────────────────
  section("AUTH");

  const reg = await run("Register new user", async () => {
    const { data } = await request("POST", "/api/auth/register", TEST_USER, false);
    if (!data.token) throw new Error("No token in response");
    token  = data.token;
    userId = data.id;
    return { id: data.id, role: data.role };
  });

  const login = await run("Login with registered credentials", async () => {
    const { data } = await request("POST", "/api/auth/login", {
      email:    TEST_USER.email,
      password: TEST_USER.password,
    }, false);
    if (!data.token) throw new Error("No token in response");
    token  = data.token;
    userId = data.id;
    return { id: data.id, role: data.role };
  });

  if (!token || !userId) {
    console.log(clr.red("\n  Cannot continue — no token available. Is the backend running on port 8080?\n"));
    process.exit(1);
  }

  // ── Journal Entries ───────────────────────────────────────────────────
  section("JOURNAL ENTRIES");

  const created = await run("Create journal entry", async () => {
    const { data } = await request("POST", `/api/journal-entries/user/${userId}`, {
      title:         "Test Entry",
      content:       "This is a test journal entry written during automated API testing.",
      moodType:      "grateful",
      moodIntensity: 8,
    });
    if (!data.id) throw new Error("No entry ID returned");
    entryId = data.id;
    return { id: data.id, title: data.title, moodType: data.moodType };
  });

  await run("Get all entries for user", async () => {
    const { data } = await request("GET", `/api/journal-entries/user/${userId}`);
    if (!Array.isArray(data)) throw new Error("Expected array");
    return { count: data.length };
  });

  if (entryId) {
    await run("Get single entry by ID", async () => {
      const { data } = await request("GET", `/api/journal-entries/${entryId}`);
      if (data.id !== entryId) throw new Error("ID mismatch");
      return { id: data.id, title: data.title };
    });

    await run("Update journal entry", async () => {
      const { data } = await request("PUT", `/api/journal-entries/${entryId}`, {
        title:         "Updated Test Entry",
        content:       "This entry has been updated during automated testing.",
        moodType:      "happy",
        moodIntensity: 9,
      });
      return { id: data.id, title: data.title };
    });
  } else {
    skip("Get single entry by ID", "no entryId from create");
    skip("Update journal entry",   "no entryId from create");
  }

  // ── Prompts ───────────────────────────────────────────────────────────
  section("PROMPTS");

  let firstPromptId = null;

  await run("Get all prompts", async () => {
    const { data } = await request("GET", "/api/prompts");
    if (!Array.isArray(data)) throw new Error("Expected array");
    if (data.length > 0) firstPromptId = data[0].id;
    return { count: data.length };
  });

  // ── Responses ─────────────────────────────────────────────────────────
  section("RESPONSES");

  if (entryId && firstPromptId) {
    await run("Create entry response", async () => {
      const { data } = await request("POST", "/api/responses", {
        entryId,
        promptId:     firstPromptId,
        responseText: "This is my reflection on this prompt during testing.",
      });
      return data;
    });

    await run("Get responses for entry", async () => {
      const { data } = await request("GET", `/api/responses/entry/${entryId}`);
      if (!Array.isArray(data)) throw new Error("Expected array");
      return { count: data.length };
    });
  } else {
    skip("Create entry response",    entryId ? "no prompts available" : "no entryId available");
    skip("Get responses for entry",  "depends on create");
  }

  // ── Cleanup: delete the test entry ────────────────────────────────────
  section("CLEANUP");

  if (entryId) {
    await run("Delete test journal entry", async () => {
      const { status } = await request("DELETE", `/api/journal-entries/${entryId}`);
      if (![200, 204].includes(status)) throw new Error(`Unexpected status ${status}`);
      return { deleted: entryId };
    });
  } else {
    skip("Delete test journal entry", "no entryId available");
  }

  // ── Summary ───────────────────────────────────────────────────────────
  const passed  = results.filter((r) => r.pass === true).length;
  const failed  = results.filter((r) => r.pass === false).length;
  const skipped = results.filter((r) => r.pass === null).length;

  console.log(`\n${"─".repeat(50)}`);
  console.log(clr.bold("📊 Results"));
  console.log(`   ${clr.green(`${passed} passed`)}  ·  ${failed > 0 ? clr.red(`${failed} failed`) : clr.grey("0 failed")}  ·  ${clr.yellow(`${skipped} skipped`)}`);

  if (failed > 0) {
    console.log(clr.red("\n  Failed tests:"));
    results
      .filter((r) => r.pass === false)
      .forEach((r) => console.log(clr.red(`  • ${r.name}: ${r.error || ""}`)));
    console.log();
    process.exit(1);
  } else {
    console.log(clr.green("\n  ✨ All tests passed!\n"));
  }
}

main().catch((err) => {
  console.error(clr.red(`\nFatal error: ${err.message}`));
  process.exit(1);
});
