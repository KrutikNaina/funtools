"use client";

import { useState, useEffect } from "react";

const RECENT_TOOLS_KEY = "funtools_recent_tools";
const FAVORITE_TOOLS_KEY = "funtools_favorite_tools";
const RECENT_SEARCHES_KEY = "funtools_recent_searches";

export function getRecentlyViewedTools(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(RECENT_TOOLS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function addRecentlyViewedTool(slug: string): string[] {
  if (typeof window === "undefined" || !slug) return [];
  try {
    const list = getRecentlyViewedTools();
    const filtered = list.filter((item) => item !== slug);
    const updated = [slug, ...filtered].slice(0, 10);
    localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("funtools_user_store_change"));
    return updated;
  } catch (e) {
    return [];
  }
}

export function getFavoriteTools(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(FAVORITE_TOOLS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function isFavoriteTool(slug: string): boolean {
  const favorites = getFavoriteTools();
  return favorites.includes(slug);
}

export function toggleFavoriteTool(slug: string): boolean {
  if (typeof window === "undefined" || !slug) return false;
  try {
    const favorites = getFavoriteTools();
    const exists = favorites.includes(slug);
    let updated: string[];
    if (exists) {
      updated = favorites.filter((s) => s !== slug);
    } else {
      updated = [slug, ...favorites];
    }
    localStorage.setItem(FAVORITE_TOOLS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("funtools_user_store_change"));
    return !exists;
  } catch (e) {
    return false;
  }
}

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(RECENT_SEARCHES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function addRecentSearch(query: string): string[] {
  const trimmed = query.trim();
  if (typeof window === "undefined" || !trimmed) return [];
  try {
    const searches = getRecentSearches();
    const filtered = searches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, 8);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("funtools_user_store_change"));
    return updated;
  } catch (e) {
    return [];
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    window.dispatchEvent(new Event("funtools_user_store_change"));
  } catch (e) {}
}

export function useUserStore() {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const refreshState = () => {
    setRecentlyViewed(getRecentlyViewedTools());
    setFavorites(getFavoriteTools());
    setRecentSearches(getRecentSearches());
  };

  useEffect(() => {
    refreshState();
    const handleStoreChange = () => refreshState();
    window.addEventListener("funtools_user_store_change", handleStoreChange);
    return () => window.removeEventListener("funtools_user_store_change", handleStoreChange);
  }, []);

  return {
    recentlyViewed,
    favorites,
    recentSearches,
    addRecentlyViewed: addRecentlyViewedTool,
    toggleFavorite: toggleFavoriteTool,
    addSearch: addRecentSearch,
    clearSearches: clearRecentSearches,
  };
}
