import { useSyncExternalStore } from "react";
import type { Trade } from "./types";

const KEY = "vorqexa-journal-v1";
const EMPTY: Trade[] = [];
const listeners = new Set<() => void>();
let cache: Trade[] | null = null;

function read(): Trade[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getSnapshot(): Trade[] {
  if (cache === null) cache = read();
  return cache;
}

function getServerSnapshot(): Trade[] {
  return EMPTY;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function commit(next: Trade[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage full or blocked: the trade stays in memory for this visit
  }
  listeners.forEach((l) => l());
}

export function saveTrade(t: Trade) {
  const list = getSnapshot();
  const i = list.findIndex((x) => x.id === t.id);
  commit(i >= 0 ? list.map((x) => (x.id === t.id ? t : x)) : [...list, t]);
}

export function deleteTrade(id: string) {
  commit(getSnapshot().filter((x) => x.id !== id));
}

export function useTrades(): Trade[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
