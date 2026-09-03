import { useEffect, useMemo, useState } from "react";
import { ExternalLink, RefreshCw, X, Zap } from "lucide-react";
import type { AppState, ProfileSummary, QuotaPool } from "./shared/types";
import { primaryPool, quotaPercent } from "./shared/utils";
import { formatResetCountdown, getApi, resolveTheme } from "./ui-utils";

function visiblePools(profile: ProfileSummary): QuotaPool[] {
  if (profile.usage?.pools?.length) {
    return profile.usage.pools.filter((pool) => pool.limit !== undefined).slice(0, 3);
  }
  const legacyPools: QuotaPool[] = [];
  if (profile.usage?.fiveHour) legacyPools.push({ id: "five-hour", label: "5 小时", status: "available", ...profile.usage.fiveHour });
  if (profile.usage?.weekly) legacyPools.push({ id: "weekly", label: "每周", status: "available", ...profile.usage.weekly });
  if (profile.usage?.monthly) legacyPools.push({ id: "monthly", label: "每月", status: "available", ...profile.usage.monthly });
  if (profile.usage?.credits) legacyPools.push({ id: "credits", label: "Credits", status: "available", ...profile.usage.credits });
  return legacyPools.slice(0, 3);
}

function poolPercent(pool: QuotaPool): number | undefined {
  if (pool.remaining === undefined || pool.limit === undefined || pool.limit <= 0) return undefined;
  return Math.max(0, Math.min(100, pool.remaining / pool.limit * 100));
}

export function AccountBar() {
  const [state, setState] = useState<AppState>();
  const [busyId, setBusyId] = useState<string>();
  const [message, setMessage] = useState<string>();
  const api = getApi();

  async function load() {
    if (!api) return;
    try {
      setState(await api.getState());
    } catch {
      setMessage("无法读取账号状态，请打开完整 Relay 查看详情。");
    }
  }

  useEffect(() => {
    void load();
    if (!api) return;
    return api.stateChanged(() => void load());
  }, []);

  useEffect(() => {
    if (!state) return;
    const theme = resolveTheme(state.settings.theme);
    document.documentElement.dataset.theme = theme;
    api?.setTheme(theme);
  }, [state?.settings.theme]);

  const profiles = useMemo(
    () => [...(state?.profiles ?? [])].sort((a, b) => Number(b.isActive) - Number(a.isActive)),
    [state?.profiles]
  );

  async function switchTo(profile: ProfileSummary) {
    if (!api || profile.isActive || busyId) return;
    setBusyId(profile.id);
    setMessage(`正在切换到 ${profile.name}…`);
    try {
      await api.switchProfile({ profileId: profile.id });
      await load();
      setMessage(`已切换到 ${profile.name}`);
    } catch {
      setMessage("切换失败，请打开完整 Relay 查看详情。");
    } finally {
      setBusyId(undefined);
    }
  }

  async function refresh(profile: ProfileSummary) {
    if (!api || busyId) return;
    setBusyId(profile.id);
    try {
      await api.refreshUsage({ profileId: profile.id });
      await load();
      setMessage("额度已刷新");
    } catch {
      setMessage("额度刷新失败，请稍后重试。");
    } finally {
      setBusyId(undefined);
    }
  }

  return (
    <main className="account-bar-shell">
      <header className="account-bar-header">
        <div className="account-bar-brand"><Zap size={15} /> Relay</div>
        <div className="account-bar-actions">
          <button title="打开完整 Relay" onClick={() => void api?.showMainWindow()}><ExternalLink size={14} /></button>
          <button title="隐藏账号栏（Ctrl+Shift+Space 可重新打开）" onClick={() => void api?.hideAccountBar()}><X size={14} /></button>
        </div>
      </header>

      <section className="account-bar-summary">
        <span>{profiles.length} 个账号</span>
        <span className={state?.settings.serviceRunning ? "service-live" : ""}>
          {state?.settings.serviceRunning ? "● 额度监控中" : "监控已暂停"}
        </span>
      </section>

      <section className="account-bar-list">
        {profiles.map((profile) => {
          const percent = quotaPercent(profile.usage);
          const pool = primaryPool(profile.usage);
          const pools = visiblePools(profile);
          const limited = profile.usage?.status === "available" && (pool?.remaining ?? 0) <= 0;
          return (
            <article className={`account-bar-card${profile.isActive ? " active" : ""}`} key={profile.id}>
              <button className="account-bar-switch" disabled={profile.isActive || Boolean(busyId) || limited} onClick={() => void switchTo(profile)}>
                <span className="account-bar-avatar">{(profile.name || profile.email || "?").slice(0, 1).toUpperCase()}</span>
                <span className="account-bar-identity">
                  <strong>{profile.name}</strong>
                  <small>{profile.email || profile.usage?.planType || "ChatGPT"}</small>
                </span>
                <span className={`account-bar-percent${limited ? " limited" : ""}`}>
                  {busyId === profile.id ? "…" : percent === undefined ? "—" : `${Math.round(percent)}%`}
                </span>
              </button>
              {pools.length > 0 ? (
                <div className="account-bar-pools">
                  {pools.map((quotaPool) => {
                    const quotaPercentValue = poolPercent(quotaPool);
                    return (
                      <div className="account-bar-pool" key={quotaPool.id}>
                        <div className="account-bar-pool-label">
                          <span>{quotaPool.label}</span>
                          <strong>{quotaPercentValue === undefined ? "—" : `${Math.round(quotaPercentValue)}%`}</strong>
                        </div>
                        <div className="account-bar-meter"><span style={{ width: `${quotaPercentValue ?? 0}%` }} /></div>
                        {quotaPool.resetAt && <small>{formatResetCountdown(quotaPool.resetAt)}</small>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="account-bar-unavailable">额度暂不可用，点击刷新重试</div>
              )}
              <div className="account-bar-card-footer">
                <span>{profile.isActive ? "当前账号" : limited ? "等待重置" : "点击切换"}</span>
                <button title="刷新额度" disabled={Boolean(busyId)} onClick={() => void refresh(profile)}><RefreshCw size={12} /></button>
              </div>
            </article>
          );
        })}
        {profiles.length === 0 && <div className="account-bar-empty">请先在完整 Relay 中添加账号。</div>}
      </section>

      {message && <footer className="account-bar-message" onClick={() => setMessage(undefined)}>{message}</footer>}
      <button className="account-bar-hint" title="隐藏后单击系统托盘 Relay 图标即可显示" onClick={() => void api?.hideAccountBar()}>
        点击隐藏账号栏 · Ctrl + Shift + Space
      </button>
    </main>
  );
}
