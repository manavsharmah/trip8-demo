import { useMemo } from "react";
import packagesData from "./packages.json";
import type { Package } from "../types";

const packages: Package[] = packagesData as Package[];

export function usePackages(): Package[] {
  return packages;
}

export function usePackage(id: string): Package | undefined {
  return useMemo(() => packages.find((pkg) => pkg.id === id), [id]);
}

export function usePackagesByRegion(region: string): Package[] {
  return useMemo(() => {
    if (region === "All") return packages;
    return packages.filter((pkg) => pkg.region === region);
  }, [region]);
}

export function useTrendingPackages(): Package[] {
  return useMemo(() => packages.filter((pkg) => pkg.isTrending), []);
}
